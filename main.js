const script = require('./script.js');
const readline = require('readline');
const menu = require('./menu.js');
const fs = require('fs');

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
script.InsertNamePokemonInTrie();

const showMenu = async () => {
    console.log('\nEscolha uma opção:');
    console.log('1 - Procure pokémon por nome ou prefixo');
    console.log('2 - Liste pokémons FORTES contra um tipo específico');
    console.log('3 - Liste pokémons FRACOS contra um tipo específico');
    console.log('5 - Insira um novo pokémon');
    console.log('6 - Sair');

    rl.question('Opção escolhida: ', async (option) => {
        switch (option) {
            case '1':
                const word = await menu.findPokemonByNameOrPrefix();
                script.searchPokemonsByPrefix(word);

                showMenu();
                break;
            case '2':
                const type = await menu.findStrongAgainstPokemon();
                await script.readAttributesPokemon('weaknesses', type);

                showMenu();
                break;
            case '3':
                showMenu();
                break;
            case '4':
                console.log('\nPROGRAMA ENCERRADO!\n');
                rl.close();
                break;
            case '5':
                console.log('\nPROGRAMA ENCERRADO!\n');
                rl.close();
                break;
            case '6':
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
