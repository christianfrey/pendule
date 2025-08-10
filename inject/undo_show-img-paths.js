var elements, node;
elements = document.evaluate('//span[contains(@class,"pendule-paths")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < elements.snapshotLength; i++) {
	node = elements.snapshotItem(i);
  node.parentNode.removeChild(node);
}