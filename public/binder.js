var app = angular.module('clip',['ngRoute','ngResource'])

app.config(function($routeProvider,$locationProvider){
  $routeProvider.
  when('/',{
    templateUrl:"main.html"
  }).
  when('/:url',{
    templateUrl:'url.html',
    controller: "url"
  })
  $locationProvider.html5Mode({enabled:true})
});

app.controller("url",function($scope,$http,$routeParams){
    var urls = $routeParams.url;
    console.log(urls);
    $http.get('/'+urls).success(function(result){
      if(result.exists) {
        $scope.content = result.content;
        $scope.exists=false;
      }
      else {
        $scope.exists = true;
        $scope.content="";
      }
    })
})
