var link = document.getElementById('pendule-ruler-css');
var div = document.getElementById('pendule-ruler');
var div2 = document.getElementById('pendule-ruler-infobox');
link.parentNode.removeChild(link);
div.parentNode.removeChild(div);
div2.parentNode.removeChild(div2);

document.removeEventListener('mousedown', mousedownRuler, true);
document.removeEventListener('mousemove', mousemoveRuler, false);
document.removeEventListener('mouseup', mouseupRuler, true);