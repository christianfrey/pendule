window.addEventListener('click', function(e) {
  chrome.extension.sendRequest({msg: 'click', x: e.clientX, y: e.clientY});
}, true);

window.addEventListener('keydown', function(e) {
  
  var hasShortcuts = true,
      keyDisableStyles = 'S',
      keyColorPicker = 'P',
      keyReloadStyles = 'R';
  
  chrome.extension.sendRequest({type: 'options'}, function(response) {
    hasShortcuts = response.options.shortcuts;
    keyDisableStyles = response.options.letter_disable_styles;
    keyColorPicker = response.options.letter_display_color_picker;
    keyReloadStyles = response.options.letter_reload_styles;
    
    if (hasShortcuts) {
      if ((window.navigator.platform.toLowerCase().indexOf("mac") != -1 ? e.metaKey : e.ctrlKey)
          && e.shiftKey && e.which === keyDisableStyles.charCodeAt(0)) { // Ctrl+Shif+S
        chrome.extension.sendRequest({msg: 'toggle-css'});
      } else if ((window.navigator.platform.toLowerCase().indexOf("mac") != -1 ? e.metaKey : e.ctrlKey)
          && e.shiftKey && e.which === keyColorPicker.charCodeAt(0)) { // Ctrl+Shift+P
        chrome.extension.sendRequest({msg: 'toggle-color-picker'});
      } else if ((window.navigator.platform.toLowerCase().indexOf("mac") != -1 ? e.metaKey : e.ctrlKey)
          && e.shiftKey && e.which === keyReloadStyles.charCodeAt(0)) { // Ctrl+Shift+R
        chrome.extension.sendRequest({msg: 'reload-css'});
      }
    }
  });
  
  if (e.which === 27) { // Esc
    chrome.extension.sendRequest({msg: 'turn-off'});
  }
}, false);

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch (msg) {
      case 'findStyles':
        // document.styleSheets
        var styleElements = document.getElementsByTagName('style'),
            linkElements = document.getElementsByTagName('link'),
            inlineStyles = [], externalStyles = [], i, j;
        
        for (i = 0; i < styleElements.length; i++) {
          inlineStyles.push({'content': styleElements[i].innerText});
        }
        for (i = 0; i < linkElements.length; i++) {
          rel = linkElements[i].rel.split(' ');
          for (j = 0; j < rel.length; j++) {
            if (rel[j].toLowerCase() === 'stylesheet') {
              externalStyles.push({'href': linkElements[i].href});
            }
          }
        }
        chrome.extension.sendRequest({msg: 'view-css', inline: inlineStyles, external: externalStyles});
        break;
      case 'findScripts':
        var scriptElements = document.getElementsByTagName('script'),
            inlineScripts = [], externalScripts = [], i;
        
        for (i = 0; i < scriptElements.length; i++) {
          if (scriptElements[i].src) {
            externalScripts.push({'src': scriptElements[i].src});
          } else {
            inlineScripts.push({'content': scriptElements[i].innerText});
          }
        }
        chrome.extension.sendRequest({msg: 'view-scripts', inline: inlineScripts, external: externalScripts});
        break;
      case 'findImages':
        var foundImages = [],
            node = null,
            image = null,
            backgroundImage = null,
            computedStyle = null,
            treeWalker = null;
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length; i++) {
          if (images[i].src) {
            if (!in_array(images[i].src, foundImages)) {
              foundImages.push({'src': images[i].src,
                                'width': images[i].naturalWidth,
                                'height': images[i].naturalHeight,
                                'alt': images[i].alt,
                                'title': images[i].title,
                                'background': false
              });
            }
          }
        }
        treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
        while ((node = treeWalker.nextNode()) != null) {
          computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);
          if (computedStyle) {
            backgroundImage = computedStyle.getPropertyCSSValue('background-image');
            if (backgroundImage && backgroundImage.primitiveType == CSSPrimitiveValue.CSS_URI) {
              image = new Image();
              image.src = backgroundImage.getStringValue();
              if (!in_array(image.src, foundImages)) {
                foundImages.push({'src': image.src, 'width': image.naturalWidth, 'height': image.naturalHeight, 'background': true});
              }
            }
          }
        }
        chrome.extension.sendRequest({msg: 'view-images', images: foundImages});
        break;
      case 'findSelectedSource':
        var sel = window.getSelection();
        if (!sel) {
          return;
        }
        var range = sel.getRangeAt(0);
        var node = range.commonAncestorContainer;
        switch (node.nodeType) {
          case Node.TEXT_NODE:
          case Node.CDATA_SECTION_NODE:
            node = node.parentNode;
            break;
        }
        var source = parse((new XMLSerializer()).serializeToString(node));
        chrome.extension.sendRequest({msg: 'view-selection-source', code: source});
        break;
      case 'findGeneratedSource':
        var source = parse(document.documentElement.outerHTML);
        chrome.extension.sendRequest({msg: 'view-generated-source', code: source});
        break;
      case 'validateLocalMarkup':
        retrieveLocalMarkup();
        break;
      case 'validateLocalCSS':
        retrieveLocalCSS();
        break;
    }
  });
});

