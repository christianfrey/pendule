var l = document.createElement('link');
l.setAttribute('id', 'pendule-topographic-view');
l.setAttribute('rel', 'stylesheet');
l.setAttribute('type', 'text/css');
l.setAttribute('href', chrome.extension.getURL('inject/topographic-view.css'));
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(l);