jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};
jade.renderString = function(template, data) {
  return jade.templates[template](data);
};