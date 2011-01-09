About
=====

extDate is a set of extensions regarding the JavaScript Date object, adding in some missing functionality. Features include:

* Date.isLeapYear(): check to see if the date occurs on a leap year
* Date.strftime(): Output the date in a variety of formats (similar to Python strftime)
* Date.strptime(): Parse a string into a valid Date object
* String.strptime(): Wrapper around Date.strptime() for convenient use in Strings
* Helper constants to make creating new Date objects easier
* Easy localization: Easily make the module work in languages other than English

Installation
============

Grab the latest version of extDate on GitHub by browsing the repository source tree and finding the extDate.js file located in the src directory. Alternatively you can clone the whole repository by running::

	git clone https://github.com/staer/extDate.git

To add extDate into your website project, all you have to do is add the following script tag at the top of your HTML file along with the rest of your JavaScript includes::

    <script type="text/javascript" src="/path/to/extDate.js"></script>

That's it! Keep reading for more information on how to use extDate.js

Usage
=====

Date.isLeapYear()
-----------------

This method returns true/false if the date occurs on a leap year::

    var d = new Date(2011,0,1);   // January 1st, 2011
    d.isLeapYear();				  // Returns false

There is also a convenience wrapper method associated with the Date object itself to make code a bit cleaner at times. The method can be used as such::

	if(Date.isLeapYear(2011)) {
		// do something because it is a leap year
	}
	


Date.strftime(format, useUTC)
---------------------

This method returns a date string based on the format string passed in::

    var d = new Date(2011, 0, 1);     // January 1st, 2011
    var s = d.strftime("%m/%d/%Y");   // 's' contains "1/1/2011"

The format strings and directives that can be used are roughly the same as those available in Python, see http://www.strftime.org or http://docs.python.org/library/time.html#time.strftime for more information. 

Note: The only directive that is not supported in this implementation is the timezone (%Z) directive as JavaScript date objects do not really support time zones.

Note: The strings that are returned which represent numbers are always returned using the smallest number of digits possible. This differs from the Python implementation. For example if you were to use the '%d' directive to get the day of the month for August 8th, in Python you would get the string '08' while in the extDate implementation you get the string '8'. The reason for this is that the JavaScript 'parseInt()' function is a bit quirky in that if it is attempting to parse a string that begins with a zero it will assume that it is octal notation. Thus parseInt('08') will actually yield 0 instead of the expected 8.

An optional parameter, 'useUTC' can be specified as true/false as to weather or not the date/time being displayed is in "local" time or "UTC" time.

Date.strptime(string, format, useUTC)
-----------------------

This method parses on a string based on the format parameter and returns a Date object::

    Date.strptime("1/1/2011", "%m/%d/%Y");   // returns Date(2011,0,1);

The format strings are directives that can be used are roughly the same as those available in Python's strptime() implementation. See http://www.strftime.org or http://docs.python.org/library/time.html#time.strftime for more information.

An optional parameter, 'useUTC' can be specified as true/false as to weather or not the date/time being parsed is in "local" time or "UTC" time.

String.strptime(format, useUTC)
-----------------------

This method is a thin-wrapper around Date.strptime() which adds strptime functionality to String objects just to make things easier code-wise. For example::

	var d = Date.strptime("1/1/2011", "%m/%d/%Y");
	// becomes....
	var d = "1/1/2011".strptime("%m/%d/%Y");

All format parameters available to Date.strptime() are available to String.strptime().

An optional parameter, 'useUTC' can be specified as true/false as to weather or not the date/time being parsed is in "local" time or "UTC" time.

Helpers
-------

One of the problems I have with JavaScript Date objects is that is uses zero-based months. For instance, January is the 0th month instead of the 1st. For this reason when creating new Date objects you need to do something like::
    
    var d = new Date(2011, 0, 1);		// January 1st

Which is somewhat un-intuitive. As such, extDate contains some constants to help make creating dates a bit more clear::

    var d = new Date(2011, extDate.JANUARY, 1);		// January 1st
    var d= new Date(2011, extDate.MARCH, 15);		// March 15th
    // etc...

There are also helper constants for each of the days of the week as well since JavaScript treats these as 0-based as well::

	var start_of_the_week = extDate.SUNDAY;
	...
	var end_of_the_week = extDate.SATURDAY;

Localization
============

In some cases the format strings used in strftime() will output the days of the week or month in long or abbreviated format like "Monday" or "Sep". By default extDate will use English days and months by default, but changing the settings for different output is very easy.

There is an 'extDate' object which contains several items which can be overridden to provide your own localized content, the available items are:

* days - An object with keys for each day of the week (Sunday=0 Saturday=6). The values for each key are an array containing ['Long name', 'Short name']

* months - An object with keys for each month (January=0 to December=11). The values for each key are an arrow containing ['Long name', 'Short name', Days in month (non leap year)]

* local - These are the format strings used to display date and time strings formatted to a specific locale. They are keyed by the directive letter 'x', 'X', 'c', etc. and the values are a format string i.e. "%m/%d/%Y" for the US localized date string.

Examples
--------

If you wanted to localize the days of the week to Spanish you would do something like the following::

	extDate.days = {
		['Domingo', 'Dom'],     // Sunday
		['Lunes', 'Lun'],       // Monday
		['Martes', 'Mar'],      // Tuesday
		['Miercoles', 'Mie'],   // Wednesday
		['Jueves', 'Jue']       // Thursday
		['Viernes', 'Vie'],     // Friday
		['Sabado', 'Sab']       // Saturday        
	};

To change the localized date string output you would do the following::
 
    var d = new Date(2011, extDate.JANUARY, 5);
    d.strftime("%x");							// Outputs "1/5/2011"
    extDate.local['x'] = "%A %B %d, %Y";		// Changes the localization of %x
    d.strftime("%x");							// Outputs "Wednesday January 5, 2011"       




