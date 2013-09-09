fuey.controller "TracesCtrl", @TracesCtrl = ($scope, $filter) ->
  $scope.orderProp = "name"
  $scope.traces = {}
  $scope.filteredData = []
  $scope.query =
    text: ""
    status: ""
    environment: ""
  
  # Update counts and filtered data
  $scope.$watch "traces", ((traces) ->
    $scope.totalTraces = Object.size(traces)
  ), true
  
  # Wire up SSE
  source = new EventSource("/traces")
  source.addEventListener "new", ((e) ->
    $scope.$apply ->
      trace = JSON.parse(e.data)
      $scope.traces[trace.name] = trace

  ), false
  source.addEventListener "update", ((e) ->
    $scope.$apply ->
      update = JSON.parse(e.data)
      trace_name = update[0]
      step = update[1]
      steps = $scope.traces[trace_name].steps
      $scope.traces[trace_name].status = step.status
      $scope.traces[trace_name].status_message = step.status_message
      $scope.traces[trace_name].steps[stepIndex(steps, step.name)] = step

  ), false

Object.size = (obj) ->
  size = 0
  key = undefined
  for key of obj
    size++  if obj.hasOwnProperty(key)
  size