Starter.controllers

  .controller 'ChatDetailCtrl', ($scope, $stateParams, Chats) ->
    $scope.chat = Chats.get $stateParams.chatId
