'use strict'

var app = angular.module('clipboard',['ngRoute','ngResource'])
app.config(function($routePovider,$locationProvider){
  $routeProvider.
  when('/:anything',{
    templateUrl:url.html,
    controller: urlC
  })
})

app.controller('urlC',function($scope,$http){
  $http.get('/:url').success(function(result){
    if(result.exists) {
      $scope.editor = result.content;
      //todo: disable post button
    }

    else {
      //TO-DO: enable post button
      //TO-DO: clean textarea
    }
  })
})
