const axios = require('axios');

const getAttributesPokemon = async (URL) => {
    const response = await axios.get(URL);
    const data = response.data;

    const attributesPokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        xp: data.base_experience,
        height: data.height / 10, // divide por 10 para realizar a conversão
        weight: data.weight / 10, // divide por 10 para realizar a conversão
    };

    return await attributesPokemon;
};

const rangeGetPokemon = async (min = 1, max = 1008) => {
    for (let i = min; i <= max; i++) {
        const URLIdPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;
        Pokemon = await getAttributesPokemon(URLIdPokemon);
        console.log(Pokemon.name, Pokemon.height, Pokemon.weight);
    }
};

rangeGetPokemon(1, 10); // test case

getWeaknessesType = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data;
    const typeWeakness = await data.damage_relations.double_damage_from;

    let Weaknesses = [];

    typeWeakness.forEach((type) => {
        Weaknesses.push(type.name);
    });

    return Weaknesses;
};

const typesPokemon = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];

rangeGetTypeWeakness = async (types) => {     
    for (const type of types) {
        const Weaknesses = await getWeaknessesType(type); 
        console.log(type, Weaknesses);
    }
}

rangeGetTypeWeakness(typesPokemon); // test case


