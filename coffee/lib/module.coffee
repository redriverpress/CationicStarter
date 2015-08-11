Starter.lib

  .constant 'Module', -> # Inject superclasses and other dependencies here
    class Module
      @KEYOWRDS = ['extended', 'included']
      @extend: (obj) ->
        for key, value of obj when key not in Module.KEYOWRDS
          # Assign to this
          @[key] = value

        obj.extended?.apply(@)
        this

      @include: (obj) ->
        for key, value of obj when key not in Module.KEYOWRDS
          # Assign to prototype
          @::[key] = value

        obj.included?.apply(@)
        this
