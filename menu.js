// var rl = require('readline-sync');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const findPokemonByNameOrPrefix = () => {
    const promiseCallback = (resolve) => {
        let name = rl.question('Digite o nome do pokemon').toString();
        resolve(name);
    };

    return new Promise(promiseCallback);
};


const findWeakAgainstPokemon = () => {
    const promiseCallback = (resolve) => {
        let type = rl.question('Digite o tipo de pokémon: ');
        resolve(type);
    };

    return new Promise(promiseCallback);
};

const findStrongAgainstPokemon = () => {
    const promiseCallback = (resolve) => {
        let type = rl.question('Digite o tipo de pokémon: ');
        resolve(type);
    };

    return new Promise(promiseCallback);
};

const addNewPokemon = () => {
    const promiseCallback = (resolve) => {
        let type = rl.question('Digite o tipo de pokémon: ');
        resolve(type);
    };

    return new Promise(promiseCallback);
};

/*
const showMenu = async () => {
    console.log('\nEscolha uma opção:');
    console.log('1 - Consultar trechos x modalidade');
    console.log('2 - Cadastrar transporte');
    console.log('3 - Dados estatísticos');
    console.log('4 - Sair');

    rl.question('Opção escolhida: ', async (option) => {
        switch (option) {
            case '1':
                console.log('aaaa');
                showMenu();
                break;
            case '2':
        
                showMenu();
                break;
            case '3':
        
                showMenu();
                break;
            case '4':
                console.log('\nPROGRAMA ENCERRADO!\n');
                rl.close();
                break;
            default:
                console.log('\nOPÇÃO INVÁLIDA!');
                showMenu();
                break;
        }
    });
};
*/

// showMenu();

//module.exports = showMenu();
