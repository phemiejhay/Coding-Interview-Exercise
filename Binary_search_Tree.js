class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        // move left
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        // Move right
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null; // Not found
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to be deleted
      if (!node.left && !node.right) {
        return null; // No children
      } else if (!node.left) {
        return node.right; // One child (right)
      } else if (!node.right) {
        return node.left; // One child (left)
      } else {
        const successor = this.minValueNode(node.right);
        node.value = successor.value;
        node.right = this.deleteNode(node.right, successor.value);
      }
    }
    return node;
  }

  minValueNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }
}
const binaryST = new BinarySearchTree();
binaryST.insert(20);
binaryST.insert(15);
binaryST.insert(7);
binaryST.insert(16);
console.log(binaryST.search(15)); //TreeNode {value: 15, left: TreeNode, right: TreeNode}
console.log(binaryST.search(18)); // null
console.log(binaryST.inOrderTraversal()); // output [7, 15, 16, 20]
binaryST.delete(15);
console.log(binaryST.inOrderTraversal()); // ootput [7, 16, 20]
