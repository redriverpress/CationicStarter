# Ionic Starter App

# angular.module is a global place for creating, registering and retrieving Angular modules
# 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
# the 2nd parameter is an array of 'requires'
# 'starter.services' is found in services.js
# 'starter.controllers' is found in controllers.js

window.Starter =
  application: angular.module 'starter',
    [
      'ionic', # Add other packages here...
      'starter.lib', 'starter.controllers', 'starter.services'
    ]
  controllers:  angular.module 'starter.controllers', []
  services:     angular.module 'starter.services', []
  lib:          angular.module 'starter.lib', []
