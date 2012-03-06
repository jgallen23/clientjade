# ClientJade

clientjade is a command line tool to compile your jade templates into client side templates for use in the browser.

##Installation

	npm install -g clientjade

##Usage
 
	`bash
	Usage: clientjade <options> <jade files>

	Options:

		-h, --help      output usage information
		-V, --version   output the version number
		-c, --compress  Compress output

	Examples:

		# compile jade files into js
		$ clientjade test1.jade test2.jade > jade.js

##Example

test1.jade

	p Hello, my name is #{name}

test2.jade

	ul
		each item in items
			li= item

include the output js file in your html and then all you need to do is call this:

	//jade.render(domNode, templateName, data);

	jade.render(document.getElementById('test1'), 'test1', { name: 'Bob' });

	jade.render(document.getElementById('test2'), 'test2', { items: ['item1', 'item2', 'item3'] });

##History

###0.0.1 (03/06/2012)
- initial commit

##Future
- convert entire folder
- --no-runtime option

##Contributors
- Greg Allen ([@jgaui](http://twitter.com/jgaui)) [jga.me](http://jga.me)
