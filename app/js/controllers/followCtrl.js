/**
* app.follow Module
*
* Description
*/



angular.module('app.follow', []).

controller('followingCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', function ($rootScope, $scope, syncData, $firebase) {
	var id = $scope.auth.user.uid;
	$scope.userId = id;
	$rootScope.color = "primary";
	//$scope.businessId = id;
	$scope.user = syncData('users/' + id);
	//$scope.chatUsers = syncData('users');
	$scope.businesses = [];
	
	var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + id + "/following");
	ref.on('value', function(snap){
		var x = snap.val();
		snap.forEach( function(csnap){
			var name = csnap.name();
			console.log(name);
			var businessRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + name);
			$scope.businesses.push($firebase(businessRef));


			console.log($scope.businesses);
		} );
		
	});
}])


.controller('followersCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', '$routeParams', function ($rootScope, $scope, syncData, $firebase, $routeParams) {
	var id = $scope.auth.user.uid;
	$rootScope.color = "warning";
	$scope.userId = id;
	$rootScope.businessId = $routeParams.businessId;
	$scope.businessId = $routeParams.businessId;
	$scope.user = syncData('businesses/' + $scope.businessId);
	//$scope.chatUsers = syncData('users');
	$scope.accounts = [];
	
	var ref = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + $scope.businessId + "/followers");
	ref.on('value', function(snap){
		var x = snap.val();

		snap.forEach( function(csnap){
			console.log('hello')
			var name = csnap.name();
			var accountRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
			$scope.accounts.push($firebase(accountRef));
			//console.log(accountRef);


			console.log($scope.accounts);
		} );
		
	});
}])