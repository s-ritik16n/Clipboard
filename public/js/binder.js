'use strict';

var app = angular.module('clip',['ngRoute','ngResource'])

app.config(function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({enabled:true});
  $routeProvider.
  when('/',{
    templateUrl:"main.html",
    controller:"url"
  }).
  when('/:url',{
    templateUrl:"url.html",
    controller: "url"
  })
});

app.controller("url",function($scope,$http,$routeParams){

  $scope.main = function(){
    console.log("inside main");
  }

  $scope.load = function(){
    var url = $routeParams.url;
    console.log("inside angular code");
    $http.get('/find/'+url).success(function(result){
      console.log(result.exist);
      if(result.exist) {
        console.log("content is: "+result.data);
        $scope.content = result.data;
        $scope.exists=false;
      }
      else {
        $scope.exists = true;
        $scope.content="";
      }
    })
  }

  $scope.submit=function(){
    var url = $routeParams.url;
    var data = JSON.stringify({
      content:$scope.content
    })
    $http.post('/find/'+url,data).success(function(result){
      console.log(result);
      if(result.done){
        $scope.done=true;
      }
    })
  }
  $scope.uploadFile = function(){
    var form = new FileReader();
    var file = $scope.myFile;
    
  }
})
