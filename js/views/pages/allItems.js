import ItemProvider from '../../services/itemProvider.js';

export default class AllItems {
    static async render() {
        let items = await ItemProvider.fetchItems();

        let view = `
            <section class="items">
                <h2>Les items</h2>
                <ul>
                    ${items.map((item) => {
                        let ratings = Array.from({ length: item.note }, (_, i) => `
                            <li>
                                <input type="radio" id="note${item.id}-${i}" name="note-${item.id}" value="${i}"/>
                                <label for="note${item.id}-${i}">${i}</label>
                            </li>
                        `).join('');

                        return `
                            <li>
                                <a href="http://localhost:8000/#/items/${item.id}">
                                    <img loading="lazy" src="../../../img/I${item.id}.png" alt="${item.nom}">
                                    ${item.nom}
                                </a>
                                <ul>
                                    ${ratings}
                                </ul>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </section>`;
        return view;
    }
}
