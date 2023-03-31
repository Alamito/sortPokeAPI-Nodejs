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

const runTasksSynchronously = async (typesPokemon) => {
    await checkFiles.deleteOldFiles(typesPokemon);
    await checkFiles.createFolders();
    await pokemons.rangeGetPokemon(1, 50);
    await weakStrength.rangeGetTypeWeakness(typesPokemon);
    await weakStrength.rangeGetTypeStrength(typesPokemon);
    searchPokemonsByPrefix('ch');
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
