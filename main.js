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

// script.insertNewPokemon('Gui Terres', 'fire', 'water', 10, 1.7, 67);

// runTasksAsynchronously(typesPokemon);   // tempo de execucao 3'20'' (medido apenas uma vez)

const runTasksMain = async () => {
    await script.runTasksSynchronously(typesPokemon); // tempo de execucao 1'25'' (medido apenas uma vez)
    showMenu();
}


const showMenu = async () => {
    console.log('\nESCOLHA UMA OPÇÃO:');
    console.log('1 - PROCURE POKÉMON POR NOME OU VÁRIOS POR PREFIXO');
    console.log('2 - LISTE POKÉMONS FORTES CONTRA UM TIPO ESPECÍFICO');
    console.log('3 - LISTE POKÉMONS FRACOS CONTRA UM TIPO ESPECÍFICO');
    console.log('4 - INSIRA UM NOVO POKÉMON');
    console.log('5 - SAIR');

    rl.question('Opção escolhida: ', async (option) => {
        switch (option) {
            case '1':
                const word = await menu.findPokemonByNameOrPrefix();
                script.searchPokemonsByPrefix(word);
                script.logInfoPokemon();

                showMenu();
                break;
            case '2':
                const typeStrong = await menu.findStrongAgainstPokemon();
                await script.readAttributesPokemon('weaknesses', typeStrong);
                script.logInfoPokemon();

                showMenu();
                break;
            case '3':
                const typeWeak = await menu.findWeakAgainstPokemon();
                await script.readAttributesPokemon('strengths', typeWeak);
                script.logInfoPokemon();
                
                showMenu();
                break;
            case '4':
                dataPokemon = await menu.addOrUpdateNewPokemon();
                script.insertNewPokemon(dataPokemon.name, dataPokemon.type1, dataPokemon.type2, dataPokemon.XP, dataPokemon.height, dataPokemon.weight);

                showMenu();
                break;
            case '5':
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

// showMenu();
runTasksMain();
