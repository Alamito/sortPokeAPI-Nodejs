const fs = require('fs');
const lineReader = require('line-reader');

const Trie = require('./Trie.js');
const pokemons = require('./pokemons.js');
const checkFiles = require('./checkFiles.js');
const weakStrength = require('./weakStrength.js');

const searchPokemonsByPrefix = (prefix) => {
    const matches = Trie.searchPrefix(prefix.toLowerCase());
    matches.forEach((match) => {
        if (match === prefix) console.log(match);
        else console.log(`${prefix.toLowerCase()}${match}`);
    });
};

const readAttributesPokemon = (dir, type) => {
    try {
        const buffer = fs.readFileSync(`./${dir}/${type}.bin`);
        const data = buffer.toString('utf-8');
        searchIdPokemonByType(data, type);
    } catch (err) {
        console.error(err);
    }
};

const searchIdPokemonByType = async (types, searchType) => {
    types = types.split('\n');
    types.pop();

    let IDsPokemon = [];

    for (let type of types) {
        const buffer = fs.readFileSync(`./types/${type}.bin`);
        let data = buffer.toString('utf-8');
        data = data.trim().split('\n');
        data.forEach((index) => {
            IDsPokemon.push(index);
        });
    }

    getPokemonNameById(IDsPokemon, searchType);
};

const getPokemonNameById = (IDs, type) => {
    IDs.forEach((id) => {
        lineReader.eachLine('./Pokemons.bin', function (line, last) {
            const idFile = line.split(';')[0];
            const type1 = line.split(';')[2];
            const type2 = line.split(';')[3];
            if (idFile === id && type1 !== type && type2 !== type) {
                console.log(line.split(';')[1]);
            }
        });
    });
};

const runTasksSynchronously = async (typesPokemon) => {
    // const initialFiles = await checkFiles.existFiles(typesPokemon);
    if (!(await checkFiles.existFiles(typesPokemon))) {
        await checkFiles.deleteOldFiles(typesPokemon);
        await checkFiles.createFolders();
    }
    await pokemons.rangeGetPokemon(1, 50);
    await weakStrength.rangeGetTypeWeakness(typesPokemon);
    await weakStrength.rangeGetTypeStrength(typesPokemon);
    readAttributesPokemon('strengths', 'poison');
};

const runTasksAsynchronously = async (typesPokemon) => {
    await checkFiles.deleteOldFiles(typesPokemon);
    await checkFiles.createFolders();
    pokemons.rangeGetPokemon(1, 1008);
    weakStrength.rangeGetTypeWeakness(typesPokemon);
    weakStrength.rangeGetTypeStrength(typesPokemon);
};

module.exports = {
    runTasksSynchronously,
    runTasksAsynchronously,
    searchPokemonsByPrefix,
};
