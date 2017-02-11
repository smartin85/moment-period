'use strict';

describe("Creating a fromTo of a moment", function(){
    moment.period.add({name: 'fromTo15Minutes', count: 15, unit: 'minute'})

    it("should create an object with properties for from and to", function(){
        expect(moment.period.fromTo(moment()).from).toBeDefined();
        expect(moment.period.fromTo(moment()).to).toBeDefined();
    });

    it("should return a fromTo where from and to are same as moment if no period is defined", function(){
        var testMoment = moment();

        expect(testMoment.isSame(moment.period.fromTo(testMoment).from)).toBe(true);
        expect(testMoment.isSame(moment.period.fromTo(testMoment).to)).toBe(true);
    });

    it("should return the start and the end of the period of a moment", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 }).period('fromTo15Minutes');

        expect(testMoment.clone().period(true).isSame(moment.period.fromTo(testMoment).from)).toBe(true);
        expect(testMoment.clone().period(false).isSame(moment.period.fromTo(testMoment).to)).toBe(true);
    });
});