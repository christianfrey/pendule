var save, reset;

function init() {
  save = document.getElementById('save_button');
  reset = document.getElementById('reset_button');
  for (var b = document.getElementsByClassName('letter'), a = 0, d; d = b[a]; a++) d.addEventListener('keypress', shortcutChanged, false);
  save.addEventListener('click', onSave, false);
  reset.addEventListener('click', onReset, false);
  for (var b = document.getElementsByTagName('input'), a = 0, d; d = b[a]; a++) d.addEventListener('change', inputChanged, false);
  if (window.navigator.platform.toLowerCase().indexOf('mac') != -1) {
    for (var b = document.getElementsByClassName('ctrl'), a = 0, d; d = b[a]; a++) d.innerHTML = 'Command';
  }
  retrieveOptions();
}

function onSave() {
  var a = {};
  a.picker_mode = q(document.options_form.picker_mode);
  a.wai_mode = q(document.options_form.wai_mode);
  a.shortcuts = document.getElementById('shortcuts').checked;
  a.letter_disable_styles = document.getElementById('letter_disable_styles').value;
  a.letter_reload_styles = document.getElementById('letter_reload_styles').value;
  a.letter_display_color_picker = document.getElementById('letter_display_color_picker').value;
  window.localStorage.options = JSON.stringify(a);
  var d = document.getElementById('save_status');
  d.style.setProperty('-webkit-transition', 'opacity 0s ease-in');
  d.style.opacity = 1;
  setTimeout(function () {
    d.style.setProperty('-webkit-transition', 'opacity 1s ease-in');
    d.style.opacity = 0;
  }, 1000);
  save.disabled = true;
  reset.disabled = true;
  chrome.extension.getBackgroundPage()._updateOptions();
}

function q(b) {
  for (var a = 0, d; d = b[a]; a++) if (d.checked) return d.value;
  return '';
}

function onReset() {
  retrieveOptions();
}

function inputChanged() {
  if (this.id === 'shortcuts') {
    document.getElementById('letter_disable_styles').disabled = !this.checked;
    document.getElementById('letter_reload_styles').disabled = !this.checked;
    document.getElementById('letter_display_color_picker').disabled = !this.checked;
  }
  save.disabled = false;
  reset.disabled = false;
}

function shortcutChanged(e) {
  if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 91)) { // a-z || A-Z
    this.value = String.fromCharCode(e.which).toUpperCase();
    save.disabled = false;
    reset.disabled = false;
  } else {
    e.preventDefault();
    this.value = '';
    save.disabled = true;
    reset.disabled = true;
  }
}

function retrieveOptions() {
  save.disabled = true;
  reset.disabled = true;
  if (!window.localStorage.options) {
    optionsList = defaultOptionsList();
    window.localStorage.options = JSON.stringify(optionsList);
  }
  var b = JSON.parse(window.localStorage.options);
  document.getElementById(b.picker_mode).checked = true;
  document.getElementById(b.wai_mode).checked = true;
  document.getElementById('shortcuts').checked = b.shortcuts;
  document.getElementById('letter_disable_styles').value = b.letter_disable_styles;
  document.getElementById('letter_reload_styles').value = b.letter_reload_styles;
  document.getElementById('letter_display_color_picker').value = b.letter_display_color_picker;
  document.getElementById('letter_disable_styles').disabled = !b.shortcuts;
  document.getElementById('letter_reload_styles').disabled = !b.shortcuts;
  document.getElementById('letter_display_color_picker').disabled = !b.shortcuts;
}

function defaultOptionsList() {
  return {
    'picker_mode': 'picker_yes_clipboard',
    'wai_mode': 'wai_achecker',
    'shortcuts': true,
    'letter_disable_styles': 'S',
    'letter_reload_styles': 'R',
    'letter_display_color_picker': 'P'
  };
}

function g(b, a) {
  return b.disabled = a;
}

var _initOptionsPage = init;