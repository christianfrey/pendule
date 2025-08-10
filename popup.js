document.addEventListener('DOMContentLoaded', init, false);

function init() {
  chrome.tabs.getSelected(null, function(tab) {
    var bkg = chrome.extension.getBackgroundPage(),
        item, i, l = bkg.aItems.length;
    
    for (i = 0; i < l; i++) {
      item = document.getElementById(bkg.aItems[i]);
      if (bkg.storage.into(bkg.aItems[i], tab.id)) {
        addClass(item, 'activated');
      } else {
        removeClass(item, 'activated');
      }
    }
  });
}

function viewStyles() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.connect(tab.id).postMessage('findStyles');
  });
}

function reloadCSS() {
  executeScript('inject/reload-css.js');
}

function toggleCSS() {
  var elem = document.getElementById('disable-css');
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('disable-css', tab.id)) {
      js_file.file = 'inject/do_disable-css.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('disable-css', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_disable-css.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('disable-css', tab.id);
      });
    }
  });
}

function viewScripts() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.connect(tab.id).postMessage('findScripts');
  });
}

function showPasswords() {
  executeScript('inject/show-passwords.js');
}

function selectTagsToTextInputs() {
  executeScript('inject/select-tags-to-text-inputs.js');
}

function removeMaxlength() {
  executeScript('inject/remove-maxlength.js');
}

function clearRadioButtons() {
  executeScript('inject/clear-radio-buttons.js');
}

function convertGETsToPOSTs() {
  executeScript('inject/convert-gets-to-posts.js');
}

function convertPOSTsToGETs() {
  executeScript('inject/convert-posts-to-gets.js');
}

function viewImgDetails() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.connect(tab.id).postMessage('findImages');
  });
}

function hideImages(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('hide-img', tab.id)) {
      js_file.file = 'inject/do_hide-img.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('hide-img', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_hide-img.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('hide-img', tab.id);
      });
    }
  });
}

function showImgAltText(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('show-img-alt-text', tab.id)) {
      js_file.file = 'inject/do_show-img-alt-text.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('show-img-alt-text', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_show-img-alt-text.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('show-img-alt-text', tab.id);
      });
    }
  });
}

function showImgDimensions(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('show-img-dimensions', tab.id)) {
      js_file.file = 'inject/do_show-img-dimensions.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('show-img-dimensions', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_show-img-dimensions.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('show-img-dimensions', tab.id);
      });
    }
  });
}

function showImgPaths(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('show-img-paths', tab.id)) {
      js_file.file = 'inject/do_show-img-paths.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('show-img-paths', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_show-img-paths.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('show-img-paths', tab.id);
      });
    }
  });
}

function viewSource() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.create({url: 'view-source:'+tab.url, index: tab.index+1});
  });
}

function viewSelectionSource() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.connect(tab.id).postMessage('findSelectedSource');
  });
}

function viewGeneratedSource() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.connect(tab.id).postMessage('findGeneratedSource');
  });
}

function colorPicker() {
  var elem = document.getElementById('color-picker');
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    if (!isUrl(url)) return;
    var js_file = {};
    //js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('color-picker', tab.id)) {
      js_file.file = 'inject/do_color-picker.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('color-picker', tab.id);
        window.close();
      });
    } else {
      js_file.file = 'inject/undo_color-picker.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('color-picker', tab.id);
        window.close();
      });
    }
  });
}

function displayRuler(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    //js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('display-ruler', tab.id)) {
      js_file.file = 'inject/do_display-ruler.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('display-ruler', tab.id);
        window.close();
      });
    } else {
      js_file.file = 'inject/undo_display-ruler.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('display-ruler', tab.id);
        window.close();
      });
    }
  });
}

function topographicView(elem) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    var bkg = chrome.extension.getBackgroundPage();
    if (!bkg.storage.into('topographic-view', tab.id)) {
      js_file.file = 'inject/do_topographic-view.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        addClass(elem, 'activated');
        bkg.storage.add('topographic-view', tab.id);
      });
    } else {
      js_file.file = 'inject/undo_topographic-view.js';
      chrome.tabs.executeScript(tab.id, js_file, function() {
        removeClass(elem, 'activated');
        bkg.storage.del('topographic-view', tab.id);
      });
    }
  });
}

