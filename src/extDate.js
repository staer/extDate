var extDate = {
    months: {
        0: ['January', 'Jan'],
        1: ['February', 'Feb'],
        2: ['March', 'Mar'],
        3: ['April', 'Apr'],
        4: ['May', 'May'],
        5: ['June', 'Jun'],
        6: ['July', 'Jul'],
        7: ['August', 'Aug'],
        8: ['September', 'Sep'],
        9: ['October', 'Oct'],
        10: ['November', 'Nov'],
        11: ['December', 'Dec']
    },
    days: {
        0: ['Sunday', 'Sun'],
        1: ['Monday', 'Mon'],
        2: ['Tuesday', 'Tue'],
        3: ['Wednesday', 'Wed'],
        4: ['Thursday', 'Thu'],
        5: ['Friday', 'Fri'],
        6: ['Saturday', 'Sat']
    },
    local: {
        'x': '%m/%d/%y',
        'X': '%H:%M:%S',
        'c': ''
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
        var hour = null;        // variable used within the switch statement
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
                    // TODO
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
                    // TODO
                    break;
                case 'm': // Month as number 1-12
                    outString += this.getMonth() + 1;
                    break;
                case 'M': // Minute 0-59
                    outString += this.getMinutes();
                    break;
                case 'p': // AM vs PM
                    // TODO
                    break;
                case 'S': // Second as number 0-59
                    outString += this.getSeconds();
                    break;
                case 'U': // Week number of year
                    // TODO
                    break;
                case 'w': // Weekday as number 0-6
                    outString += this.getDay();
                    break;
                case 'W': // Week number of year 0-53
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