const fs = require('fs');
const lineReader = require('line-reader');
const Trie = require('./Trie.js');
const pokemons = require('./pokemons.js');
const checkFiles = require('./checkFiles.js');
const weakStrength = require('./weakStrength.js');
const menu = require('./menu.js');
const { Console } = require('console');

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

var structDataPokemon = [];     // GUARDA OS DADOS DOS POKEMONS SOLICITADOS PARA IMPRIMIR TABULADO 
let pokeObject = Object();      // GUARDA OS DADOS DE UM POKEMON NO OBJETO, QUE E INSERIDO NO structDataPokemon

const findPokemonDataInFile = (fullNamePokemon) => {
    const promiseCallback = (resolve) => {
        lineReader.eachLine(
            './Pokemons.bin',
            function (line) {
                const pokemonData = line.split(';');
                if (fullNamePokemon === pokemonData[1]) {
                    pokeObject = {
                        ID: pokemonData[0],
                        NOME: fullNamePokemon,
                        'TIPO 1': pokemonData[2],
                        'TIPO 2': pokemonData[3],
                        XP: pokemonData[4],
                        'ALTURA [m]': pokemonData[5],
                        'PESO [Kg]': pokemonData[6],
                    };
                }
            },
            () => {
                resolve(true);
            },
        );
    };
    return new Promise(promiseCallback);
};

const searchPokemonsByPrefix = async (prefix) => {

    const promiseCallback = async (resolve) => {
        let fullNamePokemon = String();
        structDataPokemon = [];
        pokeObject = [];

        const matches = Trie.searchPrefix(prefix.toLowerCase());
        for (let match of matches) {
            if (match === prefix) {
                await findPokemonDataInFile(match);
                structDataPokemon.push(pokeObject);
            }
            else {
                fullNamePokemon = prefix + match;
                await findPokemonDataInFile(fullNamePokemon);
                structDataPokemon.push(pokeObject);
            }
        }
        resolve(true);
    };

    return new Promise(promiseCallback);
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

/* PRINTAR DADOS TABULADOS */
const logInfoPokemon = () => {
    console.log('---------------------------------------------------------------------------------------------------------');
    console.table(structDataPokemon);
};

/* LEITURA DO ARQUIVO QUE CONTEM O ID DO ULTIMO POKEMON */
const readLastIdFile = () => {
    let lastID = fs.readFileSync(`./lastID.txt`);
    lastID = parseInt(lastID);

    return lastID;
};

let pokeID = '0';       // ARMAZENA O VALOR DO ID (SERA ATUALIZADO EM checkExistPokemon)
let existPoke = false;  // BOOLEANO QUE VERIFICA EXISTENCIA DO POKEMON (SERA ATUALIZADO EM checkExistPokemon)

const checkExistPokemon = (name) => {
    const promiseCallback = async (resolve) => {
        lineReader.eachLine(
            './Pokemons.bin',
            function (line) {
                const namePokemon = line.split(';')[1];
                const idPokemon = line.split(';')[0];
                if (name === namePokemon) {
                    pokeID = idPokemon;
                    existPoke = true;
                }
            },
            () => {
                resolve(true);
            },
        );
    };

    return new Promise(promiseCallback);
};

const insertNewPokemon = async (name, type1, type2, XP, height, weight) => {
    await checkExistPokemon(name);

    const promiseCallback = async (resolve) => { 
        if (pokeID === '0' && existPoke === false) {
            lastIDPokemon = readLastIdFile() + 1;
            writeNewLastId(lastIDPokemon);
            const newPokemon = `${lastIDPokemon};${name};${type1};${type2};${XP};${height};${weight}\n`;
            fs.appendFileSync('./Pokemons.bin', newPokemon);
            Trie.insert(name);
            console.log('\nPOKEMON INSERIDO COM SUCESSO!\n');
        } else {
            const pokemons = fs.readFileSync('./Pokemons.bin', 'utf-8').split('\n');
            pokemons.splice(parseInt(pokeID) - 1, 1, `${pokeID};${name};${type1};${type2};${XP};${height};${weight}`);
            const newFile = pokemons.join('\n');
            fs.writeFileSync('./Pokemons.bin', newFile, { encoding: 'utf-8' });
            pokeID = '0';
            existPoke = false;
            console.log('\nPOKEMON ATUALIZADO COM SUCESSO!\n');
        }
        resolve(true);
    }
    return new Promise(promiseCallback);
};

const writeNewLastId = (ID) => {
    ID = ID.toString();
    fs.writeFileSync('./lastID.txt', ID);
};

const MIN = 1; // ID DO PRIMEIRO POKEMON A SER BUSCADO
const MAX = 979; // ID DO ULTIMO POKEMON A SER BUSCADO
var lastIDPokemon = MAX;

const runTasksSynchronously = async (typesPokemon) => {
    if (!(await checkFiles.existFiles(typesPokemon))) {
        await checkFiles.deleteOldFiles(typesPokemon);
        await checkFiles.createFolders();
        await pokemons.rangeGetPokemon(MIN, MAX);
        await weakStrength.rangeGetTypeWeakness(typesPokemon);
        await weakStrength.rangeGetTypeStrength(typesPokemon);
        await checkFiles.createFileID(MAX);
    }
    await InsertNamePokemonInTrie();
    return new Promise((resolve) => resolve());
};

module.exports = {
    runTasksSynchronously,
    searchPokemonsByPrefix,
    insertNewPokemon,
    readAttributesPokemon,
    InsertNamePokemonInTrie,
    logInfoPokemon,
};
