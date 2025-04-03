import { ENDPOINT } from "../config.js";
import Character from "../model/character.js";
import AllCharacters from "../views/pages/AllCharacters.js";

export default class CharacterProvider {
    static fetchCharacters = async (limit = 4, start = 0) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            let nomSearch = AllCharacters.nom ? AllCharacters.nom.toLowerCase() : "";
            let url = `${ENDPOINT}/characters`;

            const response = await fetch(url, options);
            const json = await response.json();

            const filteredCharacters = json.filter(character =>
                character.nom.toLowerCase().includes(nomSearch)
            );

            const paginatedCharacters = filteredCharacters.slice(start, start + limit);

            let res = []
            paginatedCharacters.forEach(charElement => {
                let c = new Character(charElement.id, charElement.nom, charElement.description, charElement.type, charElement.note, charElement.nbnote);
                Object.entries(charElement.caracteristique).map(([key, value]) => {
                    c.addCarac(key, value)
                });
                res.push(c);
            });

            return res;
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

            let c = new Character(json.id, json.nom, json.description, json.type, json.note, json.nbnote);
            Object.entries(json.caracteristique).map(([key, value]) => {
                c.addCarac(key, value)
            });
            return c;
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
            let nomSearch = AllCharacters.nom ? AllCharacters.nom.toLowerCase() : "";
            const response = await fetch(`${ENDPOINT}/characters`, options);
            const json = await response.json();
    
            const filteredCharacters = json.filter(character =>
                character.nom.toLowerCase().includes(nomSearch)
            );
    
            return filteredCharacters.length;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }

    static updateNote = async (character, note) => {
        let newNote = note;
        if (character.note !== 0) {
            newNote = (character.note + note) / 2;
        }
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: newNote
            })
        };
        try {
            const response = await fetch(`${ENDPOINT}/characters/` + character.id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }
}