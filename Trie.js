class TrieNode {
    constructor(endOfWord = false) {
        this.children = new Map();
        this.endOfWord = endOfWord;
    }

    add(char, node) {
        this.children.set(char, node);
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let currentNode = this.root;

        for (let i = 0; i < word.length; i++) {
            const endOfWord = i == word.length - 1;

            if (currentNode.children.get(word[i]) === undefined) {
                currentNode.add(word[i], new TrieNode(endOfWord));
            } else if (endOfWord) {
                currentNode.children.get(word[i]).endOfWord = true;
            }

            currentNode = currentNode.children.get(word[i]);
        }
    }

    searchCompleteWord(word) {
        let currentNode = this.root;
        let endOfWord = false;

        for (let i = 0; i < word.length; i++) {
            if (currentNode.children.get(word[i]) === undefined) {
                return false;
            }

            endOfWord = currentNode.children.get(word[i]).endOfWord;
            currentNode = currentNode.children.get(word[i]);
        }

        if (endOfWord) {
            return word;
        }

        return false;
    }

    searchPrefix(prefix) {
        let currentNode = this.root;

        for (let i = 0; i < prefix.length; i++) {
            if (currentNode.children.get(prefix[i]) === undefined) {
                return [];
            }

            currentNode = currentNode.children.get(prefix[i]);
        }

        return this.wordsToAutocomplete(prefix, currentNode);
    }

    wordsToAutocomplete(prefix, node) {
        const stack = [];
        const matches = [];

        if (node.endOfWord) {
            matches.push(prefix);
        }

        for (let [key, child] of node.children) {
            stack.push([key, child, []]);
        }

        while (stack.length > 0) {
            let [char, node, currentWord] = stack.pop();

            currentWord.push(char);

            if (node.endOfWord) {
                matches.push(currentWord.join(''));
            }

            for (let [key, child] of node.children) {
                stack.push([key, child, [...currentWord]]);
            }
        }

        return matches;
    }
}

var trie = new Trie();                                  // "Inicializa" uma variável Trie

const InsertNamePokemonInTrie = (name) => {
    lineReader.eachLine('./Pokemons.bin', function (line, last) {
        const namePokemon = line.split(';')[1];
        trie.insert(namePokemon);
    });
    return new Promise((resolve) => resolve());
};

module.exports = trie;
