angular.module('app.archived', ['firebase'])

.controller('archivedCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', function ($rootScope, $scope, syncData, $firebase) {
	var id = $scope.auth.user.uid;
	$scope.userId = id;
	$scope.chatUsers = syncData('users');
	$scope.users = [];
	/*$scope.init = function(userId){
		$scope.user = syncData('users/' + userId)
	}*/

	var bus = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business");
      bus.on('child_added', function(snap){
         console.log(snap.name());
         //syncData(['businesses', snap.name()]).$bind($scope, 'business');
         $scope.business = syncData('businesses/' + snap.name());
         $scope.businessId = snap.name();
         //$scope.business.$child('users').$child($scope.userId).$set(true);
      });

	var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/archived");
	ref.on('value', function(snap){
		var x = snap.val();
		snap.forEach( function(csnap){
			var name = csnap.name();
			console.log(name);
			var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
			$scope.users.push($firebase(userref));


			console.log($scope.users);
		} );
		
	});

	$scope.reset = function(){
		var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/archived");
		ref.on('value', function(snap){
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

	$scope.putBack = function(chatId){
		console.log(chatId);
		var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + '/archived/' + chatId );
		ref.once('value', function(snap){
			var x = snap.exportVal();
			$scope.business.$child('chats').$child(chatId).$set(x);
			//$scope.business.$child('archived').$remove(chatId);
		});
	}



}])
.controller('archivedMsgCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', function ($rootScope, $scope, syncData, $routeParams) {
	var id = $scope.auth.user.uid;
	var accountId = $routeParams.id;
	$scope.business = syncData('businesses/' + id);
	$scope.user = syncData('users/' + id);
	$scope.account = syncData('users/' + accountId);
	$scope.messages = syncData('businesses/' + id + '/archived/' + accountId + '/messages');
	$scope.userId = id;
	$scope.businessId = id;



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