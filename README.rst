About
=====

extDate is a set of extensions regarding the JavaScript Date object, adding in some missing functionality. Features include:

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

    var d = new Date(2011, extDate.JANUARY, 1);		// January 1st
    var d= new Date(2011, extDate.MARCH, 15);		// March 15th
    // etc...

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




