'use strict';

watchListApp.controller('WatchListCtrl', function($scope, watchListService) {
	$scope.items = watchListService.getWatchItems();

	$scope.removeItem = function (item) {
		var itemIdx = $scope.items.indexOf(item);

		if (itemIdx > -1) {
			$scope.items.splice(itemIdx, 1);

			watchListService.setWatchItems($scope.items);
		}
	};

	$scope.reorderItems = function (sortedArray) {
		$scope.items = sortedArray;

		watchListService.setWatchItems($scope.items);
	};

	$scope.loadItems = function () {
		var items = store.get('watchlist');

		$scope.items = items;

		watchListService.setWatchItems(items);
	};

	$scope.loadItems();


});