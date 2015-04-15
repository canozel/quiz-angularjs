// Code goes here

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
  
  $scope.answers = [];
  $scope.selected = function(ans,currentTab){
    $scope.answers[currentTab] = ans-1;
  }
  
  $scope.answered = function(){
    var count = 0;
    for (i = 0; i < $scope.answers.length; i++) { 
      if ($scope.answers[i] !== null){
        count += 1;
      }
    }
    return count; 
  }
  
  $scope.again = function(){
    $scope.again = false 
  }
  
  $scope.end = function(){
    ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
  }
  
  angular.module('sinav').controller('ModalController', function($scope, close) {
    
   $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
   };
  });
});