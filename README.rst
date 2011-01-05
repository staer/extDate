About
=====

extDate is a set of extensions to the JavaScript Date object adding in some missing functionality. Features include:

* Date.isLeapYear(): check to see if the date occurs on a leap year
* Date.strftime(): Output the date in a variety of formats (similar to Python strftime)
* A String.strptime(): Parse a string into a valid Date object (COMING SOON)
* Helper constants to make creating new Date objects easier
* Easy localization: Easily make the module work in languages other than English

Installation
============

Coming soon...

Usage
=====

Date.isLeapYear()
-----------------

This method returns true/false if the date occurs on a leap year::

    var d = new Date(2011,0,1);   // January 1st, 2011
    d.isLeapYear();				  // Returns false

Date.strftime(format)
---------------------

This method returns a date string based on the format string passed in::

    var d = new Date(2011, 0, 1);     // January 1st, 2011
    var s = d.strftime("%m/%d/%Y");   // 's' contains "1/1/2011"

The format strings and directives that can be used are roughly the same as those available in Python, see http://www.strftime.org or http://docs.python.org/library/time.html#time.strftime for more information.

More information coming soon...

String.strptime(format)
-----------------------

This method parses on a string based on the format parameter and returns a Date object::

    var s = "1/1/2011";
    var d = s.strptime("%m/%d/%Y");   // d = Date(2011,0,1);

More information coming soon....

Helpers
-------

One of the problems I have with JavaScript Date objects is that is uses zero-based months. For instance, January is the 0th month instead of the 1st. For this reason when creating new Date objects you need to do something like::
    
    var d = new Date(2011, 0, 1);		// January 1st

Which is somewhat un-inuititive. As such, extDate contains some constants to help make creating dates a bit more clear::

    var d = new Date(2011, extDate.months.JANUARY, 1);		// January 1st
	var d= new Date(2011, extDate.months.MARCH, 15);		// March 15th
	// etc...

Localization
============

It is very easy to localize extDate to different languages, more will be coming soon.




