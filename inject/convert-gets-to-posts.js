var form = null;
var formList = document.forms;
var formLength = formList.length;

for (var i = 0; i < formLength; i++) {
  form = formList[i];
  if (!form.hasAttribute('method') || (form.hasAttribute('method') && form.method.toLowerCase() !== 'post')) {
    form.method = 'post';
  }
}