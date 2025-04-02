import { ENDPOINT } from "../config.js";
import Item from "../model/item.js";

export default class ItemProvider {
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
            let items = [];
            json.forEach(item => {
                let i = new Item(item.id, item.nom, item.description, item.type, item.note)
                Object.entries(item.caracteristique).map(([key, value]) => {
                    i.addCarac(key, value)
                });
                items.push(i)
            });
            return items;
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
            const response = await fetch(`${ENDPOINT}/items/` + id, options);
            const json = await response.json();
            let i = new Item(json.id, json.nom, json.description, json.type, json.note);
            Object.entries(json.caracteristique).map(([key, value]) => {
                i.addCarac(key, value)
            });
            return i;
        } catch (err) {
            console.log('Error getting item\n', err);
        }
    }

    static updateNote = async (item, note) => {
        let newNote = note;
        if (item.note !== 0) {
            newNote = (item.note + note) / 2;
        }
        console.log(newNote);
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
            const response = await fetch(`${ENDPOINT}/items/` + item.id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting documents\n', err);
        }
    }
}