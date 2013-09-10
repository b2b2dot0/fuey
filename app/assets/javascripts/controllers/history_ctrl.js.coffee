fuey.controller "HistoryCtrl", @HistoryCtrl = ($scope, $window, Trace) ->
  $scope.traceName = $window.traceName
  $scope.traces = Trace.query(traceName:$scope.traceName)
