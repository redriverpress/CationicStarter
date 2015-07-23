angular.module 'starter.controllers', []

  .controller 'DashCtrl', ($scope) ->
    $scope

  .controller 'ChatsCtrl', ($scope, Chats) ->
    # With the new view caching in Ionic, Controllers are only called
    # when they are recreated or on app start, instead of every page change.
    # To listen for when this page is active (for example, to refresh data),
    # listen for the $ionicView.enter event:
    #
    #$scope.$on '$ionicView.enter', (e) ->
    #
    $scope.chats  = Chats.all()
    $scope.remove = (chat) ->
      Chats.remove(chat)

  .controller 'ChatDetailCtrl', ($scope, $stateParams, Chats) ->
    $scope.chat = Chats.get $stateParams.chatId

  .controller 'AccountCtrl', ($scope) ->
    $scope.settings =
      enableFriends: true
