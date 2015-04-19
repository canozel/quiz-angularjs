// Code goes here

// Code goes here
angular.module('sinav', ['ui.bootstrap']);
angular.module('sinav').controller('sinavapp', function($scope, $http, $modal, $log, $timeout) {

  $http.get('exam.json').success(function(data) {
    $scope.questions = data;
  });
  
  $scope.date = new Date();
  $scope.cevaplanmis = true;
  $scope.bos = true;
  $scope.accept = false;
  $scope.counter = 600; //sınav süresi
  $scope.onTimeout = function(){
      if ($scope.counter == 0){
        $scope.counter = -1;
        $scope.accept = true;
        $scope.end();
      }else if($scope.counter > 0){
        $scope.counter--;
      }
      mytimeout = $timeout($scope.onTimeout,1000);
  }
  
  var mytimeout = $timeout($scope.onTimeout,1000);
  
  $scope.stop = function(){
      $timeout.cancel(mytimeout);
  }
  
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
  $scope.show = function(i){
    if($scope.answers[i] != null && $scope.cevaplanmis){
      return true;
    }else if($scope.answers[i] == null && $scope.bos){
      return true;
    }
  }
  
  $scope.answers = [];
  $scope.selected = function(ans,currentTab){
    $scope.answers[currentTab] = ans-1;
  }
  
  $scope.answered = function(){
    var count = 0;
    for (i = 0; i < $scope.answers.length; i++) { 
      if ($scope.answers[i] != null){
        count += 1;
      }
    }
    return count; 
  }
  
  $scope.again = function(){
    $scope.again = false 
  }

  $scope.end = function(size){
    $scope.counter = -1;
    //modal
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
      resolve: {
        answers: function () {
          return $scope.answers;},
        questions: function() {
          return $scope.questions;},
        answered: function () {
          return $scope.answered();},
        accept: function () {
          return $scope.accept;}
      }
    });
  }
});

//modal
angular.module('sinav').controller('ModalInstanceCtrl', function ($scope, $modalInstance, $window,accept, answers, questions, answered) {
  $scope.accept = accept;
  $scope.answers = answers;
  $scope.questions = questions;
  $scope.answered = answered;
  if(accept == true){
        $scope.correct = 0;
    $scope.empty = 5
    var sum = 0 ;
    var empty = 0;
    for (i = 0; i < $scope.answers.length; i++) { 
      if ($scope.answers[i] == $scope.questions[i].answer - 1){
        sum += 1;}
    }
    $scope.correct = sum;
  }
  
  $scope.ok = function () {
    $scope.accept = true;
    
    $scope.correct = 0;
    $scope.empty = 5
    var sum = 0 ;
    var empty = 0;
    for (i = 0; i < $scope.answers.length; i++) { 
      if ($scope.answers[i] == $scope.questions[i].answer - 1){
        sum += 1;}
    }
    $scope.correct = sum;
  };

  $scope.cancel = function () {
    if ($scope.accept){
      $window.location.reload();
    }else{
      $modalInstance.dismiss('cancel');}
  };
});