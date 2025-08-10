var a, i, s = document.getElementsByTagName('select');
while (s.length > 0) {
  a = s[0];
  i = document.createElement('input');
  i.setAttribute('type', 'text');
  i.value = a.value;
  if (a.hasAttribute('id')) {
    i.setAttribute('id', a.getAttribute('id'));
  }
  if (a.hasAttribute('name')) {
    i.setAttribute('name', a.getAttribute('name'));
  }
  a.parentNode.replaceChild(i, a);
}