var Animate = function (option) {
    var from = option.from, to = option.to;
    var timers = option.timers || 1000, timer_Interval = option.timerInterval || 15;
    var alttimers = Math.floor(timers / timer_Interval);
    var time_from = (to - from) / alttimers;
    var index = 0;
    var timer = setInterval(() => {
        index++;
        from += time_from;
        if (index >= alttimers) {
            from = to;
            clearInterval(timer);
            option.onmove && option.onmove(from);
            option.onend && option.onend();
            return;
        }
        option.onmove && option.onmove(from);
    }, timer_Interval);
}