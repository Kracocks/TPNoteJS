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
            let i = new Item(json.id, json.nom, json.description, json.type, json.note, json.nbnote);
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

            const filterItemsType = json.filter(items =>
                items.type.toLowerCase().includes(type)
            );

            const filterItemsName = filterItemsType.filter(items =>
                items.nom.toLowerCase().includes(nomSearch)
            );
            
            const paginationItems = filterItemsName.slice(start, start + limit);

            let res = []
            paginationItems.forEach(itemElement => {
                let i = new Item(itemElement.id, itemElement.nom, itemElement.description, itemElement.type, itemElement.note, itemElement.nbnote);
                Object.entries(itemElement.caracteristique).map(([key, value]) => {
                    i.addCarac(key, value)
                });
                res.push(i);
            });

            console.log(res)

            return res;
        } catch (err) {
            console.log('Error getting items by type\n', err);
        }
    }

    static updateNote = async (item, note) => {
        let newNote = note;
        if (item.note !== 0) {
            newNote = (item.note * item.nbnote + note) / (item.nbnote+1);
        }
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: newNote,
                nbnote: item.nbnote+1
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
    
    static getTaille = async (type="") => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            try {
                let nomSearch = AllItems.nom ? AllItems.nom.toLowerCase() : "";
                const response = await fetch(`${ENDPOINT}/items`, options);
                const json = await response.json();

        
                const filterItemsType = json.filter(items =>
                    items.type.toLowerCase().includes(type)
                );
    
                const filterItemsName = filterItemsType.filter(items =>
                    items.nom.toLowerCase().includes(nomSearch)
                );
                return filterItemsName.length;
            } catch (err) {
                console.log('Error getting documents\n', err);
            }
        };
}