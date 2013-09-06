var engine = require('../../crawler_engine');
var merge = require('../lib/merge').Merge;
var laeh2 = require('laeh2').leanStacks(true).capturePrevious(true);
var async = require('async');
var es = require('./es');
var fs = require('fs');
var _x = laeh2._x;
var _e = laeh2._e;

var cb = console.log;
var ES = false;


var program = require('commander');
var colors = require('colors');

program
  .version('0.0.2')
  .usage('[options]')
  .option('-o, --operation <type>', 'redis to redis [rtr] or redis to elasticSearch [rte]') //REDIStoES, RedisToRedis
  .option('-f, --fromShard <n>', 'Shard to start from', parseInt)
  .option('-t, --toShard <n>', 'An integer argument', parseInt)
  .option('-e, --esIp <ip>', 'Elastic search Ip ex: 10.62.125.217')
  .option('-i, --index <index>', 'Index to write to ex: ark_idx_1')
  .option('-p, --inputport <n>', 'the input redis port', parseInt)
  .option('-x, --inputidx <index>', 'the input redis index')
  .option('-P, --outputport <n>', 'the output redis port', parseInt)
  .option('-X, --outputidx <inde>', 'the output redis index')
  .parse(process.argv);

if (!program.fromShard && program.fromShard != 0) console.log ('please set a starting value with -f or --fromShard'.yellow);
if (!program.toShard) console.log ('please set a finish value with -t or --toShard'.yellow);
if (!program.esIp) console.log ('please set the ElastiSearch --esIp to target'.yellow);

if (program.operation == 'rte') ES = true;

console.log('working from ' + program.fromShard + ' to ' + program.toShard + ' targeting ' + program.esIp);

var inputOpts = {
    url: 'ws://localhost:'+ program.inputport +'/'
};

var outputOpts = {
    url: 'ws://localhost:'+ program.outputport +'/'
};


var shard = program.fromShard-1; //cause it calls a method that adds 1
var toShard = program.toShard;
var countInShard = 0;
var rawsInShard = 0;
var dataBulk = [];
var INCREMENT = 1000;
var totalExported = 0;
var itemArray = [];

var output;
var input;

async.series([
function (cb){
   engine.redis.create(inputOpts, _x(cb, true, function(err, io) {
        console.log('io input ready'); 
        input = io.input({ idx: program.inputidx }); // only do this once!
        cb();
    }));
}, function (cb){
    if (ES) {    
        es.setUrl(program.esIp, program.index);
        cb();
    } else {
        engine.redis.create(outputOpts, _x(cb, true, function(err, io) {
            console.log('io output ready'); 
            output = io.output({ idx: program.outputidx }); // only do this once!
            cb();
        }));
    }
}], function (err,result){


 var q = async.queue(function (item, cb) {
            var timeStamp = new Date().getTime();
            input.get(item.id, _x(cb, true, function(err, currentData) {
                setImmediate(function (){
                    if (ES){
                    var m = new merge(),
                    dataMerged;
                    
                    if ( currentData && typeof currentData === 'object' ) {
                        Object.keys(currentData).forEach(function(key) {
                            var idx = key.split(':')[0];

                            m.add(idx, currentData[key]);
                        });

                        dataMerged = m.export(true);

                        if ( dataMerged.networks && dataMerged.networks.length >= 2 ) {
                            totalExported++;
                            var esObject = {"create": {_id: item.id}};
                            var content = {_source: dataMerged};

                            dataBulk.push(JSON.stringify(esObject));
                            dataBulk.push(JSON.stringify(content));
                        }
                        cb();
                    } else {
                        cb();
                    }
                } else {
                    if(currentData.links.length > 0){
                        totalExported++;
                        console.log(currentData.name);
                        dataBulk.push({pkey: item.id, data: currentData});
                    }
                    cb();
                }
                //console.log('elapsed: ' + (new Date().getTime() - timeStamp));
                });
            }));
    }, 1);

    // assign a callback
    q.drain = function() {
        console.log('drain');
        if (dataBulk.length > 500) {
            if (ES) {
                console.log('saving to ES');
                 es.saveToEs(dataBulk, function () {
                    console.log('saved to ES');
                    dataBulk = [];
                    //load moar
                    if (countInShard < rawsInShard) {
                        console.log('from ' + countInShard + ' to ' + (countInShard+ Math.min(INCREMENT, rawsInShard - countInShard)));
                        input.getRange(shard, countInShard, Math.min(INCREMENT, rawsInShard - countInShard), _x(cb, true, function(err, items) {
                            q.push(items);
                            countInShard += Math.min(INCREMENT, rawsInShard - countInShard);
                        }));
                    } else {
                        logStatus(shard);
                        if (shard < toShard) {
                            getNextBatch();
                        } else {
                            console.log('all items have been processed');
                        }
                    }
                });
            } else {
                output.store(null, dataBulk, _x(cb, true, function(err) {
                    dataBulk = [];
                    console.log('stored:\n');
                    if (countInShard < rawsInShard) {

                        console.log('from ' + countInShard + ' to ' + (countInShard+ Math.min(INCREMENT, rawsInShard - countInShard)));
                        input.getRange(shard, countInShard, Math.min(INCREMENT, rawsInShard - countInShard), _x(cb, true, function(err, items) {
                            q.push(items);
                            countInShard += Math.min(INCREMENT, rawsInShard - countInShard);
                        }));
                    } else {
                        logStatus(shard);
                        if (shard < toShard) {
                            getNextBatch();
                        } else {
                            console.log('all items have been processed');
                        }
                    }
                }));  
            }
           
        } else {
            if (countInShard < rawsInShard) {

                console.log('from ' + countInShard + ' to ' + (countInShard+ Math.min(INCREMENT, rawsInShard - countInShard)));
                input.getRange(shard, countInShard, Math.min(INCREMENT, rawsInShard - countInShard), _x(cb, true, function(err, items) {
                    q.push(items);
                    countInShard += Math.min(INCREMENT, rawsInShard - countInShard);
                }));
            } else {
                logStatus(shard);
                if (shard < toShard) {
                    getNextBatch();
                } else {
                    if (dataBulk.length > 1) {
                        
                        if (ES){
                            es.saveToEs(dataBulk, function () {
                                console.log('all items have been processed ' + totalExported + ' exported');
                            });
                        } else {
                             console.log('all items have been processed ' + totalExported + ' exported');
                             output.store(null, dataBulk, _x(cb, true, function(err) {
                                console.log('stored:\n');
                             }));
                        }
                    }
                }
            }
        }
    }

    function logStatus(shard) {
        fs.appendFile('status.txt', 'shard completed ' + shard + ' with ' + rawsInShard + new Date().toString() + '\n', function (err) {
          if (err) console.log(err);
          console.log('The "data to append" was appended to file!');
        });
    }

    function getNextBatch() {
        shard ++;
        countInShard = 0;
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++'.red);
        console.log('                NEW SHARD STARTED ' + shard +'                '.red);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++'.red);
        input.getCounts(shard, _x(cb, true, function(err, counts) {
            console.log('TOTAL: ' + counts.raws);
            rawsInShard = counts.raws;
            input.getRange(shard, countInShard, Math.min(INCREMENT, rawsInShard - countInShard), _x(cb, true, function(err, items) {
                q.push(items);
                countInShard += Math.min(INCREMENT, rawsInShard - countInShard);
            }));
        }));
    }

    getNextBatch(shard);



});