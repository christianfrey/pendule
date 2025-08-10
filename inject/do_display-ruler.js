// stylesheet
var link = document.createElement('link');
link.setAttribute('id', 'pendule-ruler-css');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', chrome.extension.getURL('inject/display-ruler.css'));
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(link);

// ruler
var div = document.createElement('div');
var div2 = document.createElement('div');
var div3 = document.createElement('div');
var div4 = document.createElement('div');
var div5 = document.createElement('div');
var div6 = document.createElement('div');
div.setAttribute('id', 'pendule-ruler');
div2.setAttribute('id', 'pendule-ruler-container');
div3.setAttribute('id', 'pendule-ruler-top-left');
div4.setAttribute('id', 'pendule-ruler-top-right');
div5.setAttribute('id', 'pendule-ruler-bottom-right');
div6.setAttribute('id', 'pendule-ruler-bottom-left');
div2.appendChild(div3);
div2.appendChild(div4);
div2.appendChild(div5);
div2.appendChild(div6);
div.appendChild(div2);
document.body.appendChild(div);

// infobox
div = document.createElement('div');
div.setAttribute('id', 'pendule-ruler-infobox');
var p1 = document.createElement('p');
var p2 = document.createElement('p');
p1.setAttribute('id', 'pendule-ruler-width');
p2.setAttribute('id', 'pendule-ruler-height');
p1.appendChild(document.createTextNode('Select any part of the web page to measure'));
p2.appendChild(document.createTextNode('the area within the box that you draw.'));
div.appendChild(p1);
div.appendChild(p2);
document.body.appendChild(div);

// initialization
var bPenduleRulerMove = false;
var bPenduleRulerResize = false;
var bPenduleRulerDrag = false;
var iPenduleRulerMoveX = 0;
var iPenduleRulerMoveY = 0;
var iPenduleRulerStartX = 0;
var iPenduleRulerStartY = 0;
var iPenduleRulerEndX = 0;
var iPenduleRulerEndY = 0;

// events
document.addEventListener('mousedown', mousedownRuler, true);
document.addEventListener('mousemove', mousemoveRuler, false);
document.addEventListener('mouseup', mouseupRuler, true);

function mousedownRuler(event) {
  if (event.button == 0) { // left button
    var target = event.srcElement;
    if (target) {
      var targetName = target.tagName;
      var ownerDocument = target.ownerDocument;
      if (targetName && targetName != 'scrollbar' && ownerDocument) { /* scrollbar problem spotted! */
        var ruler = ownerDocument.getElementById('pendule-ruler');
        if (ruler) {
          var pageX = event.pageX;
          var pageY = event.pageY;
          switch (target) {
            case ownerDocument.getElementById('pendule-ruler-container'):
              bPenduleRulerMove  = true;
              iPenduleRulerMoveX = pageX - ruler.offsetLeft;
              iPenduleRulerMoveY = pageY - ruler.offsetTop;
              break;
            case ownerDocument.getElementById('pendule-ruler-top-left'):
              bPenduleRulerResize = true;
              iPenduleRulerStartX = ruler.offsetLeft + ruler.clientWidth;
              iPenduleRulerStartY = ruler.offsetTop + ruler.clientHeight;
              break;
            case ownerDocument.getElementById('pendule-ruler-top-right'):
              bPenduleRulerResize = true;
              iPenduleRulerStartX = ruler.offsetLeft;
              iPenduleRulerStartY = ruler.offsetTop + ruler.clientHeight;
              break;
            case ownerDocument.getElementById('pendule-ruler-bottom-left'):
              bPenduleRulerResize = true;
              iPenduleRulerStartX = ruler.offsetLeft + ruler.clientWidth;
              iPenduleRulerStartY = ruler.offsetTop;
              break;
            case ownerDocument.getElementById('pendule-ruler-bottom-right'):
              bPenduleRulerResize = true;
              iPenduleRulerStartX = ruler.offsetLeft;
              iPenduleRulerStartY = ruler.offsetTop;
              break;
            default:
              bPenduleRulerDrag = true;
              iPenduleRulerEndX = 0;
              iPenduleRulerEndY = 0;
              iPenduleRulerStartX = pageX;
              iPenduleRulerStartY = pageY;
          }
        }
      }
    }
    event.stopPropagation();
    event.preventDefault();
  }
}

function mousemoveRuler(event) {
  var target = event.target;
  if (target) {
    var ownerDocument = target.ownerDocument;
    if (ownerDocument) {
      var ruler = ownerDocument.getElementById('pendule-ruler');
      if (ruler) {
        var pageX = event.pageX;
        var pageY = event.pageY;
        
        if (bPenduleRulerDrag || bPenduleRulerResize) {
          var iWidth = 0;
          var iHeight = 0;
          
          iPenduleRulerEndX = pageX;
          iPenduleRulerEndY = pageY;
          
          if (iPenduleRulerStartX > iPenduleRulerEndX) {
            iWidth = iPenduleRulerStartX - iPenduleRulerEndX;
            ruler.style.left = pageX + 'px';
          }
          else {
            iWidth = iPenduleRulerEndX - iPenduleRulerStartX;
            ruler.style.left = iPenduleRulerStartX + 'px';
          }
          if (iPenduleRulerStartY > iPenduleRulerEndY) {
            iHeight = iPenduleRulerStartY - iPenduleRulerEndY;
            ruler.style.top = iPenduleRulerEndY + 'px';
          }
          else {
            iHeight = iPenduleRulerEndY - iPenduleRulerStartY;
            ruler.style.top = iPenduleRulerStartY + 'px';
          }
          
          ruler.style.width  = iWidth + 'px';
          ruler.style.height = iHeight + 'px';
          
          var rulerWidth = document.getElementById('pendule-ruler-width');
          var rulerHeight = document.getElementById('pendule-ruler-height');
          if (rulerWidth) {
            rulerWidth.innerText = 'Width: ' + iWidth + 'px';
          }
          if (rulerHeight) {
            rulerHeight.innerText = 'Height: ' + iHeight + 'px';
          }
        }
        else if (bPenduleRulerMove) {
          var newXPosition = pageX - iPenduleRulerMoveX;
          var newYPosition = pageY - iPenduleRulerMoveY;
          
          ruler.style.left = newXPosition + 'px';
          ruler.style.top  = newYPosition + 'px';
          
          iPenduleRulerEndX   = newXPosition + ruler.clientWidth;
          iPenduleRulerEndY   = newYPosition + ruler.clientHeight;
          iPenduleRulerStartX = newXPosition;
          iPenduleRulerStartY = newYPosition;
        }
      }
    }
  }
}

function mouseupRuler(event) {
  if (!bPenduleRulerMove) {
    var pageX = event.pageX;
    var pageY = event.pageY;
    
    if (pageX > iPenduleRulerStartX) {
      iPenduleRulerEndX = pageX;
    } else {
      iPenduleRulerEndX = iPenduleRulerStartX;
      iPenduleRulerStartX = pageX;
    }
    
    if (pageY > iPenduleRulerStartY) {
      iPenduleRulerEndY = pageY;
    } else {
      iPenduleRulerEndY = iPenduleRulerStartY;
      iPenduleRulerStartY = pageY;
    }
  }
  
  bPenduleRulerMove = false;
  bPenduleRulerResize = false;
  bPenduleRulerDrag = false;
  iPenduleRulerMoveX  = 0;
  iPenduleRulerMoveY  = 0;
}