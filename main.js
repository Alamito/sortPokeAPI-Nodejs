const axios = require('axios');
const fs = require('fs');

const checkExistFile = (path) => {
    path = `./${path}.bin`;

    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
};

const deleteFile = (path) => {
    path = `./${path}.bin`;

    try {
        fs.unlinkSync(path);
        console.log('Arquivo deletado com sucesso!');
    } catch (err) {
        console.error(err);
    }
};

const writeFileAttributesPokemon = (Pokemon) => {
    try {
        fs.appendFileSync(
            './Pokemons.bin',
            `${Pokemon.id};${Pokemon.name};${Pokemon.type};${Pokemon.xp};${Pokemon.height};${Pokemon.weight}\n`,
            'utf8',
        );
        console.log(`Pokemon ${Pokemon.id} salvo com sucesso!`);
    } catch (err) {
        console.error(err);
    }
};

const getAttributesPokemon = async (URL) => {
    const response = await axios.get(URL);
    const data = response.data;

    const attributesPokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        xp: data.base_experience,
        height: data.height / 10,
        weight: data.weight / 10,
    };

    return attributesPokemon;
};

const rangeGetPokemon = async (min = 1, max = 1008) => {
    if (checkExistFile('Pokemons'))
        deleteFile('Pokemons');

    for (let idPokemon = min; idPokemon <= max; idPokemon++) {
        const URLIdPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
        Pokemon = await getAttributesPokemon(URLIdPokemon);

        writeFileAttributesPokemon(Pokemon);
    }
};

rangeGetPokemon(1, 10); // test case

const getWeaknessesType = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeWeakness = await data.damage_relations.double_damage_from;

    let Weaknesses = [];

    typeWeakness.forEach((type) => {
        Weaknesses.push(type.name);
    });

    return Weaknesses;
};

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

const rangeGetTypeWeakness = async (types) => {
    for (const type of types) {
        const Weaknesses = await getWeaknessesType(type);
        console.log(type, Weaknesses);
    }
};

// rangeGetTypeWeakness(typesPokemon); // test case

const getTypeStrong = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeStrong = await data.damage_relations.double_damage_to;

    let Strong = [];

    typeStrong.forEach((type) => {
        Strong.push(type.name);
    });

    return Strong;
};

const rangeGetTypeStrong = async (types) => {
    for (const type of types) {
        const Strong = await getTypeStrong(type);
        console.log(type, Strong);
    }
};

// rangeGetTypeStrong(typesPokemon); // test case




