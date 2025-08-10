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
  src = image.src;
  
  if (src) {
    span = document.createElement('span');
    span.setAttribute('class', 'pendule-paths pendule-tooltips');
    span.appendChild(document.createTextNode('src=' + src));
    
    image.parentNode.insertBefore(span, image);
  }
}