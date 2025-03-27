import { ENDPOINT } from "../config.js";
import Item from "../models/item.js";

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
            let res = [];
            json.forEach(item => {
                res.push(new Item(item.id, item.nom, item.description, item.type));
            });
            return res;
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
            return new Item(json.id, json.nom, json.description, json.type);
        } catch (err) {
            console.log('Error getting item\n', err);
        }
    }
}