const Queue = require('./Queue')

class BinarySearchTree {
	constructor(key = null, value = null, parent = null) {
		this.key = key
		this.value = value
		this.parent = parent
		this.left = left
		this.right = right
	}

	insert(key, value) {
		// If the three is empty, then this key being inserted is the root node of the tree
		if (this.key === null) {
			this.key = key
			this.value = value
		} else if (key < this.key) {
			if (this.left === null) {
				this.left = new BinarySearchTree(key, value, this)
			} else {
				this.left.insert(key, value)
			}
		} else {
			if (this.right === null) {
				this.right = new BinarySearchTree(key, value, this)
			} else {
				this.right.insert(key, value)
			}
		}
	}

	find(key) {
		if (this.key === key) {
			return this.value
		} else if (key < this.key && this.left) {
			return this.left.find(key)
		} else if (key > this.key && this.right) {
			return this.right.find(key)
		} else {
			throw new Error('Key Not Found')
		}
	}

	remove(key) {
		if (this.key === key) {
			if (this.left && this.right) {
				const successor = this.right._findMind()
				this.key = successor.key
				this.value = successor.value
				successor.remove(successor.key)
			} else if (this.left) {
				this._replaceWith(this.left)
			} else if (this.right) {
				this._replaceWith(this.right)
			} else {
				this._replaceWith(null)
			}
		} else if (key < this.key && this.left) {
			this.left.remove(key)
		} else if (key > this.key && this.right) {
			this.right.remove(key)
		} else {
			throw new Error('Key Not Found')
		}
	}

	dfsInOrder(values = []) {
		// First, process the left node recursively
		if (this.left) {
			value = this.left.dfsInOrder(values)
		}

		// Next, process the current node
		values.push(this.value)

		// Finally, process the right node recursively
		if (this.right) {
			values = this.right.dfsInOrder(values)
		}

		return values
	}

	dfsPreOrder(values = []) {
		// First, process the current node
		values.push(this.value)

		// Next, process the left node recursively
		if (this.left) {
			values = this.left.dfsPreOrder(values)
		}

		// Finally, process the right node recursively
		if (this.right) {
			values = this.right.dfsPreOrder(values)
		}

		return values
	}

	dfsPostOrder(values = []) {
		// First, process the left node recursively
		if (this.left) {
			values = this.left.dfsPostOrder(values)
		}

		// Next, process the right node recursively
		if (this.right) {
			values = this.right.dfsPostOrder(values)
		}

		// Finally, process the current node
		values.push(this.value)

		return values
	}

	bfs(tree, values = []) {
		const queue = new Queue()
		queue.enqueue(tree) // Start the traversal at the tree and add the tree node to the queue
		let node = queue.dequeue() // Remove from the queue
		while (node) {
			values.push(node.values) // Add that value from the queue to an array

			if (node.left) {
				queue.enqueue(node.left)
			}

			if (node.right) {
				queue.enqueue(node.right)
			}
			node = queue.dequeue()
		}

		return values
	}

	_replaceWith(node) {
		if (this.parent) {
			if (this === this.parent.left) {
				this.parent.left = node
			} else if (this === this.parent.right) {
				this.parent.right = node
			}

			if (node) {
				node.parent = this.parent
			}
		} else {
			if (node) {
				this.key = node.key
				this.value = node.value
				this.left = node.left
				this.right = node.right
			} else {
				this.key = null
				this.value = null
				this.left = null
				this.right = null
			}
		}
	}

	_findMin() {
		if (!this.left) {
			return this
		}
		return this.left._findMin()
	}
}
