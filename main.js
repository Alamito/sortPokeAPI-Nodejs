const script = require('./script.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

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

// script.runTasksSynchronously(typesPokemon); // tempo de execucao 1'25'' (medido apenas uma vez)

// script.insertNewPokemon('Gui Terres', 'fire', 'water', 10, 1.7, 67);

// runTasksAsynchronously(typesPokemon);   // tempo de execucao 3'20'' (medido apenas uma vez)

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

showMenu();
