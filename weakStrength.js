const axios = require('axios');
const fs = require('fs');

const rangeGetTypeWeakness = async (types) => {
    for (const type of types) {
        const Weaknesses = await getWeaknessesType(type);

        writeFileWeaknessesType(type, Weaknesses);
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

const writeFileWeaknessesType = (type, Weaknesses) => {
    try {
        writeWeaknessInFile(type, Weaknesses);
        // console.log(`Tipo ${type} salvo no dir types!`);
    } catch (err) {
        console.error(err);
    }
};

const writeWeaknessInFile = (type, Weaknesses) => {
    Weaknesses.forEach((Weakness) => {
        fs.appendFileSync(`./weaknesses/${type}.bin`, `${Weakness}\n`, 'utf8');
        // console.log(`Tipo ${Weakness} salvo no dir weaknesses!`);
    });
};

const rangeGetTypeStrength = async (types) => {
    for (const type of types) {
        const Strengths = await getTypeStrong(type);
        writeFileStrengthsType(type, Strengths);
    }

    return new Promise((resolve) => resolve());
};

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

const writeFileStrengthsType = (type, Strengths) => {
    try {
        writeStrengthInFile(type, Strengths);
    } catch (err) {
        console.error(err);
    }
};

const writeStrengthInFile = (type, Strengths) => {
    Strengths.forEach((Strength) => {
        fs.appendFileSync(`./strengths/${type}.bin`, `${Strength}\n`, 'utf8');
        // console.log(`Tipo ${Strength} salvo no dir strengths!`);
    });
};

module.exports = {
    rangeGetTypeWeakness,
    rangeGetTypeStrength,
    writeFileWeaknessesType,
    writeWeaknessInFile,
    rangeGetTypeStrength,
    getTypeStrong,
    writeFileStrengthsType,
    writeStrengthInFile
};

