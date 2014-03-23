angular.module('app.messages', ['firebase'])

.factory("ChatService", function() {
	//var userId = $scope.auth.user.uid;
    		var ref = new Firebase("http://clurtch-data-test.firebaseio.com/users/");
    return {
      getUsers: function(userId) {
        	var users = [];
        	ref.child(userId).on("child_added", function(snapshot) {
				//console.log(snapshot.name());
				users.push(snapshot.val());
        	});
        return users;
      },
      getMessages: function(userId) {
    		var ref = new Firebase("http://clurtch-data-test.firebaseio.com/users/" + userId + '/rooms');
        ref.push(message);
      }
    }
  })
.controller('userChatCtrl', ['$rootScope', '$scope', 'loginService', 'syncData', '$routeParams', '$location', function ($rootScope, $scope, loginService, syncData, $routeParams, $location) {
	$scope.userId = $scope.auth.user.uid
	$rootScope.color = "primary";
	$scope.businessId = $routeParams.businessId;
	
	$scope.user = syncData('users/' + $scope.userId);
	$scope.business = syncData('businesses/' + $scope.businessId);

	$scope.messages = syncData('businesses/' + $scope.businessId + '/chats/' + $scope.userId + '/messages');
	
	$scope.addMessage = function(userId, username, message){
		$scope.messages.$add({id: userId, username: username, message: message, created_at:Firebase.ServerValue.TIMESTAMP});
		$scope.message = "";
	}
	$scope.deleteMessage = function(messageId){
		$scope.messages.$remove(messageId);
	}

	$scope.killChat = function(accountId, userId){
		$scope.user.$child('rooms').$remove(accountId);
		$scope.business.$child('chats').$remove(userId);
		/*$scope.setChat(false);*/
		$location.path('/users/' + accountId);

	}

}])

.controller('businessChatCtrl', ['$rootScope', '$scope', 'loginService', 'syncData', '$routeParams', '$location', function ($rootScope, $scope, loginService, syncData, $routeParams, $location) {
	$scope.userId = $scope.auth.user.uid;
	$rootScope.color = "warning";
	$scope.accountId = $routeParams.accountId;
	$scope.businessId = $routeParams.businessId;

	$scope.user = syncData('users/' + $scope.userId);
	$scope.account = syncData('users/' + $scope.accountId);
	$scope.business = syncData('businesses/' + $scope.businessId);

	$scope.messages = syncData('businesses/' + $scope.businessId + '/chats/' + $scope.accountId + '/messages');

	$scope.addMessage = function(userId, username, message){
		$scope.messages.$add({id: userId, username: username, message: message, created_at:Firebase.ServerValue.TIMESTAMP});
		$scope.message = "";
	}
	$scope.deleteMessage = function(messageId){
		$scope.messages.$remove(messageId);
	}
	$scope.killChat = function(accountId, userId){
		$scope.user.$child('rooms').$remove(accountId);
		$scope.business.$child('chats').$remove(userId);
		/*$scope.setChat(false);*/
		$location.path('/users/' + accountId);

	}

}])

.controller('inboxesCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', 'ChatService', function ($rootScope, $scope, syncData, $firebase, service) {



	$scope.userId = $scope.auth.user.uid;
	console.log($scope.rooms);
	
	
	

	$scope.user = syncData('users/' + $scope.userId);
	var bus = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business");
	 bus.on('child_added', function(snap){
	         	console.log(snap.name());
	         	$scope.business = syncData('businesses/' + snap.name());
	         	$scope.businessId = snap.name();
	      });

}])


