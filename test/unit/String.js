module("String");			
test("Tests for String.strptime()", function() {
    // String.strptime() is just a wrapper around Date.strptime() to
    // make things a bit more convenient, thus we do not need a full test suite
    deepEqual("12/25/2001".strptime("%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 25, 0, 0, 0, 0),
                "Parse day of month number");
                
    deepEqual("12/25/2001 9:30:15".strptime("%m/%d/%Y %H:%M:%S"),
                new Date(2001, extDate.DECEMBER, 25, 9, 30, 15, 0),
                "Parse seconds");
    
    
});