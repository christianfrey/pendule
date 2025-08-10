var link = document.getElementById('pendule-color-picker');
var div = document.getElementById('pendule-color-picker-infobox');
link.parentNode.removeChild(link);
div.parentNode.removeChild(div);

window.removeEventListener('click', stopClick, false);