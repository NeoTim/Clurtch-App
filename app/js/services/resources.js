angular.module('app.resources', ['firebaseResource'])

angular.module('User', ['firebaseResource'])
.factory('User', function ($rootScope, firebaseResource) {
    var User = firebaseResource(
      {
        path: 'users',
        hasMany: ['Company']
      }
    );
    return User;
})

angular.module('Company', ['firebaseResource'])
.factory('Company', function ($rootScope, firebaseResource) {
    var User = firebaseResource(
      {
        path: 'companys',
        belongsTo: true
      }
    );
    return User;
})
