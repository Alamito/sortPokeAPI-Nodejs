const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const findPokemonByNameOrPrefix = () => {
    const promiseCallback = (resolve) => {
        rl.question('Digite o nome ou prefixo do pokemon: ', (word) => { 
            resolve(word);
        });
    };

    return new Promise(promiseCallback);
};


const findWeakAgainstPokemon = () => {
    const promiseCallback = (resolve) => {
        rl.question('Digite o tipo de pokémon: ', (type) => { 
            resolve(type);
        });
    };

    return new Promise(promiseCallback);
};

const findStrongAgainstPokemon = () => {
    const promiseCallback = (resolve) => {
        rl.question('Digite o tipo de pokémon: ', (type) => { 
            resolve(type);
        });
    };

    return new Promise(promiseCallback);
};

const addNewPokemon = () => {
    rl.question('Digite o tipo de pokémon: ', (type) => { 
        resolve(type);
    });

    return new Promise(promiseCallback);
};


module.exports = {
    findPokemonByNameOrPrefix,
    findWeakAgainstPokemon,
    findStrongAgainstPokemon,
    addNewPokemon,
};
