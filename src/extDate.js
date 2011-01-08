/*
 * To localize / override any of the US specific values used in extDate all
 * that needs to be done is to override any/all of the items in the extDate
 * dictionary. For instance convert the days of the week to be localized into 
 * Spanish,one only needs to update the "days" key as such:
 *      extDate.days = {
            ['Domingo', 'Dom'],     // Sunday
            ['Lunes', 'Lun'],       // Monday
            ['Martes', 'Mar'],      // Tuesday
            ['Miercoles', 'Mie'],   // Wednesday
            ['Jueves', 'Jue']       // Thursday
            ['Viernes', 'Vie'],     // Friday
            ['Sabado', 'Sab']       // Saturday        
        };
 */
var extDate = {
    
    // The named months of the year, makes creating dates easier since
    // JavaScript dates are zero-based which is just weird...
    // i.e. 
    //      var d = new Date(2011, extDate.JANUARY, 4);
    // instead of:
    //      var d = new Date(2011, 0, 4);   <--- note january is month zero!
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11,
    
    // Information about each month keyed by month number:
    // Full name | Abbreviated Name | Days in month (non-leap year)
    months: {
        0: ['January', 'Jan', 31],
        1: ['February', 'Feb', 28],
        2: ['March', 'Mar', 31],
        3: ['April', 'Apr', 30],
        4: ['May', 'May', 31],
        5: ['June', 'Jun', 30],
        6: ['July', 'Jul', 31],
        7: ['August', 'Aug', 31],
        8: ['September', 'Sep', 30],
        9: ['October', 'Oct', 31],
        10: ['November', 'Nov', 30],
        11: ['December', 'Dec', 31]
    },
    
    // Information about each day of the week keyed by day number
    // Full name | Abbreviated Name
    days: {
        0: ['Sunday', 'Sun'],
        1: ['Monday', 'Mon'],
        2: ['Tuesday', 'Tue'],
        3: ['Wednesday', 'Wed'],
        4: ['Thursday', 'Thu'],
        5: ['Friday', 'Fri'],
        6: ['Saturday', 'Sat']
    },
    
    // Localized specific directives, these call strftime recursively to create
    // their result so the value is just a format string to use
    local: {
        'x': '%m/%d/%y',                // Localized date display
        'X': '%H:%M:%S',                // Localized time display
        'c': '%a %b %d %H:%M:%S %Y',    // Localized date/time display
        'p': ['AM', 'PM']               // localizations for AM/PM
    },
    
    expressions: {
        '%': /%/,                       // Escaped % sign
        'Y': /^\d\d\d\d/,               // 4-digit year
        'm': /^1[0-2]|0[1-9]|[1-9]/,    // month
        'd': /^3[0-1]|[1-2]\d|0[1-9]|[1-9]| [1-9]/,  // day of month 1-31
        'H': /^2[0-3]|[0-1]\d|\d/,      // 24 hour clock
        'M': /^[0-5]\d|\d/,             // Minute 00-59
        'S': /^[0-5]\d|\d/,             // Seconds 00-59 (not we do not support leap seconds)
        'y': /^\d\d/,                   // 2-digit year
        
        // NOTE: These need to be easily localized. Could rebuild them on-the fly when the function
        // is called...
        'B': /^January|February|March|April|May|June|July|August|September|October|November|December/,
        'b': /^Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/,
        'p': /^AM|PM/,
        'I': /^1[0-2]|0[1-9]|[1-9]| [1-9]/      // 12 hour clock
    }
    
    
};

// =====================
// = Date.isLeapYear() =
// =====================
if(typeof Date.prototype.isLeapYear !== 'function') {
    Date.prototype.isLeapYear = function() {
        var isLeapYear = false;
        var year = this.getFullYear();
        if(year % 400 === 0) {
            isLeapYear = true;
        } else if(year % 100 === 0) {
            isLeapYear = false;
        } else if(year % 4 === 0) {
            isLeapYear = true;
        } else {
            isLeapYear = false;
        }
        return isLeapYear;
    };
}

