import Utils from '../../services/utils.js';
import ItemProvider from '../../services/itemProvider.js';

export default class ShowItem {
    static async render() {
        let request = Utils.parseRequestURL();
        let item = await ItemProvider.getItem(request.id);

        let note = Array.from({ length: 5 }, (_, i) => `
                            <li>
                                <input type="radio" id="note${item.id}-${i}" name="note-${item.id}" value="${i}"/>
                                <label for="note${item.id}-${i}">${i}</label>
                            </li>
                        `).join('');

        let caracteristiques = Object.entries(item.caracteristique).map(([key, value]) => `
            <li>
                <p>${key} -> ${value}</p>
            </li>
        `).join('');

        return `
            <section class="character">
                <h2>${item.nom}</h2>
                <p>${item.description}</p>
                <p>${item.type}</p>
                <ul>
                    ${caracteristiques}
                </ul>
                <ul>
                    ${note}
                </ul>
                <img loading="lazy" src="../../../data/c${item.id}.jpg" alt="${item.nom}">
            </section>
        `;
    }
}
