var link = document.createElement('link');
link.setAttribute('id', 'pendule-hide-images');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', chrome.extension.getURL('inject/hide-images.css'));
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(link);

var inputList   = document.getElementsByTagName('input');
var inputLength = inputList.length;

for (var i = 0; i < inputLength; i++) {
  input = inputList[i];
  if (input.hasAttribute('type') && input.getAttribute('type').toLowerCase() == 'image') {
    input.className += ' pendule-input-image';
    input.setAttribute('type', 'submit');
  }
}