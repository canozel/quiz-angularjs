// Code goes here

// Code goes here
angular.module('sinav', ['ui.bootstrap']);
angular.module('sinav').controller('sinavapp', function($scope, $http, $modal, $log) {

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
  $scope.selected = function(ans, currentTab) {
    $scope.answers[currentTab] = ans - 1;
  }

  $scope.answered = function() {
    var count = 0;
    for (i = 0; i < $scope.answers.length; i++) {
      if ($scope.answers[i] != null) {
        count += 1;
      }
    }
    return count;
  }

  $scope.again = function() {
    $scope.again = false
  }

  $scope.end = function(size) {

    //modal
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
      resolve: {
        answers: function() {
          return $scope.answers;
        },
        questions: function() {
          return $scope.questions;
        },
        answered: function() {
          return $scope.answered();
        }
      }
    });
  }
});

//modal
angular.module('sinav').controller('ModalInstanceCtrl', function($scope, $modalInstance, $window, answers, questions, answered) {
  $scope.accept = false;
  $scope.answers = answers;
  $scope.questions = questions;
  $scope.answered = answered;

  $scope.ok = function() {
    $scope.accept = true;

    $scope.correct = 0;
    $scope.empty = 5
    var sum = 0;
    var empty = 0;
    for (i = 0; i < $scope.answers.length; i++) {
      if ($scope.answers[i] == $scope.questions[i].answer - 1) {
        sum += 1;
      }
    }
    $scope.correct = sum;
  };

  $scope.cancel = function() {
    if ($scope.accept) {
      $window.location.reload();
    } else {
      $modalInstance.dismiss('cancel');
    }
  };
});