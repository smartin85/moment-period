(function (root, factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		define(['moment'], factory);                 // AMD
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('moment')); // Node
	} else {
		factory(root.moment);                        // Browser
	}
}(this, function (moment) {
	"use strict";

    var VERSION = "1.0.0",
        periods = {},
        periodFlag = '_p',
        optionsFlag = '_po',
        defaultPeriod,
        calcSafeUnits = 'year_quarter_month_week_day_hour_minute_second_millisecond'.split('_'),
        disalowedNames = '_p_period_periods_isoWeek_weekday_isoWeekday_weekYear_isoWeekYear_date_dayOfYear'.split('_').concat(calcSafeUnits),
        momentVersion = moment.version.split('.'),
        momentProperties = moment.momentProperties,
		major = +momentVersion[0],
		minor = +momentVersion[1],
        patch = +momentVersion[2],
        mfn = moment.fn,
        original = {},
        fn;
   

	/************************************
		Global Methods
	************************************/

    function replaceOriginal(name, index) {
        original[name] = mfn[name];
        mfn[name] = function() {
            var period = getPeriod.call(this, arguments[index]);
            if(period) {
                return fn[name].apply(this, arguments);
            }
            return original[name].apply(this, arguments);
        };
    }

    function getName(period, ignoreWarning) {
        var name = typeof period === 'string' ? period : defaultPeriod;

        if(!periods[name]) {
            ignoreWarning || logWarning("Moment Period has no data for " + period);
            return;
        }

        return name && periods[name].name;
    }

    function logError (message) {
		if (typeof console !== 'undefined' && typeof console.error === 'function') {
			console.error(message);
		}
	}

    function logWarning(msg) {
        if (typeof console !==  'undefined' && typeof console.warn === 'function') {
            console.warn(msg);
        }
    }

    function registerPeriod(p) {
        var unit = p && moment.normalizeUnits(p.unit),
            nameAsUnit = p && moment.normalizeUnits(p.name);

        if(!p || !p.name || !unit) {
            logError(JSON.stringify(p) + " is not a valid period");
            return;
        }

        if(calcSafeUnits.indexOf(unit) < 0) {
            logWarning(unit + " is not a safe unit for calculations")
        }

        p.unit = unit;
        p.count = p.count || 1;
        p.align = typeof p.align === 'function' ? p.align : function() {
            var unit = this.get(p.unit);
            this.set(p.unit, unit - unit % p.count).startOf(p.unit);
        };

        if(disalowedNames.indexOf(nameAsUnit) >= 0) {
            logError(p.name + " is not allowed as period name because it equals " + (nameAsUnit ? "the Moment.js-unit " + nameAsUnit : "the identifier for own periods"));
            return;
        }

        periods[p.name] = p;
    }

    function prepareRegisterPeriod(p) {
        var i = 0, length;
        if(!Array.isArray(p)) {
            p = [p];
        }
        length = p.length;
        for(i; i < length; i++) {
            registerPeriod(p[i]);
        }
        return moment.period;
    }

    function setDefaultPeriod(input) {
        defaultPeriod = input ? getName(input) : undefined;        
        moment.fn[periodFlag] = defaultPeriod;
        return moment.period;
    }

    function nameIsOwnPeriod(name) {
        return name === 'period' || name === 'p' || name === 'periods';
    }

    function getFromTo(mom) {
        mom = moment.isMoment(mom) ? mom.clone() : moment(mom);
        return {
            from: mom.period(true),
            to: mom.clone().period(false)
        };
    }

    /************************************
        Prepare moment-period
     ************************************/

    // Do not load moment-period a second time.
	if (moment.period !== undefined) {
		logError('Moment Period ' + moment.period.version + ' was already loaded ');
		return moment;
	}

    // Moment.js version check
	if (major < 2 || (major === 2 && minor < 8 && patch < 1)) {
		logError('Moment Period requires Moment.js >= 2.8.1. You are using Moment.js ' + moment.version + '. See momentjs.com');
	}

    // Create new periodFlag if _p allready exists
    if(momentProperties.indexOf(periodFlag) >= 0) {
        do {
            periodFlag += '_';
        } while(momentProperties.indexOf(periodFlag) < 0);
    }

    // Create new optionsFlag if _po allready exists
    if(momentProperties.indexOf(optionsFlag) >= 0) {
        do {
            optionsFlag += '_';
        } while(momentProperties.indexOf(optionsFlag) < 0);
    }


    /************************************
		Current Period
	************************************/

    function getPeriod(name) {
        if(nameIsOwnPeriod(name)) {
            return periods[this[periodFlag]];
        }
        return periods[name];
    }

    function alignToStartOfPeriod() {
        var period;
        this[periodFlag] || (this[periodFlag] = defaultPeriod);
        period = periods[this[periodFlag]];        
        period && period.align.call(this, [this[optionsFlag]]);
    }

    function alignToEndOfPeriod() {
        alignToStartOfPeriod.call(this);
        this[periodFlag] && this.add(1, 'p').subtract(1, 'ms');
    }

    fn = {
        startOf: function(name, options) {
            if(nameIsOwnPeriod(name)) {
                return this.period(true);
            }

            if(periods[name]) {
                return this.period(name, options).period(true);
            }

            return original.startOf.apply(this, arguments);
        },
        endOf: function(name, options) {
            if(nameIsOwnPeriod(name)) {
                return this.period(false);
            }

            if(periods[name]) {
                return this.period(name, options).period(false);
            }

            return original.endOf.apply(this, arguments);
        },
        add: function(count, unit) {
            var period = getPeriod.call(this, unit);
            
            if(period) {
                return original.add.call(this, period.count * count, period.unit);
            }

            return original.add.apply(this, arguments);
        },
        subtract: function(count, unit) {
            var period = getPeriod.call(this, unit);
            
            if(period) {
                return original.subtract.call(this, period.count * count, period.unit);
            }

            return original.subtract.apply(this, arguments);
        },
        isBefore: function(mom, unit) {
            var clone,
                period = getPeriod.call(this, unit);

            if(period) {
                clone = (moment.isMoment(mom) ? mom.clone() : moment(mom)).period(nameIsOwnPeriod(unit) ? true : period.name);
                return this.clone().period(period.name).period(false) < clone.period(true);
            }

            return original.isBefore.apply(this, arguments);
        },
        isAfter: function(mom, unit) {
            var clone,
                period = getPeriod.call(this, unit);

            if(period) {
                clone = (moment.isMoment(mom) ? mom.clone() : moment(mom)).period(nameIsOwnPeriod(unit) ? true : period.name);
                return this.clone().period(period.name).period(true) > clone.period(false);
            }

            return original.isAfter.apply(this, arguments);
        },
        isSame: function(mom, unit) {
            var clone, self,
                period = getPeriod.call(this, unit);

            if(nameIsOwnPeriod(unit)) {
                clone = (moment.isMoment(mom) ? mom.clone() : moment(mom)).fromTo();
                self = this.fromTo();
                return self.from <= clone.from && self.to >= clone.to;
            } else if(period) {
                clone = (moment.isMoment(mom) ? mom.clone() : moment(mom)).period(period.name).fromTo();
                self = this.clone().period(period.name).fromTo();
                return self.from <= clone.from && self.to >= clone.to;
            }

            return original.isSame.apply(this, arguments);
        },
        isSameOrBefore: function(mom, unit) {
            if(nameIsOwnPeriod(unit)) {
                return fn.isSame.apply(this, arguments) || fn.isBefore.apply(this, arguments);
            }

            return original.isSameOrBefore.apply(this, arguments);
        },
        isSameOrAfter: function(mom, unit) {
            if(nameIsOwnPeriod(unit)) {
                return fn.isSame.apply(this, arguments) || fn.isAfter.apply(this, arguments);
            }

            return original.isSameOrAfter.apply(this, arguments);
        },
        isBetween: function(from, to, unit, inclusivity) {
            var self;
            if(nameIsOwnPeriod(unit)) {
                from = (moment.isMoment(from) ? from.clone() : moment(from)).period(false);
                to = (moment.isMoment(to) ? to.clone() : moment(to)).period(true);
                self = getFromTo(this);       
                return original.isBetween.call(self.from, from, to, null, inclusivity) && original.isBetween.call(self.to, from, to, null, inclusivity);
            }

            return original.isBetween.apply(this, arguments);
        },
        format: function(name) {
            var period = getPeriod.call(this, name),
                format = period && period.format,
                args = Array.prototype.slice.call(arguments);
            
            if(typeof format === 'function') {
                return format.call(this, args.shift());
            }

            if(typeof format === 'string') {
                return original.format.call(this, format);
            }

            return original.format.call(this, period ? undefined : name);
        },
        fromTo: function(period, options) {
            var clone = this.clone();
            if(period) {
                clone.period(period, options);
            }
            return getFromTo(clone);
        }
    };


    /************************************
	    moment.period namespace
	************************************/

    function period(input){
        var args = Array.prototype.slice.call(arguments, 0, -1),
            name = arguments[arguments.length - 1];

        // Return period by name
        if(arguments.length === 1 && typeof input === 'string'){
            return periods[input];
        }

        // Return moment with period
        return moment.apply(null, args).period(getName(name));
    }

    period.version = VERSION;
    period._periods = periods;
    period._default = defaultPeriod;
    period.setDefault = setDefaultPeriod;
    period.add = prepareRegisterPeriod;
    period.fromTo = getFromTo; // TODO: Tests schreiben

    moment.period = period;


	/************************************
		Interface with Moment.js
	************************************/

    mfn.period = function(input, options) {
        
        // Return current period
        if(typeof input === 'undefined') {
            return getName(this[periodFlag], true);
        }

        // Set period
        if(typeof input === 'string') {
            this[periodFlag] = getName(input);
            options && (this[optionsFlag] = options);
        }        

        // Remove current period
        if (input === null) {
            delete this[periodFlag];
            delete this[optionsFlag];
        }

        this[optionsFlag] = options || this[optionsFlag];
        this[periodFlag] || (this[periodFlag] = defaultPeriod);

        // Set to start of period
        if (input === true) {
            alignToStartOfPeriod.call(this);
        }

        // Set to end of period
        if (input === false) {
            alignToEndOfPeriod.call(this);
        }

        return this;
    };

    mfn.fromTo = fn.fromTo;
    replaceOriginal('startOf', 0);
    replaceOriginal('endOf', 0);
    replaceOriginal('add', 1);
    replaceOriginal('subtract', 1);
    replaceOriginal('isBefore', 1);
    replaceOriginal('isAfter', 1);
    replaceOriginal('isSame', 1);
    replaceOriginal('isSameOrBefore', 1);
    replaceOriginal('isSameOrAfter', 1);
    replaceOriginal('isBetween', 2);
    replaceOriginal('format', 0);
    
    // Cloning a moment should include the propertis for the current period and the it´s options.
    momentProperties.push(periodFlag);
    momentProperties.push(optionsFlag);

    return moment;
}));