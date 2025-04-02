import ItemProvider from '../../services/itemProvider.js';
import { router } from '../../app.js';

export default class AllItems {
    static debut = 0;
    static type = '';
    static nom = '';

    static async render() {
        let items = await ItemProvider.fetchItemsByType(AllItems.type, AllItems.debut, 4);

        let view = `
            <section class="items">
                <h2>Les Temporaires</h2>
                <select name="item" id="item-select">
                    <option value="" ${AllItems.type === '' ? 'selected' : ''}>All item</option>
                    <option value="casque" ${AllItems.type === 'casque' ? 'selected' : ''}>Casques</option>
                    <option value="plastron" ${AllItems.type === 'plastron' ? 'selected' : ''}>Plastrons</option>
                    <option value="pantalon" ${AllItems.type === 'pantalon' ? 'selected' : ''}>Pantalons</option>
                    <option value="bottes" ${AllItems.type === 'bottes' ? 'selected' : ''}>Bottes</option>
                    <option value="arme" ${AllItems.type === 'arme' ? 'selected' : ''}>Armes</option>
                </select>
                <input id="search-bar" type="text" placeholder="Rechercher un item..." />
                <button id="search">Valider</button>
                <ul>
                    ${items.map((item) => {
                        let ratings = Array.from({ length: item.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');

                        return `
                            <li>
                                <a href="http://localhost:8000/#/items/${item.id}">
                                    <img loading="lazy" src="../../../img/I${item.id}.png" alt="${item.nom}">
                                    <span>${item.nom}</span>
                                </a>
                                <ul>
                                    ${ratings}
                                </ul>
                            </li>`;
                    }).join('')}
                </ul>
                <div class="button-container">
                    <button id="prev">Précédent</button>
                    <button id="next">Suivant</button>
                    <span id="counter" class="counter"></span>
                </div>
            </section>`;
        return view;
    }

    static async renderScript() {
        let taille = await ItemProvider.getTaille(AllItems.type);

        document.getElementById('item-select').addEventListener('change', (event) => {
            AllItems.type = event.target.value;
            AllItems.debut = 0;
            router();
        });

        const updateCounter = () => {
            const currentStart = AllItems.debut + 1;
            const currentEnd = Math.min(AllItems.debut + 4, taille);
            document.getElementById('counter').textContent = `${currentStart}-${currentEnd} / ${taille}`;
        };

        updateCounter();

        document.getElementById('prev').addEventListener('click', () => {
            if (AllItems.debut <= 3) {
                AllItems.debut = taille - 4;
            } else {
                AllItems.debut -= 4;
            }
            router();
        });

        document.getElementById('next').addEventListener('click', () => {
            if (AllItems.debut >= taille - 4) {
                AllItems.debut = 0;
            } else {
                AllItems.debut += 4;
            }
            router();
        });

        document.getElementById('prev').addEventListener('click', updateCounter);
        document.getElementById('next').addEventListener('click', updateCounter);

        document.getElementById('search').addEventListener('click', () => {
            let recherche = document.getElementById('search-bar').value;
            AllItems.nom = recherche;
            AllItems.debut = 0;
            router();
        });
    }
}
