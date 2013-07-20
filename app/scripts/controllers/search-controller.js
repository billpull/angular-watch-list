'use strict';

watchListApp.controller('SearchCtrl', function($scope, $http, watchListService) {
	$scope.items = [];

	$scope.query = '';

	$scope.searchApi = function () {
		var apiUrl = 'API_URL',
			queryParam = '';

		if ($scope.query.length > 2) {
			queryParam = encodeURIComponent($scope.query);

			$http.get(apiUrl + queryParam)
				.then(function (res) {
					$scope.items = res.data;
				});
		} else {
			$scope.items = [];
		}
	};

	$scope.addToWatchList = function (item) {
		var currentItems = watchListService.getWatchItems(),
		    isInWatchList = false;
		if (currentItems) {
			var itemLen = currentItems.length,
				itemIdx = 0;


			for (; itemIdx < itemLen; itemIdx++) {
				if (item.id === currentItems[itemIdx].id) {
					isInWatchList = true;
				}
			}
		} else {
			currentItems = [];
		}

		if (!isInWatchList) {
			currentItems.unshift(item);

			watchListService.setWatchItems(currentItems);
		}
	};
});
