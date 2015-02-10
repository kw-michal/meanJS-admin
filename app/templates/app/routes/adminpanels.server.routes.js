'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var adminpanels = require('../../app/controllers/adminpanels.server.controller');

	// Adminpanels Routes
	app.route('/adminpanel')
		.get(adminpanels.list);

	 app.route('/adminpanel/:collection')
	 	.get(adminpanels.collection);
	 app.route('/schemaDefinition/:collection')
	 	.get(adminpanels.schemaDefinition);
	
	 app.route('/adminpanel/:collection/:item')
	 	.get(adminpanels.item);
	// Finish by binding the Adminpanel middleware
	//app.param('adminpanelId', adminpanels.adminpanelByID);
};
