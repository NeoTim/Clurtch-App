angular.module('app.find', [])

.controller('findCtrl', ['$scope', 'syncData', function ($scope, syncData) {
	$scope.categories = syncData('categories');
}])

.controller('findCatCtrl', ['$scope', 'syncData', '$routeParams', function ($scope, syncData, $routeParams) {
	var category = $routeParams.id;
	$scope.category = category;
	$scope.businesses = syncData('businesses');
	console.log(category)
}])