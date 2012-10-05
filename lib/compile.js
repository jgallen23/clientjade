var fs = require('fs');
var jade = require('jade');
var path = require('path');
var res = require('resistance');
var uglifyJs = require('uglify-js');
var exists = fs.existsSync || path.existsSync;

var jadeCompile = function(file, str) {
  var f = jade.compile(str, {
    filename: file,
    client: true,
    compileDebug: false
  });
  var result = f.toString();
  var basename = path.basename(file, '.jade');
  result = result.replace(/function anonymous/, 'jade.templates["'+basename+'"] = function');
  return result;
};

var findRuntime = function() {
  var runtime = path.join(__dirname, '../node_modules/jade/runtime.js');
  if (exists(runtime))
    return runtime;

  runtime = path.join(__dirname, '../../jade/runtime.js')
  if (exists(runtime))
    return runtime;

  throw new Error('runtime.js not found');
};

var compile = function(options, callback) {

  var queue = res.queue(function(file, callback) {
    fs.readFile(file, 'utf8', function(err, str) {
      callback({ file: file, source: str });
    });
  });

  var render = path.join(__dirname, 'browser/render.js');
  var runtime = findRuntime();
  queue.push(runtime);
  queue.push(render);

  options.files.forEach(function(file, i) {
    var stats = fs.statSync(file);
    if (!stats.isFile()) { //directory
      var files = fs.readdirSync(file);
      files.forEach(function(f, i) {
        if (f.match(/\.jade$/))
          queue.push(path.join(file, f));
      });
    } else {
      queue.push(file);
    }
  });

  queue.run(function(results) {
    var concat = [];
    for (var i = 0, c = results.length; i < c; i++) {
      var result = results[i];
      var source = result.source;
      if (i > 1) //compile all files added after runtime and render
        source = jadeCompile(result.file, result.source);
      concat.push(source);
    }
    var out = concat.join('\n');

    if (options.compress) {
      var ast = uglifyJs.parser.parse(out);
      ast = uglifyJs.uglify.ast_mangle(ast);
      ast = uglifyJs.uglify.ast_squeeze(ast);
      out = uglifyJs.uglify.gen_code(ast);
    }

    callback(false, out);
  });

};


module.exports = compile;
