var extDate = {
    months: {
        0: ['January', 'Jan'],
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
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
        var outString = "";
        var remainingFormat = format;
        
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
                    break;
                case 'B': // Full month name
                    break;
                case 'c':
                    break;
                case 'd':
                    break;
                case 'Y': // 4 digit year
                    outString += this.getFullYear();
                    break;
                case 'y': // 2 digit year
                    var year = this.getFullYear().toString();
                    outString += year.substring(2);
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