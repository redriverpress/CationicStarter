Starter.controllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  return $scope.chat = Chats.get($stateParams.chatId);
});
