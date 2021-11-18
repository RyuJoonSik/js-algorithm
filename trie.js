class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      let character = word.charAt(i);
      let node = current.children[character];

      if (!node) {
        node = new TrieNode();
        current.children[character] = node;
      }

      current = node;
    }

    current.endOfWord = true;
  }

  search(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      let character = word.charAt(i);
      let node = current.children[character];

      if (!node) {
        return false;
      }

      current = node;
    }

    return current.endOfWord;
  }

  delete(word) {
    this.deleteRecursively(this.root, word, 0);
  }

  deleteRecursively(current, word, index) {
    if (index === word.length) {
      // 단어의 끝에 도달했을 때 current.endOfWord가 true인 경우에만 삭제한다.
      if (!current.endOfWord) {
        return false;
      }

      current.endOfWord = false;

      // current가 더 이상 자식이 없는 경우 true를 반환한다.
      return Object.keys(current.children).length === 0;
    }

    let character = word.charAt(index);
    let node = current.children[character];

    if (!node) {
      return false;
    }

    let shouldDeleteCurrentNode = this.deleteRecursively(node, word, index + 1);

    // true가 반환된 경우
    // 문자와 트라이 참조의 맵핑을 맵으로부터 삭제한다.
    if (shouldDeleteCurrentNode) {
      delete current.children[character];

      // 맵에 더 이상의 맵핑이 존재하지 않으면 true를 반환한다.
      return Object.keys(current.children).length === 0;
    }

    return false;
  }
}

const trie = new Trie();
trie.insert("sammie");
trie.insert("simran");
console.log(trie.search("simran"));
console.log(trie.search("fake"));
console.log(trie.search("sam"));
trie.delete("sammie");
trie.delete("simran");
console.log(trie.search("sammie"));
console.log(trie.search("simran"));
