fuey.factory "Trace", @Trace = ($resource) ->
  $resource '/traces/:traceName', traceName: '@traceName'