// ===================
// = Date.strftime() =
// ===================
if(typeof Date.prototype.strftime !== 'function') {
    Date.prototype.strftime = function(format) {
        var year = null;        // variable used within the switch statement
        var month = null;       // variable used within the switch statement
        var hour = null;        // variable used within the switch statement
        var week = null;
        var days = null;
        var today = null;
        var outString = "";     // output string
        var remainingFormat = format;   // format string after being chopped up
        
        var index = remainingFormat.indexOf('%');
        while(index !== -1) {
            // get the directive character
            var directive = remainingFormat.charAt(index+1);
            outString += remainingFormat.substring(0,index);
            switch(directive) {
                case 'a': // Abbreviated weekday name
                    outString += extDate.days[this.getDay()][1];
                    break;
                case 'A': // Full weekday name
                    outString += extDate.days[this.getDay()][0];
                    break;
                case 'b': // Abbreviated month name
                    outString += extDate.months[this.getMonth()][1];
                    break;
                case 'B': // Full month name
                    outString += extDate.months[this.getMonth()][0];
                    break;
                case 'c': // Locale's appropriate date/time representation
                    outString += this.strftime(extDate.local['c']);
                    break;
                case 'd': // Day of month as decimal number 1-31
                    outString += this.getDate();
                    break;
                case 'H': // Hour (24-hour clock) as decimal number 0-23
                    outString += this.getHours();
                    break;
                case 'I': // Hour (12-hour clock) as decimal number 1-12
                    hour = this.getHours() > 12 ? this.getHours()-12 : this.getHours();
                    outString += hour;
                    break;
                case 'j': // Day of year as a decimal number 1-366
                    days = 0;
                    month = this.getMonth();
                    for(var i=0; i< month; i++) {
                        days += extDate.months[i][2];
                        // if it's a leap year and feb, we need to add an extra day
                        if(this.isLeapYear() && i==1) {
                            days += 1;
                        }
                    }
                    days += this.getDate();
                    outString += days;
                    break;
                case 'm': // Month as number 1-12
                    outString += this.getMonth() + 1;
                    break;
                case 'M': // Minute 0-59
                    outString += this.getMinutes();
                    break;
                case 'p': // AM vs PM
                    if(this.getHours() < 12) {
                        outString += extDate.local['p'][0];
                    } else {
                        outString += extDate.local['p'][1];
                    }
                    break;
                case 'S': // Second as number 0-59
                    outString += this.getSeconds();
                    break;
                case 'U': // Week number of year starting on sunday
                    // A: Find the number of days from Jan 1st to the 1st sunday
                    // B: Find the numberof days in the year for the date
                    // Take the difference B-A and divide by 7
                    week = 0;
                    var days_til_sunday = 0;
                    today = new Date(this.getFullYear(), extDate.JANUARY, 1);
                    while(today.getDay() !== 0) {
                        today.setDate(today.getDate()+1);
                        days_til_sunday++;
                    }
                    days = parseInt(this.strftime("%j"), 10);
                    // Only run the calculation if the day in question is after the
                    // first sunday of the year.
                    if(days > days_til_sunday) {
                        week = Math.ceil((days-days_til_sunday) / 7);    
                    }
                    
                    outString += week;
                    break;
                case 'w': // Weekday as number 0-6
                    outString += this.getDay();
                    break;
                case 'W': // Week number of year 0-53 starting on monday
                    // A: Find the number of days from Jan 1st to the 1st monday
                    // B: Find the numberof days in the year for the date
                    // Take the difference B-A and divide by 7
                    week = 0;
                    var days_til_monday = 0;
                    today = new Date(this.getFullYear(), extDate.JANUARY, 1);
                    while(today.getDay() !== 1) {
                        today.setDate(today.getDate()+1);
                        days_til_monday++;
                    }
                    days = parseInt(this.strftime("%j"), 10);
                    // Only run the calculation if the day in question is after the
                    // first sunday of the year.
                    if(days > days_til_monday) {
                        week = Math.ceil((days-days_til_monday) / 7);    
                    }
                    
                    outString += week;
                    break;
                case 'x': // Locale's appropriate date representation
                    outString += this.strftime(extDate.local['x']);
                    break;
                case 'X': // Locale's appropriate time representation
                    outString += this.strftime(extDate.local['X']);
                    break;
                case 'y': // 2 digit year
                    year = this.getFullYear().toString();
                    outString += year.substring(2);
                    break;
                case 'Y': // 4 digit year
                    outString += this.getFullYear();
                    break;
                case 'Z': // Time zone name
                    // NOTE: Not implelemented due to JS limitations w/ timezones
                    outString += "";
                    break;
                case '%': // % sign
                    outString += "%";
                    break;
                default:
                    break;
            }
            
            remainingFormat = remainingFormat.substring(index+2);
            index = remainingFormat.indexOf('%');
        }
        outString += remainingFormat;
        return outString;
    };
}

