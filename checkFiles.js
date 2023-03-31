/* Módulos */
const fs = require('fs');
const path = require('path');

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

module.exports = {
    checkExistFolder,
    createFolders,
    checkExistFile,
    deleteFile,
    deleteOldFiles,
};
