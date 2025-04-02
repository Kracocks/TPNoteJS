import { ENDPOINT } from "../config.js";

export default class CharacterProvider {
    static fetchCharacters = async (limit = 4, start = 0) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/characters?_start=${start}&_limit=${limit}`, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }

    static getCharacter = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/characters/` + id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }

    static getTaille = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/characters`, options);
            const json = await response.json();
            return json.length;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }

    static updateNote = async (note) => {
        
    }
}