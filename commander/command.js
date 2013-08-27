var fs = require('fs');
var program = require('commander');
var colors = require('colors');

program
  .version('0.0.1')
  .usage('[options]')
  .option('-f, --fromShard <n>', 'Shard to start from', parseInt)
  .option('-t, --toShard <n>', 'An integer argument', parseInt)
  .option('-e, --esIp <ip>', 'Elastic search Ip')
  .parse(process.argv);

if (!program.fromShard && program.fromShard != 0) console.log ('please set a starting value with -from or --fromShard'.yellow);
if (!program.toShard) console.log ('please set a finish value with -to or --toShard'.yellow);
if (!program.esIp) console.log ('please set the ElastiSearch Ip to target'.yellow);

console.log('working from ' + program.fromShard + ' to ' + program.toShard + ' targeting ' + program.esIp);