import ItemProvider from '../../services/itemProvider.js';

export default class AllCharacters {
    static async render() {
        
        let items = await ItemProvider.fetchItems();
        let view = `
            <section class="items">
                <h2>Les items</h2>
                <ul>
                    ${items.map((item) => `
                        <li>
                            <a href="http://localhost:8000/#/items/${item.id}">
                                <img loading="lazy" src="../../../img/I${item.id}.png" alt="${item.nom}">
                                ${item.nom}
                            </a>
                        </li>`
                    )}
                </ul>
            </section>`;
        return view;
    }
}