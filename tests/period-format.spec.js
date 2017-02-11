'use strict';

describe("Calling the format-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'formatTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'formatTest1Month', unit: 'month'})
        .add({name: 'formatWithString', unit: 'minute', format: 'mm' })
        .add({name: 'formatWithFunction', unit: 'hour', format: function() {return 'OK'; }});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-format or undefined", function(){
        expect(testMoment.format()).toBe("2010-06-05T05:08:03Z");
        expect(testMoment.format('DD')).toBe("05");        
        expect(testMoment.format('[period] YYYY-MM-DD HH:mm:ss')).toBe("period 2010-06-05 05:08:03");
    });

    it("should take the format of momentjs if period has no format", function(){
        expect(testMoment.clone().period('formatTest15Minutes').format()).toBe("2010-06-05T05:08:03Z");
        expect(testMoment.clone().period('formatTest15Minutes').format('p')).toBe("2010-06-05T05:08:03Z");
        expect(testMoment.clone().period('formatTest15Minutes').format('period')).toBe("2010-06-05T05:08:03Z");
    });

    it("should take the format of the period if period has a format string", function() {
        expect(testMoment.clone().period('formatWithString').format('p')).toBe("08");
        expect(testMoment.clone().period('formatWithString').format('period')).toBe("08");
    });

    it("should take the format of the period if period has a format function", function() {
        expect(testMoment.clone().period('formatWithFunction').format('p')).toBe("OK");
        expect(testMoment.clone().period('formatWithFunction').format('period')).toBe("OK");
    });
});