import { ENDPOINT } from "../config.js";

export default class CharacterProvider {
    static fetchCharacters = async (limit = 4) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/characters?_limit=${limit}`, options);
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
            const response = await fetch(`${ENDPOINT}/characters` + id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }
}

export class ItemProvider {
    static fetchItems = async (limit = 4) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/items?_limit=${limit}`, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting items\n', err);
        }
    }

    static getItem = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/items` + id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting item\n', err);
        }
    }
}