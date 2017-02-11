'use strict';

describe("Adding periods", function(){

    it("should create an _periods object in moment.period namespace", function(){
        moment.period.add({name: '1min', unit: 'minute'});
        expect(moment.period._periods).toBeDefined();
    });

    it("should create an object with same name and values in _period", function(){
        var name = '1min', unit = 'minute';
        moment.period.add({name: name, unit: unit});
        expect(moment.period._periods[name]).toBeDefined();
        expect(moment.period._periods[name].name).toBe(name);
        expect(moment.period._periods[name].unit).toBe(unit);
    });

    it("should automaticaly create a count and an align function if not defined", function(){
        var name = '1min', unit = 'minute';
        moment.period.add({name: name, unit: unit});
        expect(moment.period._periods[name].count).toBe(1);
        expect(typeof moment.period._periods[name].align).toBe('function');
    });

    it("should print an error to the console if no valid period was defined", function(){
        spyOn(console, 'error');
        
        moment.period.add();
        moment.period.add({});
        moment.period.add(null);
        moment.period.add(true);
        moment.period.add(false);
        moment.period.add(1);
        moment.period.add({unit: 'minute'});
        moment.period.add({name: 'test'});

        expect(console.error).toHaveBeenCalledTimes(8);
    });

    it("should print a warning to the console if a period with an unsafe unit was defined", function(){
        spyOn(console, 'warn');

        moment.period.add({name: 'test', unit: 'isoWeek'});
        moment.period.add({name: 'test', unit: 'weekday'});
        moment.period.add({name: 'test', unit: 'isoWeekday'});
        moment.period.add({name: 'test', unit: 'weekYear'});
        moment.period.add({name: 'test', unit: 'isoWeekYear'});
        moment.period.add({name: 'test', unit: 'date'});
        moment.period.add({name: 'test', unit: 'dayOfYear'});

        expect(console.warn).toHaveBeenCalledTimes(7);        
    });

    it("should print an error to the console if a moment-unit was defined as period name", function(){
        spyOn(console, 'error');

        moment.period.add({name: 'isoWeek', unit: 'minute' });
        moment.period.add({name: 'weekday', unit: 'minute' });
        moment.period.add({name: 'isoWeekday', unit: 'minute' });
        moment.period.add({name: 'weekYear', unit: 'minute' });
        moment.period.add({name: 'isoWeekYear', unit: 'minute' });
        moment.period.add({name: 'date', unit: 'minute' });
        moment.period.add({name: 'dayOfYear', unit: 'minute' });
        moment.period.add({name: 'year', unit: 'minute' });
        moment.period.add({name: 'quarter', unit: 'minute' });
        moment.period.add({name: 'month', unit: 'minute' });
        moment.period.add({name: 'week', unit: 'minute' });
        moment.period.add({name: 'day', unit: 'minute' });
        moment.period.add({name: 'hour', unit: 'minute' });
        moment.period.add({name: 'minute', unit: 'minute' });
        moment.period.add({name: 'second', unit: 'minute' });
        moment.period.add({name: 'millisecond', unit: 'minute' });        
        moment.period.add({name: 'm', unit: 'minute' });        

        expect(console.error).toHaveBeenCalledTimes(17);
    });

    it("should be able to add multiple periods as an array", function() {
        moment.period.add([
            { name: 'array-test-1', unit: 'day' },
            { name: 'array-test-2', unit: 'year' }
        ]);
        expect(moment.period._periods['array-test-1']).toBeDefined();
        expect(moment.period._periods['array-test-2']).toBeDefined();
    });

    it("should be chainable", function(){
        expect(moment.period.add({name: 'chain1', unit: 'minute'})).toBe(moment.period);
        moment.period.add({name: 'chain2', unit: 'm'}).add({name: 'chain3', unit: 'y'});
        expect(moment.period._periods['chain1']).toBeDefined();
        expect(moment.period._periods['chain2']).toBeDefined();
        expect(moment.period._periods['chain3']).toBeDefined();
    });

});