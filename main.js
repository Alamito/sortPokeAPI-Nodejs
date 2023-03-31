/* Requisições de módulos */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const typesPokemon = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
];

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

const checkExistFolder = (directory) => {
    if (fs.existsSync(directory)) {
        return true;
    } else {
        return false;
    }
};

const foldersName = ['types', 'weaknesses', 'strengths'];

const createFolders = () => {
    try {
        foldersName.forEach((folderName) => {
            const directory = `./${folderName}`;
            if (!checkExistFolder(directory)) {
                fs.mkdirSync(directory);
            }
        });
    } catch (err) {
        console.log(err);
    }

    return new Promise((resolve) => resolve());
};

const checkExistFile = (path, directory = '') => {
    path = `./${directory}/${path}.bin`;

    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
};

const deleteFile = (fileName, directory = '') => {
    const path = `./${directory}/${fileName}.bin`;

    try {
        fs.unlinkSync(path);
        console.log(`${fileName}.bin deletado do dir ${directory}!`);
    } catch (err) {
        console.error(err);
    }
};

const deleteOldFiles = (types) => {
    checkExistFile('Pokemons') && deleteFile('Pokemons');
    types.forEach((type) => {
        checkExistFile(type, 'types') && deleteFile(type, 'types');

        checkExistFile(type, 'weaknesses') && deleteFile(type, 'weaknesses');

        checkExistFile(type, 'strengths') && deleteFile(type, 'strengths');
    });

    return new Promise((resolve) => resolve());
};

var trie = new Trie();

const rangeGetPokemon = async (min = 1, max = 1008) => {
    for (let idPokemon = min; idPokemon <= max; idPokemon++) {
        const URLIdPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
        Pokemon = await getAttributesPokemon(URLIdPokemon);

        InsertNamePokemonInTrie(Pokemon.name);
        writeFileAttributesPokemon(Pokemon);
        writeIdPokemonPerType(Pokemon.type1, Pokemon.type2, Pokemon.id);
    }

    return new Promise((resolve) => resolve());
};

const InsertNamePokemonInTrie = (name) => {
    trie.insert(name);
};

const getAttributesPokemon = async (URL) => {
    const response = await axios.get(URL);
    const data = response.data;

    const attributesPokemon = {
        id: data.id,
        name: data.name,
        type1: data.types[0].type.name,
        type2: existInJSONType2(data),
        xp: data.base_experience,
        height: data.height / 10,
        weight: data.weight / 10,
    };

    return attributesPokemon;
};

const existInJSONType2 = (data) => {
    try {
        return data.types[1].type.name;
    } catch (err) {
        return null;
    }
};

const writeFileAttributesPokemon = (Pokemon) => {
    try {
        writeAttributesPokemonInFile(Pokemon);
    } catch (err) {
        console.error(err);
    }
};

const writeAttributesPokemonInFile = (Pokemon) => {
    fs.appendFileSync('./Pokemons.bin', `${Pokemon.id};${Pokemon.name};${Pokemon.xp};${Pokemon.height};${Pokemon.weight}\n`, 'utf8');
    console.log(`Pokemon ${Pokemon.id} salvo em Pokemons.bin!`);
};

const writeIdPokemonPerType = (type1, type2, idPokemon) => {
    try {
        writeIdInFile(type1, type2, idPokemon);
    } catch (err) {
        console.error(err);
    }
};

const writeIdInFile = (type1, type2, idPokemon) => {
    fs.appendFileSync(`./types/${type1}.bin`, `${idPokemon}\n`, 'utf8');
    console.log(`Pokemon ${idPokemon} salvo no tipo ${type1}`);

    if (existType(type2)) {
        fs.appendFileSync(`./types/${type2}.bin`, `${idPokemon}\n`, 'utf8');
        console.log(`Pokemon ${idPokemon} salvo no tipo ${type2}`);
    }
};

const existType = (type) => {
    if (type != null) {
        return true;
    } else {
        return false;
    }
};

const rangeGetTypeWeakness = async (types) => {
    for (const type of types) {
        const Weaknesses = await getWeaknessesType(type);

        writeFileWeaknessesType(type, Weaknesses);
    }
    return new Promise((resolve) => resolve());
};

const getWeaknessesType = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeWeakness = await data.damage_relations.double_damage_from;

    let Weaknesses = [];

    typeWeakness.forEach((type) => {
        Weaknesses.push(type.name);
    });

    return Weaknesses;
};

const writeFileWeaknessesType = (type, Weaknesses) => {
    try {
        writeWeaknessInFile(type, Weaknesses);
        console.log(`Tipo ${type} salvo no dir types!`);
    } catch (err) {
        console.error(err);
    }
};

const writeWeaknessInFile = (type, Weaknesses) => {
    Weaknesses.forEach((Weakness) => {
        fs.appendFileSync(`./weaknesses/${type}.bin`, `${Weakness}\n`, 'utf8');
        console.log(`Tipo ${Weakness} salvo no dir weaknesses!`);
    });
};

const rangeGetTypeStrength = async (types) => {
    for (const type of types) {
        const Strengths = await getTypeStrong(type);
        writeFileStrengthsType(type, Strengths);
    }

    return new Promise((resolve) => resolve());
};

const getTypeStrong = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeStrength = await data.damage_relations.double_damage_to;

    let Strengths = [];

    typeStrength.forEach((type) => {
        Strengths.push(type.name);
    });

    return Strengths;
};

const writeFileStrengthsType = (type, Strengths) => {
    try {
        writeStrengthInFile(type, Strengths);
    } catch (err) {
        console.error(err);
    }
};

const writeStrengthInFile = (type, Strengths) => {
    Strengths.forEach((Strength) => {
        fs.appendFileSync(`./strengths/${type}.bin`, `${Strength}\n`, 'utf8');
        console.log(`Tipo ${Strength} salvo no dir strengths!`);
    });
};

const runTasksSynchronously = async (typesPokemon) => {
    await deleteOldFiles(typesPokemon);
    await createFolders();
    await rangeGetPokemon(1, 50);
    await rangeGetTypeWeakness(typesPokemon);
    await rangeGetTypeStrength(typesPokemon);
    searchPokemonsByPrefix('ch');
};

const runTasksAsynchronously = async (typesPokemon) => {
    await deleteOldFiles(typesPokemon);
    await createFolders();
    rangeGetPokemon(1, 1008);
    rangeGetTypeWeakness(typesPokemon);
    rangeGetTypeStrength(typesPokemon);
};

runTasksSynchronously(typesPokemon); // tempo de execucao 1'25'' (medido apenas uma vez)

// runTasksAsynchronously(typesPokemon);   // tempo de execucao 3'20'' (medido apenas uma vez)

// ----------------- ALGORITMO DA ARVORE TRIE ----------------- //

// const trie = new Trie();
// trie.insert('abacate');
// trie.insert('abacaxi');
// trie.insert('abutre');
// trie.insert('bola');
// trie.insert('bolo');
// trie.insert('bolao');

// const prefix = 'AB';

// const matches = trie.searchPrefix(prefix.toLowerCase());

const searchPokemonsByPrefix = (prefix) => {
    const matches = trie.searchPrefix(prefix.toLowerCase());
    matches.forEach((match) => {
        if (match === prefix) console.log(match);
        else console.log(`${prefix.toLowerCase()}${match}`);
    });
};
