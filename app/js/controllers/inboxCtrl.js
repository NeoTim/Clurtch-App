/**
* app.inbox Module
*
* Description
*/
angular.module('app.inbox', ['firebase']).

controller('businessInboxCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', '$firebase', 'FBURL', function ($rootScope, $scope, syncData, $routeParams, $firebase, FBURL) {
	$scope.businessId = $routeParams.businessId;
	$scope.business = syncData('businesses/' + $scope.businessId);
	$scope.account = [];
	$rootScope.color = "warning";
	var ref = new Firebase(FBURL + '/businesses/' + $scope.businessId + "/chats");
	ref.on('value', function(snap){
		$scope.accounts = [];	
		var x = snap.val();
		snap.forEach( function(csnap){
			var name = csnap.name();
			console.log(name);
			var accountRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + name);
			$scope.accounts.push($firebase(accountRef));
			//console.log($scope.users);
		});
		
	});


}])


.controller('userInboxCtrl', ['$rootScope', '$scope', 'syncData', '$firebase', function ($rootScope, $scope, syncData, $firebase) {
	$scope.userInbox = true;
	$scope.userId = $scope.auth.user.uid;
	$rootScope.color = "primary";
	$scope.user = syncData('users/' + $scope.userId);
	$scope.businesses = [];
	
	var accountRef = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/rooms");
	accountRef.on('value', function(snap){
		$scope.businesses = [];
		var x = snap.val();
		snap.forEach( function(csnap){
			var name = csnap.name();
			console.log(name);
			var businessRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + name);
			$scope.businesses.push($firebase(businessRef));
			//console.log($scope.users);
		} );
		
	});

}])
