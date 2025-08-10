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
  alt = image.getAttribute('alt');
  
  if (alt && alt != '') {
    span = document.createElement('span');
    span.setAttribute('class', 'pendule-alttext pendule-tooltips');
    span.appendChild(document.createTextNode('alt=' + alt));
  } else {
    span = document.createElement('span');
    span.setAttribute('class', 'pendule-alttext pendule-tooltips');
    span.style.backgroundColor = 'orange !important';
    span.style.border = '1px solid red !important';
    span.appendChild(document.createTextNode('no alt text'));
  }
  image.parentNode.insertBefore(span, image);
}