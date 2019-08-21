matchLunchEvent = (function (win, $) {
    const AM_PM = ['AM', 'PM'];
    const START_TIME = 9;
    const END_TIME = 9;
    const DURATION = 12;
    const HALF_HOUR = 30;
    const space = 625;
    const totalDur = 720;

    function init() {
        for (let count = 0, startTime = 0; count <= DURATION; count++, startTime++) {

            const $timeControls = $('.time-controls');

            let time = START_TIME + startTime;
            const unit = AM_PM[time >= 12 ? 1 : 0];

            time = time > 12 ? time - 12 : time;
            const mainLabel = time + ':00 ' + unit;

            $timeControls
                .append(
                    $('<div>')
                        .append($('<span>').addClass('highlight').text(time + ':00'))
                        .append($('<span>').addClass('unit f10').text(unit))
                );

            if (!(unit === AM_PM[1] && time === END_TIME)) {
                $timeControls.append($('<div>').addClass('f10').text(time + ':30'));
            }

        }
    }

    function EmployeeEvent(name, start, end, duration) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.isOverlapped = false;
        this.isSelf = false;
    }

    EmployeeEvent.prototype.setIsOverlapped = function (isOverlapped) {
        this.isOverlapped = isOverlapped;
    };
    EmployeeEvent.prototype.setIsSelf = function (isSelf) {
        this.isSelf = isSelf;
    };
    EmployeeEvent.prototype.setIsEqualDuration = function (isEqualDuration) {
        this.isEqualDuration = isEqualDuration;
    };
    EmployeeEvent.prototype.setOverlapDuration = function (overlapDuration) {
        this.overlapDuration = overlapDuration;
    };

    init();

    function drawEvents(events) {
        $('.event').remove();
        events.forEach(function (item) {
            $('.scheduler')
                .append(
                    $('<div>')
                        .addClass('event')
                        .addClass(item.isOverlapped ? 'scheduled' : item.isSelf ? 'open' : '')
                        .css({
                            top: `${item.start}px`,
                            height: `${item.duration}px`
                        })
                        .text(item.name));
        });
    }


    return function (events) {
        if (!events || events.length === 0) {
            drawEvents([]);
        } else {
            const otherEvents = events.splice(1);
            const self = new EmployeeEvent('Me', events[0].start, events[0].end, events[0].end - events[0].start);
            self.setIsSelf(true);
            const others = [];
            let overlapDurationMax = 30;
            let startForMaxOverlap = self.end;

            otherEvents.forEach(function (item) {
                const start = item.start > self.end ? 0 : Math.max(item.start, self.start);
                const end = start === 0 ? 0 : Math.min(item.end, self.end);
                const overlapDuration = end - start;

                const employeeEvent = new EmployeeEvent('Brilliant Lunch', item.start, item.end, item.end - item.start);
                employeeEvent.setOverlapDuration(overlapDuration);
                others.push(employeeEvent);
                overlapDurationMax = Math.max(overlapDurationMax, overlapDuration);

                if (overlapDurationMax === overlapDuration) {
                    startForMaxOverlap = Math.min(startForMaxOverlap, item.start);
                }
            });

            let matched;

            if (others.length) {
                matched = others.filter(function (item) {
                    return item.overlapDuration === overlapDurationMax && item.start === startForMaxOverlap;
                });
            }

            const matchedCount = matched.length;

            if (matchedCount > 0) {
                self.isOverlapped = true;
                const matchIndex = Math.floor((Math.random() * matchedCount) + 1);
                matched[matchIndex - 1].isOverlapped = true;
            }

            drawEvents([self, ...others]);
        }
    }
})(window, jQuery);
// matchLunchEvent([]);
// matchLunchEvent([{start: 225, end: 285}, {
//     start: 300,
//     end: 360
// }, {start: 180, end: 240}]);
matchLunchEvent ([{start: 225, end: 285},{start: 210,
    end: 270},{start: 180, end: 240},{start: 240, end:
        300},{start: 300, end: 360},{start: 270, end: 330}]);