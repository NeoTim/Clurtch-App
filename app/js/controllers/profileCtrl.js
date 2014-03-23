angular.module('app.profiles', ['firebase'])

.controller('businessesCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', function ($rootScope, $scope, syncData, $routeParams) {
	$scope.businesses = syncData('businesses');
	//console.log($rootScope.userId);
	/*$scope.userId = $scope.auth.user.uid;*/

}])
.controller('businessProfileCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', '$firebase', function ($rootScope, $scope, syncData, $routeParams, $firebase) {
	var bid = $routeParams.id;
	$rootScope.color = "warning"
	$scope.businessId = bid;
	$scope.business = syncData('businesses/' + bid);
	$scope.account = syncData('users/' + bid);
	$scope.userId = $scope.auth.user.uid;
	$scope.user = syncData('users/' + $scope.auth.user.uid);

	$scope.followers = [];
	$scope.chat = [];
	console.log($scope.userId);

	var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId);
    	ref.on('value', function(snap){
    		$scope.following = snap.hasChild( 'following/' + bid );
    		$scope.chat = snap.hasChild( 'rooms/' + bid );
    		console.log($scope.following);
    	});

    	$scope.getUsers = function(){
		$scope.busUsers = [];
     		var busRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/users");
        	busRef.on('child_added', function(snap){
           		var name = snap.name();
           		console.log(name);
           		var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
           		$scope.busUsers.push($firebase(userref));
           		console.log($scope.busUsers);
		});
	}
	$scope.getFollowers = function(){
		$scope.followers = [];
     		var followerRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/followers");
        	followerRef.on('child_added', function(snap){
           		var name = snap.name();
           		console.log(name);
           		var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
           		$scope.followers.push($firebase(userref));
           		console.log($scope.followers);
		});
	}

    	$scope.setFollow = function(val){
		$scope.following = val;
	}
	$scope.setChat = function(val){
		$scope.chat = val;
	}
	$scope.follow = function(businessId, userId){
		$scope.user.$child('following').$child(businessId).$set(true);
		$scope.business.$child('followers').$child(userId).$set(true);
		$scope.setFollow(true);
	}
	$scope.unfollow = function(businessId, userId){
		$scope.user.$child('following').$remove(businessId);
		$scope.business.$child('followers').$remove(userId);
		$scope.setFollow(false);
	}

	$scope.startChat = function(businessId, userId){
		$scope.user.$child('rooms').$child(businessId).$set(true);
		$scope.business.$child('chats').$child(userId).$child('user').$set(userId);
		$scope.setChat(true);
	}
	$scope.killChat = function(businessId, userId){
		$scope.user.$child('rooms').$remove(businessId);
		$scope.business.$child('chats').$remove(userId);
		$scope.setChat(false);
	}
	$scope.getUsers();
	$scope.getFollowers();

}])
.controller('userProfileCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', 'FBURL', '$firebase', function ($rootScope, $scope, syncData, $routeParams, FBURL, $firebase) {
	$rootScope.color = "primary"
	var accountId = $routeParams.id;
	$scope.accountId = accountId;
	console.log($scope.accountId);
	$scope.account = syncData('users/' + accountId);
	//console.log($scope.account);
	//syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	$scope.userId = $scope.auth.user.uid;

	//console.log($scope.auth.user.uid);
	$scope.user = syncData('users/' + $scope.auth.user.uid);

	$scope.businesses = [];

    	var ref = new Firebase(FBURL + '/users/' + $scope.userId);
    	ref.on('value', function(snap){
    		$scope.following = snap.hasChild( 'following/' + accountId );
    		$scope.chat = snap.hasChild( 'rooms/' + accountId );
    		console.log($scope.following);
    	});
    	var bus = new Firebase(FBURL + '/users/' + $scope.accountId + "/business");
      bus.on('child_added', function(snap){
         console.log(snap.name());
         $scope.business = syncData('businesses/' + snap.name());
         $scope.businessId = snap.name();
      });
      var FollowingRef = new Firebase(FBURL + "/users/" + $scope.accountId + "/following");
      FollowingRef.on('value', function(snap){
      	console.log(snap.val());
      	snap.forEach(function(csnap){
      		var name = csnap.name();
      		var Fref = new Firebase(FBURL + '/businesses/' + name);
      		$scope.businesses.push($firebase(Fref));
      		console.log($scope.businesses);
      	});
      });

	//$scope.following = [];
	//$scope.chat = [];


	

 /*
	$scope.user.$on('value', function(snap){
		angular.forEach(snap.following, function(i, f){
			if(f = accountId){
				$scope.setFollow(true);
			}
			
		})
	});
	$scope.account.$on('value', function(snap){
		 
		angular.forEach(snap.chats, function(i, c){
			if(c = $scope.userId){
				$scope.setChat(true);
			}
			
		})
	});
*/
	
	
	$scope.follow = function(accountId, userId){
		$scope.user.$child('following').$child(accountId).$set(true);
		$scope.account.$child('followers').$child(userId).$set(true);
		$scope.setFollow(true);
	}
	$scope.unfollow = function(accountIdm, userId){
		$scope.user.$child('following').$remove(accountId);
		$scope.account.$child('followers').$remove(userId);
		$scope.setFollow(false);
	}

	$scope.startChat = function(accountId, userId){
		$scope.user.$child('rooms').$child(accountId).$set(true);
		$scope.account.$child('chats').$child(userId).$child('user').$set(userId);
		$scope.setChat(true);
	}
	$scope.killChat = function(accountId, userId){
		$scope.user.$child('rooms').$remove(accountId);
		$scope.account.$child('chats').$remove(userId);
		$scope.setChat(false);
	}




}])

