Starter.controllers.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  return $scope.remove = function(chat) {
    return Chats.remove(chat);
  };
});
