import CharacterProvider from '../../services/provider.js';
import ItemProvider from '../../services/itemProvider.js';
import { router } from '../../app.js';

export default class AllFavorites {
    static debutChar = 0;
    static debutItem = 0;

    static async render() {
        //let characters = await CharacterProvider.fetchCharacters(4, AllFavorites.debut);
        let items_ids = localStorage.getItem('favItems');
        let characters_ids = localStorage.getItem('favCharacters');
        let view = `
            <section class="charactersFavorites">
                <h2>Mes characters favoris</h2>
                <ul>
                    ${characters_ids.map((character_id) => {
                        let character = CharacterProvider.getCharacter(character_id);
                        let ratings = Array.from({ length: character.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');
                      
                        return `
                        <li>
                            <a href="http://localhost:8000/#/characters/${character_id}">
                                <img loading="lazy" src="../../../img/C${character_id}.png" alt="${character.nom}">
                                <span>${character.nom}</span>
                            </a>
                            <ul>
                                ${ratings}
                            </ul>
                        </li>`;
                    }).join('')}
                </ul>
                <div class="button-container">
                    <button id="prevChar">Précédent</button>
                    <button id="nextChar">Suivant</button>
                    <span id="counterChar" class="counter"></span>
                </div>
            </section>
            
            <section class="itemsFavorites">
                <h2>Mes items favoris</h2>
                <ul>
                    ${items_ids.map((item_id) => {
                        let item = ItemProvider.getItem(item_id);
                        let ratings = Array.from({ length: item.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');
                      
                        return `
                        <li>
                            <a href="http://localhost:8000/#/items/${item_id}">
                                <img loading="lazy" src="../../../img/I${item_id}.png" alt="${item.nom}">
                                <span>${item.nom}</span>
                            </a>
                            <ul>
                                ${ratings}
                            </ul>
                        </li>`;
                    }).join('')}
                </ul>
                <div class="button-container">
                    <button id="prevItem">Précédent</button>
                    <button id="nextItem">Suivant</button>
                    <span id="counterItem" class="counter"></span>
                </div>
            </section>
            
            `;
        return view;
    }

    static async renderScript() {
        let tailleChar = JSON.parse(localStorage.getItem('favCharacters')).length;
        let tailleItem = JSON.parse(localStorage.getItem('favItems')).length;

        const updateCounterChar = () => {
            const currentStartChar = AllFavorites.debutChar + 1;
            const currentEndChar = Math.min(AllFavorites.debutChar + 4, tailleChar);
            document.getElementById('counterChar').textContent = `${currentStartChar}-${currentEndChar} / ${tailleChar}`;
        };

        const updateCounterItem = () => {
            const currentStartItem = AllFavorites.debutItem + 1;
            const currentEndItem = Math.min(AllFavorites.debutItem + 4, tailleItem);
            document.getElementById('counterItem').textContent = `${currentStartItem}-${currentEndItem} / ${tailleItem}`;
        }
    
        updateCounterChar();
        updateCounterItem();

        document.getElementById('prevChar').addEventListener('click', () => {
            if (AllFavorites.debutChar <= 3) {
                AllFavorites.debutChar = tailleChar - 4;
            } else {
                AllFavorites.debutChar -= 4;
            }
            router();
        });

        document.getElementById('nextChar').addEventListener('click', () => {
            if (AllFavorites.debutChar >= tailleChar - 4) {
                AllFavorites.debutChar = 0;
            } else {
                AllFavorites.debutChar += 4;
            }
            router();
        });

        document.getElementById('prevItem').addEventListener('click', () => {
            if (AllFavorites.debutItem <= 3) {
                AllFavorites.debutItem = tailleItem - 4;
            } else {
                AllFavorites.debutItem -= 4;
            }
            router();
        });

        document.getElementById('nextItem').addEventListener('click', () => {
            if (AllFavorites.debutItem >= tailleItem - 4) {
                AllFavorites.debutItem = 0;
            } else {
                AllFavorites.debutItem += 4;
            }
            router();
        });

        document.getElementById('prevChar').addEventListener('click', updateCounterChar);
        document.getElementById('nextChar').addEventListener('click', updateCounterChar);
        document.getElementById('prevItem').addEventListener('click', updateCounterItem);
        document.getElementById('nextItem').addEventListener('click', updateCounterItem);
    }
}