'use strict';

// Configuring the Articles module
angular.module('adminpanel').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'admin panel', 'adminpanel/', 'adminpanel');

		Menus.addMenuItem('topbar', 'Admin Panel', 'adminpanel', 'dropdown', '/buildings(/create)?');
		Menus.addSubMenuItem('topbar', 'adminpanel', 'List Collections', 'adminpanel/collections');
	}
]);