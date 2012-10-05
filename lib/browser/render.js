jade.templates = {};
jade.render = function(template, data) {
  var tmp = jade.templates[template](data);
  return tmp;
};
