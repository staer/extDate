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
        'c': '%a %b %d %H:%M:%S %Y'     // Localized date/time display
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
        var days = null;
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
                        outString += "AM";
                    } else {
                        outString += "PM";
                    }
                    break;
                case 'S': // Second as number 0-59
                    outString += this.getSeconds();
                    break;
                case 'U': // Week number of year starting on sunday
                    // TODO
                    break;
                case 'w': // Weekday as number 0-6
                    outString += this.getDay();
                    break;
                case 'W': // Week number of year 0-53 starting on monday
                    // TODO
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
                    // TODO
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
if(typeof String.prototype.strptime !== 'function') {
    String.prototype.strptime = function(format) { 
        return(new Date(1900,1,1)); 
    };
}