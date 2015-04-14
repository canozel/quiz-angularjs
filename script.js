// Code goes here
angular.module('sinav', ['ui.bootstrap']);
angular.module('sinav').controller('sinavapp', function($scope, $http) {

  $http.get('exam.json').success(function(data) {
    $scope.questions = data;
  });
  
  $scope.onClickTab = function(question) {
    $scope.currentTab = question.id;
  }

  $scope.onClickNB = function(currentTab, length) {
    if (currentTab < length - 1) {
      $scope.currentTab = currentTab + 1;
    }
  }

  $scope.onClickPB = function(currentTab, length) {
    if (currentTab > 0) {
      $scope.currentTab = currentTab - 1;
    }
  }
  
  $scope.addClass = function(checked) {
    if (checked){
      return "list-group-item-success";
    }
  }
});