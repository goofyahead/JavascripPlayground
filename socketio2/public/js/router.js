//App router
define(['jquery','underscore','backbone','views/LandingView'],
  function($, _, Backbone, LandingView) {

    var AppRouter = Backbone.Router.extend({

     // Hash maps for routes
     routes : {
      "" : "index",
      "*error" : "fourOfour"
    },

    initialize: function() {
      //SET ALL LISTS MODELS,ETC.
    },

    index: function() {
      var landing = new LandingView();
      landing.render();
      $('#content').html(landing.el);
    },

    fourOfour: function(error) {
      $('#content').html('page does not exists');
    }
  });

    return AppRouter;
  });
