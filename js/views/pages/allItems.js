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

                        let favoris = () => {
                            let favItem = JSON.parse(localStorage.getItem('favItems') || '[]')
                            if (favItem.includes(item.id)) {
                                return `<img loading="lazy" src="../../../img/favorite.png" alt="star">`;
                            }
                            return '';
                        }

                        return `
                            <li>
                                <a href="http://localhost:8000/#/items/${item.id}">
                                    <img loading="lazy" src="../../../img/I${item.id}.png" alt="${item.nom}">
                                    <span>${item.nom}</span>
                                </a>
                                ${favoris()}
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
