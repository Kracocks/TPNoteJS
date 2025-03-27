import Utils from '../../services/utils.js';
import ItemProvider from '../../services/itemProvider.js';

export default class ShowCharacter {
    static async render(){
        let request = Utils.parseRequestURL();
        let items = await ItemProvider.getItem(request.id);

        return `
            <section class="character">
                <h2>${items.nom}</h2>
                <p>${items.description}</p>
                <p>${items.type}</p>
                <p>
                <ul>
                    ${items.caracteristique.map((carac) => `
                        <li>
                            <p>${carac} -> ${items.caracteristique[carac]}</p>
                        </li>`
                    )}
                </ul>
                </p><img loading="lazy" src="../../../data/c${items.id}.jpg" alt="${items.nom}">
            </section>
        `;
    }
}