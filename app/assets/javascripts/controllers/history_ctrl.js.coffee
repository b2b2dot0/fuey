fuey.controller "HistoryCtrl", @HistoryCtrl = ($scope, Trace) ->
   $scope.traces = Trace.query()
