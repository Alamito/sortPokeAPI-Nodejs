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

const RangeGetPokemon = async (min = 1, max = 1008) => {
    for (let i = min; i <= max; i++) {
        const URLIdPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;
        Pokemon = await getAttributesPokemon(URLIdPokemon);
        console.log(Pokemon.name, Pokemon.height, Pokemon.weight);
    }
};

RangeGetPokemon(1, 10);
