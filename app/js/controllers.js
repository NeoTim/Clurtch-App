'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

.controller('userDashboardCtrl', ['$rootScope', '$scope', 'syncData', function ($rootScope, $scope, syncData) {
   $scope.userId = $scope.auth.user.uid;
   $rootScope.color = "primary";
   $scope.user = syncData('users/' + $scope.userId);
   
}])

.controller('businessDashboardCtrl', ['$rootScope', '$scope', 'syncData', 'FBURL', function ($rootScope, $scope, syncData, FBURL) {
   $rootScope.color = "warning";
   $scope.userId = $scope.auth.user.uid;
   $scope.userId = $scope.auth.user.uid;
   $scope.user = syncData('users/' + $scope.userId);
   var ref = new Firebase(FBURL + '/users/' + $scope.userId + "/business");
   ref.on('child_added', function(snap){
      var name = snap.name();
      $scope.business = syncData('businesses/' + name);
      $scope.businessId = name;
      $rootScope.businessId = name;
      
   });
   
}])
.controller('sideBarChatsCtrl', ['$rootScope', '$scope', 'syncData', 'FBURL', '$location', '$firebase', function ($rootScope, $scope, syncData, FBURL, $location, $firebase) {
      $scope.user = syncData('users/' + $scope.userId);
      console.log($rootScope.businessId);
      
         /*var ref = new Firebase(FBURL + '/users/' + $scope.userId + "/business");
         ref.on('child_added', function(snap){
            var name = snap.name();
            $rootScope.business = syncData('businesses/' + name);
            $rootScope.businessId = name;
         });*/
         var userRef = new Firebase(FBURL + '/businesses/' + $rootScope.businessId + "/chats");
         userRef.on('child_added', function(snap){
            $rootScope.sideChats = [];
            snap.forEach( function(csnap){
               var snapName = csnap.name();
               var userChatRef = new Firebase(FBURL + '/users/' + snapName);
               $rootScope.sideChats.push($firebase(userChatRef));
               console.log($rootScope.sideChats);
            } );
         })
}])


.controller('dashboardCtrl', ['$rootScope', '$scope', 'syncData', 'FBURL', function ($rootScope, $scope, syncData, FBURL) {
   syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
   $scope.userId = $scope.auth.user.uid;
   var ref = new Firebase(FBURL + '/users/' + $scope.userId + "/business");
   ref.on('child_added', function(snap){
      $scope.business = syncData('businesses/' + name);
      $scope.businessId = name;
      $rootScope.businessId = name;
   });
}])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$rootScope', '$scope', 'loginService', 'syncData', '$location', '$firebase', function($rootScope, $scope, loginService, syncData, $location, $firebase) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.account = syncData('users/' + $scope.auth.user.uid);
      $scope.users = syncData('users');
      $scope.busUsers = [];
       $rootScope.businessId = $rootScope.businessId;
      var userRef = new Firebase('http://clurtch-data-test.firebaseio.com/users');
      userRef.on('child_added', function(snap){

         snap.forEach( childSnapshot, function(csnap, i){
            var value = snap.exportVal();
            var name = snap.name();
            var text = value.firstName;
            user = [{id: name, text: text }]
            $scope.select2Options.tags.push(user);
            console.log(name);
            
         } );

      });

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
      var ref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business/id");
      var bus = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + $scope.userId + "/business");
      bus.on('child_added', function(snap){
         console.log(snap.name());
         //syncData(['businesses', snap.name()]).$bind($scope, 'business');
         $scope.business = syncData('businesses/' + snap.name());
         $scope.businessId = snap.name();
         $scope.business.$child('users').$child($scope.userId).$set(true);

         var busRef = new Firebase('http://clurtch-data-test.firebaseio.com/businesses/' + snap.name() + "/users");

         $scope.getUsers = function(){
            
            busRef.on('child_added', function(busSnap){
               //var name = snap.name();
               var userref = new Firebase('http://clurtch-data-test.firebaseio.com/users/' + busSnap.name());
               $scope.busUsers.push($firebase(userref));
               console.log($scope.busUsers);
            });
         }
         $scope.removeUser = function(userId){
               $scope.business.$child('users').$remove(userId);
               $scope.busUsers = [];
               $scope.getUsers();
         }
         $scope.getUsers();
      });

         $scope.addUser = function(uid){
            $scope.business.$child('users').$child(uid).$set(true);
            
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

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }]);