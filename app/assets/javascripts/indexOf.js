if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
};

function stepIndex(steps, stepName){
    for (var i = 0, j = steps.length; i < j; i++) {
        if (steps[i].name === stepName)
            return i;
    }
    return -1;
};