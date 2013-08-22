function TraceListCtrl($scope) {
    $scope.orderProp = 'name';
    $scope.traces = {};
    $scope.search = function(value) {
        console.log(value);
    }

    // Wire up SSE
    var source = new EventSource('/traces');
    source.addEventListener('new', function(e) {
        $scope.$apply(function() {
            var trace = JSON.parse(e.data);
            $scope.traces[trace.name] = trace;
        });
    }, false);
    source.addEventListener('update', function(e) {
        $scope.$apply(function() {
            var trace = JSON.parse(e.data);
            var steps = $scope.traces[trace.name].steps;
            $scope.traces[trace.name].status = trace.status;
            $scope.traces[trace.name].statusMessage = trace.statusMessage;
            $scope.traces[trace.name].steps[stepIndex(steps, trace.steps[0].name)] = trace.steps[0];
        });
    }, false);
}
