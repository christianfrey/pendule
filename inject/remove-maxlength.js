var i = document.evaluate('//input[@maxlength]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < i.snapshotLength; j++) {
  i.snapshotItem(j).removeAttribute('maxlength');
}