/* Módulos */
const axios = require('axios');
const fs = require('fs');
const Trie = require('./Trie.js');

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
    Trie.insert(name);
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
    fs.appendFileSync('./Pokemons.bin', `${Pokemon.id};${Pokemon.name};${Pokemon.type1};${Pokemon.type2};${Pokemon.xp};${Pokemon.height};${Pokemon.weight}\n`, 'utf8');
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
        // console.log(`Pokemon ${idPokemon} salvo no tipo ${type2}`);
    }
};

const existType = (type) => {
    if (type != null) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    rangeGetPokemon,
    InsertNamePokemonInTrie,
    getAttributesPokemon,
    existInJSONType2,
    writeFileAttributesPokemon,
    writeAttributesPokemonInFile,
    writeIdPokemonPerType,
    writeIdInFile,
    existType,
};
