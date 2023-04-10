const readline = require('readline');

/* NECESSARIO PARA INTERACAO (INPUT) DO USUARIO */
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

/* PEGA INFORMACOES PARA INSERIR NOVO POKEMON OU ALTERAR OS DADOS DE UM EXISTENTE */
const addOrUpdateNewPokemon = () => {
    const dataPokemon = {};
    const promiseCallback = async (resolve) => {
        dataPokemon.name = await questionAsync('INSIRA O NOME DO POKÉMON: ');
        console.log('\nTIPOS DE POKÉMON: NORMAL, FIGHTING, FLYING, POISON, GROUND, ROCK, BUG, GHOST, STEEL, FIRE, WATER, GRASS, ELECTRIC, PSYCHIC, ICE, DRAGON, DARK, FAIRY\n');
        dataPokemon.type1 = await questionAsync('INSIRA O TIPO 1 DO POKÉMON: ');
        dataPokemon.type2 = await questionAsync('INSIRA O TIPO 2 DO POKÉMON (CASO NÃO POSSUA INSIRA "NULL"): ');
        dataPokemon.XP = await questionAsync('INSIRA A QUANTIDADE DE XP DO POKÉMON: ');
        dataPokemon.height = await questionAsync('INSIRA A ALTURA DO POKÉMON [m]: ');
        dataPokemon.weight = await questionAsync('INSIRA O PESO DO POKÉMON [Kg]: ');

        resolve(dataPokemon);
    };

    return new Promise(promiseCallback);
};

/* TORNA A FUNCAO rl.question ASSINCRONA */
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
