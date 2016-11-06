'use strict';

var app = angular.module('clip',['ngRoute','ngResource'])

app.config(function($routeProvider,$locationProvider){
  $routeProvider.
  when('/',{
    templateUrl:"main.html",
  }).
  when('/:url',{
    templateUrl:'url.html',
    controller: "url"
  })
  $locationProvider.html5Mode({enabled:true})
});

app.controller("url",function($scope,$http,$routeParams){
  $scope.load = function(){
    var urls = $routeParams.url;
    console.log("inside angular code");
    $http.get('/:url').success(function(result){
      if(result.exists) {
        $scope.content = result.content;
        $scope.exists=false;
      }
      else {
        $scope.exists = true;
        $scope.content="";
      }
    })
  }
})