.controller('inboxCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', function ($rootScope, $scope, syncData, $firebase) {

	var id = $scope.auth.user.uid;
	$scope.userId = id;
	var myRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id);
//	var busRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + '/business');
	$scope.account = $firebase(myRef);


	//$scope.account = syncData('users/' + $scope.auth.user.uid);

	//$scope.chatUsers = syncData('users');
	$scope.users = [];
	$scope.accountChats = [];

	/*var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + "/business/id");
      ref.on('value', function(snap){
		$scope.businessId = snap.val();
         	$scope.business = syncData('businesses/' + $scope.businessId);
         	console.log($scope.business);
      });*/
	$scope.setBus = function(){

		/*$scope.account.$on('loaded', function(snap){
			console.log(snap.business);
			var x = snap.business;
			angular.forEach(x, function(y, i){
				$scope.business = syncData('businesses/' + i);
	         		$scope.businessId = i;
				
			})
		})*/

		var bus = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business");
	      bus.on('child_added', function(snap){
	         	console.log(snap.name());
	         	//syncData(['businesses', snap.name()]).$bind($scope, 'business');
	         	$scope.business = syncData('businesses/' + snap.name());
	         	$scope.businessId = snap.name();

	         	//$scope.business.$child('users').$child($scope.userId).$set(true);
			var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/chats");
			ref.on('value', function(snap){
				$scope.users = [];	
				var x = snap.val();
				snap.forEach( function(csnap){
					var name = csnap.name();
					console.log(name);
					var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
					$scope.users.push($firebase(userref));
					//console.log($scope.users);
				});
				
			});

			

	      });
	}


	/*$scope.init = function(userId){
		$scope.user = syncData('users/' + userId)
	}*/
	/*var accountRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + "/rooms");
	accountRef.on('value', function(snap){
		$scope.accountChats = [];	
		var x = snap.val();
		snap.forEach( function(csnap){
			var name = csnap.name();
			console.log(name);
			var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
			$scope.accountChats.push($firebase(userref));


			//console.log($scope.users);
		} );
		
	});*/

	/*$scope.resetAccounts = function(){
		var acRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + "/rooms");
		acRef.once('value', function(snap){
			$scope.accountChats = [];	
			var x = snap.val();
			snap.forEach( function(csnap){
				var name = csnap.name();
				console.log(name);
				var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
				$scope.accountChats.push($firebase(userref));


				console.log($scope.accountChats);
			} );
			
		});
	}*/

	$scope.reset = function(){
		$scope.users = [];	
		var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/chats");
		ref.once('value', function(snap){
			var x = snap.val();
			snap.forEach( function(csnap){
				var name = csnap.name();
				console.log(name);
				var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
				$scope.users.push($firebase(userref));


				console.log($scope.users);
			} );
			
		});
		
	}
	$scope.archive = function(chatId){
		//var chats = $scope.account.$getIndex();
		//console.log(chats);
		/*$scope.business.$child('chats').$child(chatId).$on('loaded', function(snap){
			$scope.business.$child('archived').$child(chatId).$set(snap);
			
		})*/
		//$scope.business.$child('chats').$remove(chatId);
		var archiveRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + '/chats/' + chatId );
		archiveRef.on('value', function(snap){
			var x = snap.exportVal();
			$scope.business.$child('archived').$child(chatId).$set(x);
			//$scope.business.$child('chats').$remove(chatId);
			//$scope.reset();
		});
	}
	
/*
	$scope.userArchive = function(chatId, busId){
		var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + busId + '/chats/' + chatId );
		ref.once('value', function(snap){
			var x = snap.exportVal();
			$scope.user.$child('archived').$child(chatId).$set(x);
			$scope.user.$child('rooms').$remove(chatId);
			$scope.resetAccounts();
		});
	}*/
	//$scope.reset();
	$scope.setBus();

}])
.controller('messageCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', function ($rootScope, $scope, syncData, $routeParams) {
	var id = $scope.auth.user.uid;
	var accountId = $routeParams.id;

	$scope.user = syncData('users/' + id)
	$scope.account = syncData('users/' + accountId)
	$scope.userId = id;
	
	var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + "/business");
      ref.on('child_added', function(snap){
		$scope.businessId = snap.name();
         	$scope.business = syncData('businesses/' + $scope.businessId);
         	console.log($scope.business);
		$scope.messages = syncData('businesses/' + $scope.businessId + '/chats/' + accountId + '/messages');
      });


	$scope.addMessage = function(userId, username, message){
		$scope.messages.$add({id: userId, username: username, message: message});
		$scope.message = "";
	}

	$scope.killChat = function(businessId, userId){
		$scope.user.$child('rooms').$remove(businessId);
		$scope.business.$child('chats').$remove(userId);
		/*$scope.setChat(false);*/
		//$location.path('/users/' + businessId);

	}


}])
/*
.controller('messageCtrl', ['$rootScope', '$scope', 'syncData', function ($rootScope, $scope, syncData) {
	//$scope.messages = syncData('messages');
	$scope.messages = syncData('messages');
	syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	$rootScope.showHeader= true;
	$rootScope.messageFooter= true;
	$scope.addMessage = function(msg, user){
		//$scope.messages.$add({message: msg, user: user, created_at: Firebase.ServerValue.TIMESTAMP});
		$scope.user.$child('messages').$add({message: msg, user: user, created_at: Firebase.ServerValue.TIMESTAMP});
		$scope.newMsg = "";

	}
}])*/