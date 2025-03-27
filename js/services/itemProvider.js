import { ENDPOINT } from "../config.js";

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