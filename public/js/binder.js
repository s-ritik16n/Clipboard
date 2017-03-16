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

app.controller("url",function($scope,$http,$routeParams,$timeout){

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

  $scope.submit = function(){
    if($scope.file){
      $scope.upload($scope.file);
    }
  }
  $scope.upload = function(){
    var file = document.getElementById("file").files[0];
    var img = document.getElementsByTagName("img")[0]
    var reader = new FileReader();
    var str;
    reader.onload = function(e){
      console.log(reader.result);
      var data = JSON.stringify({
        name: file.name,
        type: file.type,
        data: reader.result
      })
      $http.post('/findfile/'+$routeParams.url,data).success(function(result){
        console.log("done");
      })
    }
    var blob = new Blob([file])
    reader.readAsText(blob);
  }
})
