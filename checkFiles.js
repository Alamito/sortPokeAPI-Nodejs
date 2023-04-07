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

/* VERIFICA SE TODOS OS ARQUIVOS NECESSÁRIOS ESTAO PRESENTES NO DIRETORIO RAIZ */

const existFiles = (typesPokemon) => {
    const promiseCallback = (resolve) => {
        if (!fs.existsSync('./Pokemons.bin')) return resolve(false);
        if (!fs.existsSync('./lastID.txt')) return resolve(false);
        typesPokemon.forEach((type) => {
            if (!fs.existsSync(`./types/${type}.bin`)) return resolve(false);
            if (!fs.existsSync(`./weaknesses/${type}.bin`)) return resolve(false);
            if (!fs.existsSync(`./strengths/${type}.bin`) && type != 'normal') return resolve(false);
        });
        resolve(true);
    };

    return new Promise(promiseCallback);
};

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

/* CRIA UM ARQUIVO .txt COM O ID DO ULTIMO DO ARQUIVO Pokemons.bin*/    
const createFileID = (lastID) => {
    fs.writeFileSync('./lastID.txt', lastID.toString(), (err) => {
        if (err) throw err;
    });
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

/* DELETA ARQUIVOS ANTIGOS (SE NECESSÁRIO) PARA INSERÇÃO DE NOVOS */

const deleteOldFiles = (types) => {
    checkExistFile('Pokemons') && deleteFile('Pokemons');
    types.forEach((type) => {
        checkExistFile(type, 'types') && deleteFile(type, 'types');

        checkExistFile(type, 'weaknesses') && deleteFile(type, 'weaknesses');

        checkExistFile(type, 'strengths') && deleteFile(type, 'strengths');
    });

    return new Promise((resolve) => resolve());
};

module.exports = {
    existFiles,
    checkExistFolder,
    createFolders,
    checkExistFile,
    deleteFile,
    deleteOldFiles,
    createFileID,
};
