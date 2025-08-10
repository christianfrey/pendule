var link = document.getElementById('pendule-display-tooltips');
if (!link) {
  link = document.createElement('link');
  link.setAttribute('id', 'pendule-display-tooltips');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', chrome.extension.getURL('inject/tooltips.css'));
  (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(link);
}

var imageList = document.images;
var imageLength = imageList.length;

for (var i = 0; i < imageLength; i++) {
  image = imageList[i];
  dim = image.clientWidth + 'x' + image.clientHeight;
  
  span = document.createElement('span');
  span.setAttribute('class', 'pendule-dimensions pendule-tooltips');
  span.appendChild(document.createTextNode('dim=' + dim));
  
  image.parentNode.insertBefore(span, image);
}