//category definition
define(['backbone','text!templates/landing.html'], function (Backbone, landingTemplate){
	var LandingView = Backbone.View.extend({

		template: _.template(landingTemplate),

		tagName: 'div',

		initialize: function() {
		},

		events: {
			'click #save-basic-changes' : 'save_basic',
			'click #delete' : 'delete'
		},

		delete: function() {
			this.model.deleteMyself();
			this.remove();
  			this.unbind();
		},

		save_basic: function() {
			var name = $('#inputName').val();
			var description = $('#inputDescription').val();
			this.model.updateBasicInfo(name,description);
		},

		render: function(){
			console.log('rendering categoryView');
			this.$el.html(this.template);
		}
	});

	return LandingView;
});