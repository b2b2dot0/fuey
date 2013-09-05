Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function TraceListCtrl($scope, $filter) {
    $scope.orderProp = 'name';
    $scope.traces = {};
    $scope.filteredData = [];
    $scope.query  = {
        text: "",
        status: "",
        environment: ""
    };

    // Update counts and filtered data
    $scope.$watch("traces", function(traces){
        $scope.totalTraces = Object.size(traces);
    }, true);

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
            var update     = JSON.parse(e.data);
            var trace_name = update[0];
            var step       = update[1];
            var steps      = $scope.traces[trace_name].steps;
            $scope.traces[trace_name].status = step.status;
            $scope.traces[trace_name].status_message = step.status_message;
            $scope.traces[trace_name].steps[stepIndex(steps, step.name)] = step;
        });
    }, false);
}
