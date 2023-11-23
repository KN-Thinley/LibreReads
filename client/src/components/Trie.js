class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.bookId = null; // Store the book ID at the end of the word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, bookId) {
    let node = this.root;

    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    if (!node.isEndOfWord){
      node.isEndOfWord = true;
      node.bookId = bookId;
    }
  }

  search(word) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        return null; // Word not found
      }
      node = node.children[char];
    }
    if (node.isEndOfWord) {
      return node.bookId; // Return the book ID if it's the end of a word
    }
    return null; // Word not found
  }
}

export default Trie;
