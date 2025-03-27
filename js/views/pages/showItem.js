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

        let ratings = Array.from({ length: item.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');

        let caracteristiques = Object.entries(item.caracteristiques).map(([key, value]) => `
            <li>
                <p>${key} -> ${value}</p>
            </li>
        `).join('');

        return `
            <section class="character">
                <h2>${item.nom}</h2>
                <p>${item.description}</p>
                <img loading="lazy" src="../../../img/I${item.id}.png" alt="${item.nom}">
                <h2>Type</h2>
                <p>${item.type}</p>
                <h2>Caractéristiques</h2>
                <ul>
                    ${caracteristiques}
                </ul>
                <h2>Note</h2>
                <ul>
                    ${ratings}
                </ul>
                <ul>
                    ${note}
                </ul>
            </section>
        `;
    }
}
