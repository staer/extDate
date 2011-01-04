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
                case 'Y':
                    outString += this.getFullYear();
                    break;
                case 'y':
                    var year = this.getFullYear().toString();
                    outString += year.substring(2);
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

if(typeof Date.strptime !== 'function') {
    Date.strptime = function(a) { 
        return(new Date(1900,1,1)); 
    };
}