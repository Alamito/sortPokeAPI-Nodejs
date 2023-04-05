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

const addOrUpdateNewPokemon = () => {
    const dataPokemon = {};
    const promiseCallback = async (resolve) => {
        dataPokemon.name = await questionAsync('Insira o nome do pokémon: ');
        dataPokemon.type1 = await questionAsync('Insira o tipo 1 do pokémon: ');
        dataPokemon.type2 = await questionAsync('Insira o tipo 2 do pokémon (caso nao possua insira null): ');
        dataPokemon.XP = await questionAsync('Insira o XP do pokémon: ');
        dataPokemon.height = await questionAsync('Insira a altura do pokémon: ');
        dataPokemon.weight = await questionAsync('Insira o peso do pokémon: ');

        resolve(dataPokemon);
    };

    return new Promise(promiseCallback);
};

const questionAsync = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

module.exports = {
    findPokemonByNameOrPrefix,
    findWeakAgainstPokemon,
    findStrongAgainstPokemon,
    addOrUpdateNewPokemon,
};
