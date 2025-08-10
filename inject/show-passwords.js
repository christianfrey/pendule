var a, i = document.getElementsByTagName('input'), l = i.length, j;
for (j = 0; j < l; j++) {
  a = i[j];
  if (a.hasAttribute('type') && a.getAttribute('type').toLowerCase() == 'password') {
    a.setAttribute('type', 'text');
  }
}