const hasChildren = (node: RemarkNode): node is RemarkParent =>
  'children' in node;

const traversal = (
  node: RemarkNode,
  parent?: RemarkParent,
  grandParent?: RemarkParent,
) => {
  if (hasChildren(node)) {
    for (const child of node.children) {
      traversal(child, node, parent);
    }
  }
  if (
    node.type === 'text' &&
    parent?.type === 'paragraph' &&
    grandParent?.type === 'listItem'
  ) {
    if (/\[.\] /.test(node.value)) {
      grandParent.checked = node.value[1] !== ' ';
      node.value = node.value.slice(3);
    }
  }
};

export const remarkCheckbox = () => {
  return (root: RemarkRoot) => {
    traversal(root);
  };
};
