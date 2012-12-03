jade.templates = {
  
  toHtml = function(template, data) {
    jade.getHTML(template, data);
    return tmp;
  },
  
  render = function(node, template, data) {
    this.toHtml(template, data);
    node.innerHTML = tmp;
  }
  
};