// ===================
// = String.strptime =
// ===================
if(typeof Date.strptime !== 'function') {
    Date.strptime = function(string, format) { 
        var parsedDate = new Date(1900, 0, 1, 0, 0, 0, 0);
        var remainingFormat = format;
        var remainingString = string;
        var index = format.indexOf('%');
        var match = null;
        var matches = {};
        
        var year = null;
        var month = null;
        var hour = null;
        
        while(index !== -1) {
            var startString = remainingFormat.substring(0,index);
            var directive = remainingFormat.charAt(index+1);
            
            if(remainingString.indexOf(startString)!==0) {
                throw new Error("time data '" + string + "' does not match format '" + format + "'");
            }
            
            remainingString = remainingString.substring(startString.length);
            if(!extDate.expressions.hasOwnProperty(directive)){
                throw new Error("'" + directive + "' is a bad directive in format '%" + directive + "'");
            } 
            
            match = extDate.expressions[directive].exec(remainingString);
            if(match) {
                matches[directive] = match[0];
                remainingString = remainingString.substring(match[0].length);
                match = null;
            } else {
                throw new Error("time data '" + string + "' does not match format '" + format + "'");
            }
                                    
            remainingFormat = remainingFormat.substring(index+2);
            index = remainingFormat.indexOf('%');
        }
        
        if(remainingString!==remainingFormat) {
            throw new Error("time data '" + string + "' does not match format '" + format + "'");
        }
        
        
        // Process all the different tyeps of matches
        // We do this outside of the loop because some of the directives can
        // depend on each other. For example the 12 hour clock can use information
        // from AM/PM directive to figure out if it's 12am or 12pm
        if(matches["Y"]) {
            parsedDate.setFullYear(parseInt(matches["Y"], 10));
        }
        if(matches["m"]) {
            parsedDate.setMonth(parseInt(matches["m"], 10) - 1);
        }
        if(matches["d"]) {
            parsedDate.setDate(parseInt(matches["d"], 10));
        }
        if(matches["H"]) {
            parsedDate.setHours(parseInt(matches["H"], 10));
        }
        if(matches["M"]) {
            parsedDate.setMinutes(parseInt(matches["M"], 10));
        }
        if(matches["S"]) {
            parsedDate.setSeconds(parseInt(matches["S"], 10));
        }
        if(matches['y']) {
            // Open Group specification for strptime() states that a %y
            // value in the range of [00, 68] is in the century 2000, while
            // [69,99] is in the century 1900
            year = parseInt(matches['y'], 10);
            if(year<=68) {
                year += 2000;
            } else {
                year += 1900;
            }
            parsedDate.setFullYear(year);
        }
        // Full month name
        if(matches['B']) {
           month = matches['B'];
           for(index=0;index<12;index++) {
               if(extDate.months[index][0] === month) {
                   parsedDate.setMonth(index);
                   break;
               }
           }
        }
        // Abbreviated month name
        if(matches['b']) {
           month = matches['b'];
           for(index=0;index<12;index++) {
               if(extDate.months[index][1] === month) {
                   parsedDate.setMonth(index);
                   break;
               }
           }
        }
        
        // 12 hour clock
        if(matches['I']) {
            hour = parseInt(matches['I'], 10);
            
            // If am/pm was specified and it's pm, add 12
            if(matches['p'] && matches['p']===extDate.local['p'][1]) {
                if(hour!==12) {
                    hour += 12;
                }
            } else {
                if(hour===12) {
                    hour = 0;
                }
            }
            parsedDate.setHours(hour);
        }
        
        
        
        
        return parsedDate;
    };
}