function validateMarkup() {
  chrome.tabs.getSelected(null, function(tab) {
    if (isUrl(tab.url)) { // HTTP & HTTPS schemes
      var hostname = getHostName(tab.url);
      if (hostname === 'localhost' ||
         (isIPv4HostName(hostname) && isLocalIPAddress(hostname))) {
        chrome.tabs.connect(tab.id).postMessage('validateLocalMarkup');
      } else {
        chrome.tabs.create({url: 'http://validator.w3.org/check?verbose=1&uri='+tab.url, index: tab.index+1});
      }
    } else if (isLocalUrl(tab.url)) { // FILE scheme
      chrome.tabs.connect(tab.id).postMessage('validateLocalMarkup');
    }
  });
}

function validateCSS() {
  chrome.tabs.getSelected(null, function(tab) {
    if (isUrl(tab.url)) { // HTTP & HTTPS schemes
      var hostname = getHostName(tab.url);
      if (hostname === 'localhost' ||
         (isIPv4HostName(hostname) && isLocalIPAddress(hostname))) {
        chrome.tabs.connect(tab.id).postMessage('validateLocalCSS');
      } else {
        chrome.tabs.create({url: 'http://jigsaw.w3.org/css-validator/validator?profile=css21&uri='+tab.url, index: tab.index+1});
      }
    } else if (isLocalUrl(tab.url)) { // FILE scheme
      chrome.tabs.connect(tab.id).postMessage('validateLocalCSS');
    }
  });
}

function checkLinks() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.create({url: 'http://validator.w3.org/checklink?uri='+tab.url, index: tab.index+1});
  });
}

function validateFeed() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    chrome.tabs.create({url: 'http://validator.w3.org/feed/check.cgi?url='+tab.url, index: tab.index+1});
  });
}

function validateWAI() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var a = {}, b = window.localStorage.options;
    if (b) a = JSON.parse(b);
    if (a.wai_mode == undefined || a.wai_mode == 'wai_achecker') {
      chrome.tabs.create({url: 'http://achecker.ca/checkacc.php?uri='+tab.url+'&id=2f4149673d93b7f37eb27506905f19d63fbdfe2d&guide=WCAG2-L2&output=html', index: tab.index+1});
    } else {
      chrome.tabs.create({url: 'http://www.cynthiasays.com/mynewtester/cynthia.exe?rptmode=2&url1='+tab.url, index: tab.index+1});
    }
  });
}

function viewOptions() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.create({url: chrome.extension.getURL('options.html'), index: tab.index+1});
  });
}

function executeScript(file) {
  chrome.tabs.getSelected(null, function(tab) {
    if (!isUrl(tab.url)) return;
    var js_file = {};
    js_file.allFrames = true;
    js_file.file = file;
    chrome.tabs.executeScript(tab.id, js_file);
  });
}

function isUrl(url) {
  return (new String(url)).match(/^https?:\/\//i) ? true : false;
}

function isLocalUrl(url) {
  return (url.substr(0, 5) === 'file:');
}

function getHostName(url) {
  var reg = new RegExp('^https?://([^(/|:)]+)', 'im');
  return url.match(reg)[1].toString();
}

function isIPv4HostName(hostname) {
  var reg = new RegExp(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
  return reg.test(hostname) && hostname !== '0.0.0.0';
}

function isLocalIPAddress(hostname) {
  var ip = hostname.split('.');
  return ip[0] == 10 ||
         (ip[0] == 192 && ip[1] == 168) ||
         (ip[0] == 169 && ip[1] == 254) ||
         (ip[0] == 172 && ip[1] >= 16 && ip[1] < 32);
}

function addClass(elem, cls) {
  if (!hasClass(elem, cls)) {
    elem.className += ' ' + cls;
  }
}

function removeClass(elem, cls) {
  if (hasClass(elem, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    elem.className = elem.className.replace(reg, ' ');
  }
}

function hasClass(elem, cls) {
  return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}