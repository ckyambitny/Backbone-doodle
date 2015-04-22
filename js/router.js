var vent = _.extend({}, Backbone.Events); //globalnie
(function(){
//
window.App = {
	Models: {},
	Collections: {},
	Views: {},
	Router: {}
};

App.Views.Appointments = Backbone.View.extend({
	initialize : function(){
		vent.on('appointment:show', this.show, this);
	},
	show : function(id){
		
		console.log('showing the appointment of id: ' + id);
	}

});

App.Router = Backbone.Router.extend({
	routes :{
		'' : 'index',
		'show/:id' : 'show',
		'download/*filename' : 'download',
		'search/:query' : 'search',
		'appointment/:id' : 'showAppointment',
		'*default' : 'standard',
		
	},

	index : function(){
		console.log('index route');
	},
	show : function(id){
		console.log('show route id of ' + id);
	},
	download : function(filename){
		console.log('download route filename of:  ' + filename);
	},
	search : function(query){
		//
		console.log('search query :' + query);
	},
	standard : function(standard){
		alert('You accesed bad page:  ' + standard);
	},
	showAppointment : function(appointmentId){
		vent.trigger('appointment:show', appointmentId);
	}

});

new App.Views.Appointments;
new App.Router;

Backbone.history.start();


})();