const script = require('./script.js');
const readline = require('readline');
const menu = require('./menu.js');
const fs = require('fs');

/* NECESSARIO PARA INTERACAO DO USUARIO */
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

const runTasksMain = async () => {
    await script.runTasksSynchronously(typesPokemon);
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
                await script.searchPokemonsByPrefix(word);
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
                let typeWeak = '';
                do {
                    typeWeak = await menu.findWeakAgainstPokemon();

                    if (typeWeak === 'normal') console.log('\nNÃO EXISTE TIPO FRACO CONTRA NORMAL!');
                } while (typeWeak === 'normal');
                
                await script.readAttributesPokemon('strengths', typeWeak);
                script.logInfoPokemon();
                
                showMenu();
                break;
            case '4':
                dataPokemon = await menu.addOrUpdateNewPokemon();
                await script.insertNewPokemon(dataPokemon.name, dataPokemon.type1, dataPokemon.type2, dataPokemon.XP, dataPokemon.height, dataPokemon.weight);

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

runTasksMain();
