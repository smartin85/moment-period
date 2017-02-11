'use strict';

describe("Calling the isBetween-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'isBetweenTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isBetweenTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isBetween(testMoment.clone(), testMoment.clone())).toBe(false);
        expect(testMoment.isBetween(testMoment.clone().add(1, 'hour'), testMoment.clone())).toBe(false);        
        expect(testMoment.isBetween(testMoment.clone().subtract(1, 'hour'), testMoment.clone().add(1, 'hour'))).toBe(true);
        expect(testMoment.isBetween(testMoment.clone().startOf('year'), testMoment.clone().endOf('year'), 'year')).toBe(false);
        expect(testMoment.isBetween(testMoment.clone().startOf('year'), testMoment.clone().endOf('year'), 'month')).toBe(true);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isBetweenTest15Minutes')
            .isBetween(testMoment.clone().period('isBetweenTest15Minutes'), testMoment.clone().period('isBetweenTest15Minutes'), 'p')).toBe(false);

        expect(testMoment.clone()
            .isBetween(testMoment.clone().period('isBetweenTest15Minutes'), testMoment.clone().period('isBetweenTest15Minutes'), 'p')).toBe(false);

        expect(testMoment.clone().period('isBetweenTest15Minutes')
            .isBetween(testMoment.clone().period('isBetweenTest15Minutes').subtract(1, 'p'), testMoment.clone().period('isBetweenTest15Minutes').add(1, 'p'), 'p')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().isBetween(testMoment.clone().subtract(1, 'hour'), testMoment.clone().add(1, 'hour'), 'isBetweenTest15Minutes')).toBe(true);
        expect(testMoment.clone().isBetween(testMoment.clone().subtract(1, 'hour'), testMoment.clone().add(1, 'hour'), 'isBetweenTest1Month')).toBe(false);
    });
});