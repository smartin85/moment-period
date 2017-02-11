'use strict';

describe("Setting a default period", function(){

    it("should log a warning if period is not defined", function(){
        spyOn(console, 'warn');
        moment.period.setDefault('defaultNotDefined');
        expect(console.warn).toHaveBeenCalled();
    });

    it("should be chainable", function(){
        moment.period.add({name: 'defaultChain', unit: 'm'});
        expect(moment.period.setDefault('defaultChain')).toBe(moment.period);
    });

    it("should add this period to moments without period", function(){
        moment.period.add({name: 'default', unit: 'm'}).setDefault('default');
        expect(moment().period()).toBe('default');
    });

    it("should not add this period to moments with a valid period", function(){
        moment.period
            .add({name: 'default', unit: 'm'})
            .add({name: 'notDefault', unit: 'y'})
            .setDefault('default');
        expect(moment().period('notDefault').period()).not.toBe('default');
    });

    it("should clear the defaultPeriod if the period is falsy", function(){
        moment.period
            .setDefault();
        expect(moment().period()).toBeUndefined();
    });
});