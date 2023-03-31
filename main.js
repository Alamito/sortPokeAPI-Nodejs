/* Requisições de módulos */
const script = require('./script.js');

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

script.runTasksSynchronously(typesPokemon); // tempo de execucao 1'25'' (medido apenas uma vez)


// runTasksAsynchronously(typesPokemon);   // tempo de execucao 3'20'' (medido apenas uma vez)


