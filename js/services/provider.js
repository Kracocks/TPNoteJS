import { ENDPOINT } from "../config.js";
import { Character } from "../model/character.js"

export default class CharacterProvider {
    static fetchCharacters = async (limit = 10) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options);
            const json = await response.json();
            c = json.character.characters
            var character = new Character(
                c.id,
                c.nom,
                c.description,
            );
            for (const [nom, value] of Object.entries(c.caracteristique)) {
                character.addCarac(nom, value)
            }
            return character;
        } catch (err) {
            console.log('Error getting characters\n', err);
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
            const response = await fetch(`${ENDPOINT}/` + id, options);
            const json = await response.json();
            c = json.character.characters
            var character = new Character(
                c.id,
                c.nom,
                c.description,
            );
            for (const [nom, value] of Object.entries(c.caracteristique)) {
                character.addCarac(nom, value)
            }
            return character;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }
}

import { Item } from "../model/character.js"

export class ItemProvider {
    static fetchItem = async (limit = 10) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options);
            const json = await response.json();
            i = json.item.items
            var items = []
            i.forEach(jsonItem => {
                var item = new Item(
                    jsonItem.id,
                    jsonItem.nom,
                    jsonItem.description,
                );
                for (const [nom, value] of Object.entries(c.caracteristique)) {
                    item.addCarac(nom, value)
                }
                items.push(item)
            });
            return items;
        } catch (err) {
            console.log('Error getting characters\n', err);
        }
    }

    static getItem = async (id) => {

        
        const response = await fetch(`${ENDPOINT}/` + id, options);
        const json = await response.json();
        i = json.item.items
        var items = []
        i.forEach(jsonItem => {
            var item = new Item(
                jsonItem.id,
                jsonItem.nom,
                jsonItem.description,
            );
            for (const [nom, value] of Object.entries(c.caracteristique)) {
                item.addCarac(nom, value)
            }
            items.push(item)
        });
        return items;
    }
}