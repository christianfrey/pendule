var link = document.getElementById('pendule-hide-images');
link.parentNode.removeChild(link);

var inputList   = document.getElementsByTagName('input');
var inputLength = inputList.length;

for (var i = 0; i < inputLength; i++) {
  input = inputList[i];
  if (input.className.indexOf('pendule-input-image') != -1) {
    var reg = new RegExp('(\\s|^)pendule-input-image(\\s|$)');
    input.className = input.className.replace(reg, ' ');
    input.setAttribute('type', 'image');
  }
}