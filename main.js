const axios = require('axios');
const fs = require('fs');

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

const checkExistFile = (path, directory = '') => {
    path = `./${directory}/${path}.bin`;

    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
};

const deleteFile = (fileName, directory = '') => {
    path = `./${directory}/${fileName}.bin`;

    try {
        fs.unlinkSync(path);
        console.log(`Arquivo ${fileName}.bin deletado com sucesso!`);
    } catch (err) {
        console.error(err);
    }
};

const deleteOldFiles = (types) => {
    checkExistFile('Pokemons') && deleteFile('Pokemons');
    types.forEach((type) => {
        checkExistFile(type, 'types') && deleteFile(type, 'types');
    });
};

deleteOldFiles(typesPokemon);

const writeFileAttributesPokemon = (Pokemon) => {
    try {
        fs.appendFileSync(
            './Pokemons.bin',
            `${Pokemon.id};${Pokemon.name};${Pokemon.xp};${Pokemon.height};${Pokemon.weight}\n`,
            'utf8',
        );
        console.log(`Pokemon ${Pokemon.id} salvo com sucesso!`);
    } catch (err) {
        console.error(err);
    }
};

const writeIdPokemonPerType = (type1, type2, idPokemon) => {
    try {
        fs.appendFileSync(
            `./types/${type1}.bin`,
            `${idPokemon}\n`,
            'utf8',
        );

        if (existType(type2)) {
            fs.appendFileSync(
                `./types/${type2}.bin`,
                `${idPokemon}\n`,
                'utf8',
            );
        }
        // console.log(`Pokemon ${idPokemon} salvo no tipo ${type1} com sucesso!`);
    } catch (err) {
        console.error(err);
    }
};

const existType = (type) => { 
    if (type != null) {
        return true;
    } else {
        return false;
    }
}

const existInJSONType2 = (data) => { 
    try {
        return data.types[1].type.name;
    } catch (err) {
        return null;
    }
}

const getAttributesPokemon = async (URL) => {
    const response = await axios.get(URL);
    const data = response.data;

    const attributesPokemon = {
        id: data.id,
        name: data.name,
        type1: data.types[0].type.name,
        type2: existInJSONType2(data),
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
        writeIdPokemonPerType(Pokemon.type1, Pokemon.type2, Pokemon.id);
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




