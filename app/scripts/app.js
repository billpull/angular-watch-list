'use strict';

var watchListApp = angular.module('watchListApp', []);

// $http has CORS error without this
watchListApp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// ng-keypress ???
watchListApp.directive("keypress", function () {
  return function (scope, element, attrs) {
    element.bind("keypress, keyup, keydown", function () {
      scope.$apply(attrs.keypress)
    });
  };
});

watchListApp.directive("sort", function () {
  return function (scope, element, attrs) {
    element.sortable({
        update: function( event, ui ) {
            var sortIndices = $(this).sortable('toArray'),
                currentArray = scope[attrs.sort],
                sortedArray = [];

            for (var i = 0; i < sortIndices.length; i++) {
              var sortIdx = sortIndices[i];
              sortedArray[i] = currentArray[sortIdx];
            }

            scope.$apply(scope.reorderItems(sortedArray));
        },
        placeholder: "watch-list-placeholder"
    });
  };
});

watchListApp.service('watchListService', function () {
  var watchItems= [];
    return{
        getWatchItems: function(){
            return watchItems;
        },
        setWatchItems: function(value){
            watchItems=value;

            store.set('watchlist', value);
        }
    };
});
