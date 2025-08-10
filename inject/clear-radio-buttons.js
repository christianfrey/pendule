var a, j, i = document.getElementsByTagName('input'), l = i.length;
for (j = 0; j < l; j++) {
  a = i[j];
  if (a.hasAttribute('type') && a.getAttribute('type').toLowerCase() == 'radio') {
    a.checked = false;
  }
}