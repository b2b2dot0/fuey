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
            var trace = JSON.parse(e.data);
            var steps = $scope.traces[trace.name].steps;
            $scope.traces[trace.name].status = trace.status;
            $scope.traces[trace.name].statusMessage = trace.statusMessage;
            $scope.traces[trace.name].steps[stepIndex(steps, trace.steps[0].name)] = trace.steps[0];
        });
    }, false);
}
