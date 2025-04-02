import { ENDPOINT } from "../config.js";
import Item from "../model/item.js";
import AllItems from "../views/pages/allItems.js";

export default class ItemProvider {
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

    static fetchItemsByType = async (type = "", start = 0, limit = 4) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            let nomSearch = AllItems.nom ? AllItems.nom.toLowerCase() : "";
            let url = `${ENDPOINT}/items`;

            const response = await fetch(url, options);
            const json = await response.json();

            console.log("Type item : " + type);

            const filterItemsType = json.filter(item =>
                item.type.toLowerCase().includes(type.toLowerCase())
            );

            const filterItemsName = filterItemsType.filter(item =>
                item.nom.toLowerCase().includes(nomSearch)
            );

            const paginationItems = filterItemsName.slice(start, start + limit);

            return paginationItems;
        } catch (err) {
            console.log('Error getting items by type\n', err);
        }
    }
}