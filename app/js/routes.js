"use strict";

angular.module('myApp.routes', ['ngRoute'])

	 // configure views; the authRequired parameter is used for specifying pages
	 // which should only be available while logged in
.config(['$routeProvider', function($routeProvider) {

	 $routeProvider.when('/', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/dashboard/user.html',
		 controller: 'userDashboardCtrl'
	});

	$routeProvider.when('/home', {
		 templateUrl: 'partials/home.html',
		 controller: 'HomeCtrl'
	});

	$routeProvider.when('/chat', {
		 templateUrl: 'partials/chat.html',
		 controller: 'ChatCtrl'
	});

	// USER

	$routeProvider.when('/user', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/dashboard/user.html',
		 controller: 'userDashboardCtrl'
	});

		// INBOX
		$routeProvider.when('/user/inbox', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'views/user/inbox.html',
			controller: 'userInboxCtrl'
		});
			// CHAT
			$routeProvider.when('/user/inbox/messages/:businessId', {
				 authRequired: true, // must authenticate before viewing this page
				 templateUrl: 'views/user/chat.html',
				 controller: 'userChatCtrl'
			});

		 // PROFILE
		$routeProvider.when('/users/:id', {
			 authRequired: true, // must authenticate before viewing this page
			 templateUrl: 'views/user/profile.html',
			 controller: 'userProfileCtrl'
		});

	// BUSINESS
	$routeProvider.when('/business', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/dashboard/business.html',
		 controller: 'businessDashboardCtrl'
	});
		// INBOX
		$routeProvider.when('/business/inbox/:businessId', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'views/business/inbox.html',
			controller: 'businessInboxCtrl'
		});
			// CHAT
			$routeProvider.when('/business/inbox/:businessId/messages/:accountId', {
				authRequired: true, // must authenticate before viewing this page
				templateUrl: 'views/business/chat.html',
				controller: 'businessChatCtrl'
			});

		// PROFILE
		$routeProvider.when('/businesses/:id', {
			 authRequired: true, // must authenticate before viewing this page
			 templateUrl: 'views/business/profile.html',
			 controller: 'businessProfileCtrl'
		});
		// FOLLOWERS
		$routeProvider.when('/business/followers/:businessId', {
			 authRequired: true, // must authenticate before viewing this page
			 templateUrl: 'views/follow/followers.html',
			 controller: 'followersCtrl'
		});

	// SETTINGS
	$routeProvider.when('/settings', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/settings/settings.html',
		 controller: 'AccountCtrl'
	});
	$routeProvider
		 .when('/settings/account', {
				authRequired: true, // must authenticate before viewing this page
				templateUrl: 'views/settings/account.html',
				controller: 'AccountCtrl'
		 })
		 .when('/settings/account/:id/profile', {
				authRequired: true, // must authenticate before viewing this page
				templateUrl: 'views/settings/account.profile.html',
				controller: 'accountToggleCtrl'
		 })
	$routeProvider.when('/settings/business/:bid', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/settings/business.html',
		 controller: 'businessSettingsCtrl'
	});
	$routeProvider.when('/settings/business/:bid/users/:uid', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/settings/business.users.html',
		 controller: 'businessUserCtrl'
	});
	$routeProvider.when('/settings/business/:bid/profile', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/settings/business.profile.html',
		 controller: 'businessToggleCtrl'
	});

 /* $routeProvider.when('/dashboard', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/dashboard/dashboard.html',
		 controller: 'dashboardCtrl'
	});*/
 

	// MESSAGES

		// USER

		

		// BUSINESS

		




	/*$routeProvider.when('/messages/inbox', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/messages/businessInbox.html',
		 controller: 'inboxCtrl'
	});*/
	$routeProvider.when('/messages/userInbox', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/messages/userInbox.html',
		 controller: 'userInboxCtrl'
	});

	$routeProvider.when('/messages/inbox/:id', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/messages/chat.html',
		 controller: 'messageCtrl'
	});

	// SAVED
	$routeProvider.when('/saved', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/archived/archived.html',
		 controller: 'archivedCtrl'
	});

	$routeProvider.when('/saved/:id', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/archived/archived.msg.html',
		 controller: 'archivedMsgCtrl'
	});


	// FIND

	$routeProvider.when('/find', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/find/find.html',
		 controller: 'findCtrl'
	});

	$routeProvider.when('/find/categories', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/find/categories.html',
		 controller: 'findCtrl'
	});

	$routeProvider.when('/find/categories/:id', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/find/categories.users.html',
		 controller: 'findCatCtrl'
	});


	
	// FOLLOWING

	$routeProvider.when('/following/', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/follow/following.html',
		 controller: 'followingCtrl'
	});


	// BUSINESS

	

	/*$routeProvider.when('/businesses/:id/rooms/:userId', {
		 authRequired: true, // must authenticate before viewing this page
		 templateUrl: 'views/business/chat.html',
		 controller: 'userChatCtrl'
	});*/

	

	

	$routeProvider.when('/login', {
		 templateUrl: 'partials/login.html',
		 controller: 'LoginCtrl'
	});
	$routeProvider.when('/signup', {
		 templateUrl: 'partials/signup.html',
		 controller: 'LoginCtrl'
	});

	$routeProvider.when('/scroll',    {templateUrl: "scroll.html"}); 
	$routeProvider.when('/toggle',    {templateUrl: "toggle.html"}); 
	$routeProvider.when('/tabs',      {templateUrl: "tabs.html"}); 
	$routeProvider.when('/accordion', {templateUrl: "accordion.html"}); 
	$routeProvider.when('/overlay',   {templateUrl: "overlay.html"}); 
	$routeProvider.when('/forms',     {templateUrl: "forms.html"});
	 
	$routeProvider.otherwise({redirectTo: '/user'});
 }])
.controller('headerCtrl', ['$scope', '$location', function ($scope, $location) {
			if($location.path() == '/dashboard'){
				 $scope.showHeader = false;
			} else if($location.path() == '/find') {
				 $scope.showHeader = false;
			} else if($location.path() == '/settings'){
				 $scope.showHeader = false;
			} else if($location.path() == '/messages'){
				 $scope.showHeader = true;
			}
}])

/*
		 .config([ '$routeSegmentProvider', '$routeProvider', '$locationProvider', function ($routeSegmentProvider, $routeProvider, $locationProvider) {

			$routeSegmentProvider.options.autoLoadTemplates = true;

			$routeSegmentProvider

			.when('/home',       's1')
			.when('/chat',         's2')
			.when('/account',    's3')
			.when('/login',         's4')

			.segment('s1', {
				 templateUrl: 'partials/home.html',
				 controller: 'HomeCtrl'
			})

			.segment('s2', {
				 templateUrl: 'partials/chat.html',
				 controller: 'ChatCtrl'
			})

			.segment('s3', {
				 authRequired: true, // must authenticate before viewing this page
				 templateUrl: 'partials/account.html',
				 controller: 'AccountCtrl'
			})

			.segment('s4', {
				 templateUrl: 'partials/login.html',
				 controller: 'LoginCtrl'
			})

			$routeProvider.otherwise({redirectTo: '/home'});
	 }]);*/