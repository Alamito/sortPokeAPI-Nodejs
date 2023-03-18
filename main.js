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
        console.log(`${fileName}.bin deletado do dir ${directory}!`);
    } catch (err) {
        console.error(err);
    }
};

const deleteOldFiles = (types) => {
    checkExistFile('Pokemons') && deleteFile('Pokemons');
    types.forEach((type) => {
        checkExistFile(type, 'types') && deleteFile(type, 'types');

        checkExistFile(type, 'weaknesses') && deleteFile(type, 'weaknesses');
        
        checkExistFile(type, 'strengths') && deleteFile(type, 'strengths');
    });

    return new Promise(resolve => resolve());
};

const writeAttributesPokemonInFile = (Pokemon) => { 
    fs.appendFileSync(
            './Pokemons.bin',
            `${Pokemon.id};${Pokemon.name};${Pokemon.xp};${Pokemon.height};${Pokemon.weight}\n`,
            'utf8',
    );
    console.log(`Pokemon ${Pokemon.id} salvo em Pokemons.bin!`)
};

const writeFileAttributesPokemon = (Pokemon) => {
    try {
        writeAttributesPokemonInFile(Pokemon);
    } catch (err) {
        console.error(err);
    }
};

const writeIdInFile = (type1, type2, idPokemon) => {
    fs.appendFileSync(
        `./types/${type1}.bin`,
        `${idPokemon}\n`,
        'utf8',
    );
    console.log(`Pokemon ${idPokemon} salvo no tipo ${type1}`);

    if (existType(type2)) {
        fs.appendFileSync(
            `./types/${type2}.bin`,
            `${idPokemon}\n`,
            'utf8',
        );
        console.log(`Pokemon ${idPokemon} salvo no tipo ${type2}`);
    }
}

const writeIdPokemonPerType = (type1, type2, idPokemon) => {
    try {
        writeIdInFile(type1, type2, idPokemon);
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

    return new Promise((resolve) => resolve());
};

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

        writeFileWeaknessesType(type, Weaknesses);
    }
    return new Promise((resolve) => resolve());
};

const writeWeaknessInFile = (type, Weaknesses) => {
    Weaknesses.forEach((Weakness) => {
        fs.appendFileSync(
            `./weaknesses/${type}.bin`,
            `${Weakness}\n`,
            'utf8',
        );
        console.log(`Tipo ${Weakness} salvo no dir weaknesses!`);
    });
}

const writeFileWeaknessesType = (type, Weaknesses) => { 
    try {
        writeWeaknessInFile(type, Weaknesses);
        console.log(`Tipo ${type} salvo no dir types!`);
    } catch (err) {
        console.error(err);
    }
}

const writeStrengthInFile = (type, Strengths) => {
    Strengths.forEach((Strength) => {
        fs.appendFileSync(
            `./strengths/${type}.bin`,
            `${Strength}\n`,
            'utf8'
        );
        console.log(`Tipo ${Strength} salvo no dir strengths!`);
    });
};

const writeFileStrengthsType = (type, Strengths) => { 
    try {
        writeStrengthInFile(type, Strengths);
    } catch (err) {
        console.error(err);
    }
}

const getTypeStrong = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeStrength = await data.damage_relations.double_damage_to;

    let Strengths = [];

    typeStrength.forEach((type) => {
        Strengths.push(type.name);
    });

    return Strengths;
};

const rangeGetTypeStrength = async (types) => {
    for (const type of types) {
        const Strengths = await getTypeStrong(type);
        writeFileStrengthsType(type, Strengths);
    }

    return new Promise((resolve) => resolve());
};

const runTasksSynchronously = async (typesPokemon) => { 
    await deleteOldFiles(typesPokemon);
    await rangeGetPokemon(1, 1008);
    await rangeGetTypeWeakness(typesPokemon);
    await rangeGetTypeStrength(typesPokemon);
}

const runTasksAsynchronously = async (typesPokemon) => {
    await deleteOldFiles(typesPokemon);
    rangeGetPokemon(1, 1008);
    rangeGetTypeWeakness(typesPokemon);
    rangeGetTypeStrength(typesPokemon);
};

// runTasksSynchronously(typesPokemon);    // tempo de execucao 1'25'' (medido apenas uma vez)

// runTasksAsynchronously(typesPokemon);   // tempo de execucao 3'20'' (medido apenas uma vez)

// deleteOldFiles(typesPokemon);



