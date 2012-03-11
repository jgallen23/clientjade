# ClientJade

clientjade is a command line tool to compile your jade templates into client side templates for use in the browser.  It will automatically include everything you need to render the templates, no need to include jade.js or runtime.js.

##Installation

	npm install -g clientjade

##Usage
 
	`bash
	Usage: clientjade <options> <jade files/dir>

	Options:

		-h, --help      output usage information
		-V, --version   output the version number
		-c, --compress  Compress output

	Examples:

		# compile jade files into js
		$ clientjade test1.jade test2.jade > templates.js

##Example

Lets say you have two templates, test1.jade and test2.jade, that need to be used on the client side.

test1.jade

	p Hello, my name is #{name}

test2.jade

	ul
		each item in items
			li= item

All you need to do is run: 

	$ clientjade test1.jade test2.jade > templates.js

And then include template.js file in your html.

To render the templates, just make a call like this:

	//jade.render(domNode, templateName, data);

	jade.render(document.getElementById('test1'), 'test1', { name: 'Bob' });

	jade.render(document.getElementById('test2'), 'test2', { items: ['item1', 'item2', 'item3'] });

### Live Example

You can check out a live example [here](example/)

##History

###0.0.5
- fixed issue when templates weren't in cwd

###0.0.4
- added support for passing in folder

###0.0.3
- passed in filename so jade includes will work

###0.0.2
- fixed npm bin

###0.0.1 
- initial commit

##Future
- convert entire folder
- --no-runtime option

##Contributors
- Greg Allen ([@jgaui](http://twitter.com/jgaui)) [jga.me](http://jga.me)