function in_array(needle, haystack) {
  for (var i = 0, l = haystack.length; i < l; i++) {
    if (haystack[i].src === needle) return true;
  }
  return false;
}

function parse(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/(<)(\/?\s*)([a-zA-Z1-6]+)([^>]+)?((\s*\/)?>)/g, parseTags);
  str = str.replace(/<!--((\s|.)*?)-->/g, '<span class="webkit-html-comment">&lt;--$1--&gt;</span>'); // problem spotted!
  
  function parseTags() {
    var tag = '';
    tag += '<span class="webkit-html-tag">&lt;' + arguments[2] + arguments[3] + '</span>';
    if (arguments[4]) {
      regX = /([a-zA-Z-]+)(\s*=\s*)((['"])(.*?)(\4))/g;
      tag += arguments[4].replace(regX,
        '<span class="webkit-html-attribute-name">$1</span>$2$4<span class="webkit-html-attribute-value">$5</span>$6');
    }
    tag += '&gt;';
    tag += '</span>';
    return tag;
  }
  return str;
}

function retrieveLocalMarkup() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', window.location, true);
  xhr.send(null);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    if (!xhr.status || xhr.status === 200) {
      submitLocalMarkup(utf8_encode(xhr.responseText));
    }
  }
}

function submitLocalMarkup(source) {
  var f = document.createElement('form'),
      i = document.createElement('input');
  
  // http://validator.w3.org/docs/api.html
  f.action = 'http://validator.w3.org/check';
  f.enctype = 'multipart/form-data';
  f.method = 'post';
  f.target = '_blank';
  
  i.type = 'hidden';
  i.name = 'fragment';
  i.value = source;
  f.appendChild(i);
  
  document.body.appendChild(f);
  f.submit();
  document.body.removeChild(f);
}

function retrieveLocalCSS() {
  var i, styles, links, xhr, source = '';
  
  // inline style sheets
  styles = document.getElementsByTagName('style');
  for (i = 0; i < styles.length; i++) {
    source += styles[i].innerText;
  }
  
  // external style sheets
  links = document.getElementsByTagName('link');
  for (i = 0; i < links.length; i++) {
    if (links[i].rel == 'stylesheet') {
      xhr = new XMLHttpRequest();
      xhr.open('GET', links[i].href, false);
      xhr.send(null);
      // HTTP & FILE schemes supported
      if (xhr.status === 200 || xhr.status === 0) {
        source += xhr.responseText;
      }
    }
  }
  submitLocalCSS(source);
}

function submitLocalCSS(source) {
  var f = document.createElement('form'),
      i = document.createElement('input');
  
  // http://jigsaw.w3.org/css-validator/manual.html#expert
  f.action = 'http://jigsaw.w3.org/css-validator/validator';
  f.enctype = 'multipart/form-data';
  f.method = 'post';
  f.target = '_blank';
  
  i.type = 'hidden';
  i.name = 'text';
  i.value = source;
  f.appendChild(i);
  
  document.body.appendChild(f);
  f.submit();
  document.body.removeChild(f);
}

function utf8_encode(s) {
  return unescape(encodeURIComponent(s));
}