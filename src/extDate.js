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
        var outString = "";     // output string
        var remainingFormat = format;   // format string after being chopped up
        
        var index = remainingFormat.indexOf('%');
        while(index !== -1) {
            // get the directive character
            var directive = remainingFormat.charAt(index+1);
            outString += remainingFormat.substring(0,index);
            switch(directive) {
                case 'a': // Abbreviated weekday name
                    break;
                case 'A': // Full weekday name
                    break;
                case 'b': // Abbreviated month name
                    outString += extDate.months[this.getMonth()][1];
                    break;
                case 'B': // Full month name
                    break;
                case 'c': // Locale's appropriate date/time representation
                    break;
                case 'd': // Day of month as decimal number 01-31
                    break;
                case 'H': // Hour (24-hour clock) as decimal number 0-23 
                    break;
                case 'I': // Hour (12-hour clock) as decimal number 1-12
                    break;
                case 'j': // Day of year as a decimal number 1-366
                    break;
                case 'm': // Month as number 1-12
                    break;
                case 'M': // Minute 1-59
                    break;
                case 'p': // AM / PM
                    break;
                case 'S': // Second as number 0-59
                    break;
                case 'U': // Week number of year
                    break;
                case 'w': // Weekday as number 0-6
                    break;
                case 'W': // Week number of year 0-53
                    break;
                case 'x': // Locale's appropriate date representation
                    break;
                case 'X': // Locale's appropriate time representation
                    break;
                case 'y': // 2 digit year
                    year = this.getFullYear().toString();
                    outString += year.substring(2);
                    break;
                case 'Y': // 4 digit year
                    outString += this.getFullYear();
                    break;
                case 'Z': // Time zone name
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