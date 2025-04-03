import Utils from '../../services/utils.js';
import ItemProvider from '../../services/itemProvider.js';
import { router } from '../../app.js';


export default class ShowItem {
    static async render() {
        let request = Utils.parseRequestURL();
        let item = await ItemProvider.getItem(request.id);

        let note = Array.from({ length: 5 }, (_, i) => `
                            <li>
                                <input type="radio" id="note${item.id}-${i+1}" name="note-${item.id}" value="${i+1}"/>
                                <label for="note${item.id}-${i+1}">${i+1}</label>
                            </li>
                        `).join('');

        let ratings = Array.from({ length: item.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');

        let favoris = () => {
            let favItems = JSON.parse(localStorage.getItem('favItems') || '[]')
            if (favItems.includes(item.id)) {
                return `<img loading="lazy" src="../../../img/favorite.png" alt="star">`;
            }
            return '';
        }

        let caracteristiques = Object.entries(item.caracteristiques).map(([key, value]) => `
            <li>
                <p>${key} -> ${value}</p>
            </li>
        `).join('');

        let buttonFav = () => {
            let items = JSON.parse(localStorage.getItem('favItems') || '[]')
            if (localStorage.getItem('favItems') === null || !items.includes(item.id)) {
                return `<button id="addToFav">Ajouter aux favoris</button>`;
            } else {
                return `<button id="removeFromFav">Retirer des favoris</button>`;
            }
        }

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
                ${buttonFav()}
                ${favoris()}
                <h2>Note</h2>
                <ul>
                    ${ratings}
                </ul>
                <ul>
                    ${note}
                </ul>
                <button id="noterItem">Ajouter mon avis</button>
            </section>
        `;
    }

    static async renderScript() {
        let request = Utils.parseRequestURL();
        let item = await ItemProvider.getItem(request.id);

        if (document.getElementById('addToFav') != null) {
            document.getElementById('addToFav').addEventListener('click', () => {
                Utils.addFavoriteItem(item.id);
                router();
            });
        }

        if (document.getElementById('removeFromFav') != null) {
            document.getElementById('removeFromFav').addEventListener('click', () => {
                Utils.removeFavoriteItem(item.id);
                router();
            });
        }

        if (document.getElementById('noterItem') != null) {
            document.getElementById('noterItem').addEventListener('click', () => {
                let note = document.querySelector(`input[name="note-${item.id}"]:checked`);
                if (note) {
                    ItemProvider.updateNote(item, parseInt(note.value));
                    console.log(item.note, item.nbnote)
                    router();
                } else {
                    alert('Veuillez choisir une note');
                }
            });
        }
    }
}
