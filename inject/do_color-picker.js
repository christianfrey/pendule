link = document.createElement('link');
link.setAttribute('id', 'pendule-color-picker');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', chrome.extension.getURL('inject/color-picker.css'));
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(link);

div = document.createElement('div');
div2 = document.createElement('div');
div3 = document.createElement('div');
div4 = document.createElement('div');
div.setAttribute('id', 'pendule-color-picker-infobox');
div2.setAttribute('id', 'pendule-color-picker-color');
div3.setAttribute('id', 'pendule-color-picker-rgb');
div4.setAttribute('id', 'pendule-color-picker-hex');
div3.appendChild(document.createTextNode('Click to grab'));
div4.appendChild(document.createTextNode('a color'));
div.appendChild(div2);
div.appendChild(div3);
div.appendChild(div4);
document.body.appendChild(div);
setTimeout(function() {
  document.getElementById('pendule-color-picker-infobox').className = 'visible'
}, 100);

window.addEventListener('click', stopClick, false);
function stopClick(e) {
  e.stopPropagation();
  e.preventDefault();
}