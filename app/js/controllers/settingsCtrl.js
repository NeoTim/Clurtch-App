/**
* app.settings Module
*
* Description
*/
angular.module('app.settings', []).

controller('settingsCtrl', ['$rootScope', '$scope', 'syncData', 'loginService', function ($rootScope, $scope, syncData, loginService) {
	//syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
      //$scope.users = syncData('users');
      //$scope.busUsers = [];
	$rootScope.color = "primary";
      $scope.account = syncData('users/' + $scope.auth.user.uid);
      var userRef = new Firebase('http://clurtch-data-test.firebaseio.com/users');
     
      $scope.userId = $scope.auth.user.uid;
      
      //var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business/id");
      var bus = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business");
      bus.on('child_added', function(snap){
         console.log(snap.name());
         $scope.business = syncData('businesses/' + snap.name());
         $scope.businessId = snap.name();
      });
      $scope.logout = function() {
         loginService.logout();
      };

}])

.controller('businessSettingsCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', '$firebase', function ($rootScope, $scope, syncData, $routeParams, $firebase) {
	syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	$rootScope.color = "warning";
      $scope.account = syncData('users/' + $scope.auth.user.uid);
      $scope.users = syncData('users');
      $scope.busUsers = [];
     $scope.users = syncData('users');
     $scope.businessId = $routeParams.bid;
     $scope.business = syncData('businesses/' + $scope.businessId);


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

      $scope.isSelected = true;
      $scope.onLabel = 'Y';
      $scope.offLabel = 'N';
      $scope.isActive = true;
      $scope.size = 'large';
      $scope.animate = true;

      $scope.$watch('isSelected', function() {
         //$log.info('Selection changed.');
      });

      $scope.toggleActivation = function() {
         $scope.isActive = !$scope.isActive;
      }


      $scope.userId = $scope.auth.user.uid;
      $scope.categories = syncData('categories');
      $scope.businesses = syncData('businesses');
      //$rootScope.userId = $scope.auth.user.uid;
      //$scope.business
     // $rootScope.user = syncData('users/' + $scope.auth.user.uid);
      //  console.log( $rootScope.userId);
      
	$scope.removeUser = function(userId){
		$scope.business.$child('users').$remove(userId);
		$scope.users.$child(userId).remove('business');
           	$scope.busUsers = [];
           	$scope.getUsers();
	}
	$scope.addUser = function(uid){
           $scope.business.$child('users').$child(uid).$set(true);
           $scope.users.$child(uid).$child('business').$child($scope.businessId).$set(true);
           $scope.newUser = [];
         }

      

      $scope.saveBusiness = function(){
         $scope.business.$save();
      }

     $scope.deleteBusiness = function(bid){
         $scope.business.$remove();
         $scope.user.$remove('business');
         //$scope.bus = "";
     }
	$scope.addBusiness = function(userId){
		$scope.user.$child('business').$add(true);
	}
	$scope.getUsers()
}])

.controller('businessUserCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', '$firebase', '$location', function ($rootScope, $scope, syncData, $routeParams, $firebase, $location) {
	$rootScope.color = "warning";
	$scope.businessId = $routeParams.bid;
	$scope.uid = $routeParams.uid;
     	$scope.business = syncData('businesses/' + $scope.businessId);
     	$scope.user = syncData('users/' + $scope.uid);
     	$scope.settings = syncData('users/' + $scope.uid + '/businessSettings');


	$scope.isSelected = true;
	$scope.onLabel = 'On';
	$scope.offLabel = 'Off';
	//$scope.isActive = true;
	$scope.size = 'small';
	$scope.animate = true;

      /*$scope.$watch('isChat', function() {
      	// /console.log(isChat);
      	var canChat = [];
      	if($scope.isChat == true)
      	{
      		canChat = true;
         		$scope.settings.$child('canChat').$set(canChat);
      	}else{
      		canChat = false;
      	}
      });*/
	$scope.toggle = function(field, val){
		//console.log(val)
         	$scope.settings.$child(field).$set(val);
	}
	$scope.deleteUser = function(uid, bid){
		$scope.user.$child('business').$remove();
		$scope.business.$child('users').$remove(uid);
		$location.path('/settings/business/' + bid)
	}

      $scope.toggleActivation = function() {
         $scope.settings.canChat = !$scope.settings.canChat;
         
      }
}])
.controller('businessToggleCtrl', ['$rootScope', '$scope', 'syncData', '$routeParams', function ($rootScope, $scope, syncData, $routeParams) {
	$rootScope.color = "warning";
	$scope.businessId = $routeParams.bid;
	$scope.business = syncData('businesses/' + $scope.businessId);
	$scope.settings = syncData('businesses/' + $scope.businessId + "/settings");
	$scope.toggle = function(field, val){
		//console.log(val)
         	$scope.settings.$child(field).$set(val);
	}
}])
.controller('accountToggleCtrl', ['$rootScope','$scope', 'syncData', '$routeParams', function ($rootScope, $scope, syncData, $routeParams) {
	$rootScope.color = "primary";
	$scope.userId = $routeParams.id;
	$scope.user = syncData('users/' + $scope.userID);
	$scope.settings = syncData('users/' + $scope.userId + "/profileSettings");
	$scope.toggle = function(field, val){
         	$scope.settings.$child(field).$set(val);
	}
}])