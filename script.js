const fs = require('fs');
const lineReader = require('line-reader');
const Trie = require('./Trie.js');
const pokemons = require('./pokemons.js');
const checkFiles = require('./checkFiles.js');
const weakStrength = require('./weakStrength.js');
const menu = require('./menu.js');

const InsertNamePokemonInTrie = () => {
    const promiseCallback = (resolve) => {
        lineReader.eachLine(
            './Pokemons.bin',
            function (line) {
                const namePokemon = line.split(';')[1];
                Trie.insert(namePokemon);
            },
            () => {
                resolve(true);
            },
        );
    };
    return new Promise(promiseCallback);
};

var structDataPokemon = [];

const searchPokemonsByPrefix = (prefix) => {
    structDataPokemon = [];
    const matches = Trie.searchPrefix(prefix.toLowerCase());
    matches.forEach((match) => {
        if (match === prefix) structDataPokemon.push({ NOME: match });
        else structDataPokemon.push({ NOME: `${prefix.toLowerCase()}${match}` });
    });
};

const readAttributesPokemon = async (dir, type) => {
    const promiseCallback = async (resolve) => {
        try {
            const buffer = fs.readFileSync(`./${dir}/${type}.bin`);
            const data = buffer.toString('utf-8');
            await searchIdPokemonByType(data, type);
            resolve(true);
        } catch (err) {
            console.error(err);
        }
    };

    return new Promise(promiseCallback);
};

const searchIdPokemonByType = async (types, searchType) => {
    const promiseCallback = async (resolve) => {
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
        await getPokemonNameById(IDsPokemon, searchType);
        resolve(true);
    };

    return new Promise(promiseCallback);
};

const getPokemonNameById = (IDs, type) => {
    const promiseCallback = async (resolve) => {
        await readFilePokemon(IDs, type);
        resolve(true);
    };

    return new Promise(promiseCallback);
};

const readFilePokemon = (IDs, type) => {
    structDataPokemon = [];
    const promiseCallback = async (resolve) => {
        console.log('CARREGANDO...');
        for (let i = 0; i < IDs.length; i++) {
            lineReader.eachLine('./Pokemons.bin', function (line, last) {
                const idFile = line.split(';')[0];
                const type1 = line.split(';')[2];
                const type2 = line.split(';')[3];
                const XP = line.split(';')[4];
                const height = line.split(';')[5];
                const weight = line.split(';')[6];
                if (idFile === IDs[i] && type1 !== type && type2 !== type) {
                    const pokemonName = line.split(';')[1];
                    structDataPokemon.push({ ID: idFile, NOME: pokemonName, 'TIPO 1': type1, 'TIPO 2': type2, XP, 'ALTURA [m]': height, 'PESO [Kg]': weight });
                }
                if (last) {
                    resolve(true);
                }
            });
        }
    };
    return new Promise(promiseCallback);
};

const logInfoPokemon = () => {
    console.log('---------------------------------------------------------------------------------------------------------');
    console.table(structDataPokemon);
};

const readLastIdFile = () => {
    let lastID = fs.readFileSync(`./lastID.txt`);
    lastID = parseInt(lastID);

    return lastID;
};

const insertNewPokemon = (name, type1, type2, XP, height, weight) => {
    lastIDPokemon = readLastIdFile() + 1;
    writeNewLastId(lastIDPokemon);
    const newPokemon = `${lastIDPokemon};${name};${type1};${type2};${XP};${height};${weight}\n`;
    fs.appendFileSync('./Pokemons.bin', newPokemon);
    Trie.insert(name);
};

const writeNewLastId = (ID) => {
    ID = ID.toString();
    fs.writeFileSync('./lastID.txt', ID);
};

const MIN = 1; // id do primeiro pokemon
const MAX = 1008; // id do ultimo pokemon
var lastIDPokemon = MAX;

const runTasksSynchronously = async (typesPokemon) => {
    if (!(await checkFiles.existFiles(typesPokemon))) {
        // await checkFiles.deleteOldFiles(typesPokemon);
        // await checkFiles.createFolders();
        // await pokemons.rangeGetPokemon(MIN, MAX);
        // await weakStrength.rangeGetTypeWeakness(typesPokemon);
        // await weakStrength.rangeGetTypeStrength(typesPokemon);
        await checkFiles.createFileID(MAX);
        console.log('entrou aqui');
    }
    await InsertNamePokemonInTrie();
    return new Promise((resolve) => resolve());
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
    insertNewPokemon,
    readAttributesPokemon,
    InsertNamePokemonInTrie,
    logInfoPokemon,
};
