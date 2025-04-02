import CharacterProvider from '../../services/provider.js';
import { router } from '../../app.js';

export default class AllCharacters {
    static debut = 0;
    static nom = '';

    static async render() {
        let characters = await CharacterProvider.fetchCharacters(4, AllCharacters.debut);
        let view = `
            <section class="characters">
                <h2>Les characters</h2>
                <input id="search-bar" type="text" placeholder="Rechercher un personnage" />
                <button id="search">Valider</button>
                <ul>
                    ${characters.map((character) => {
                        let ratings = Array.from({ length: character.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');
                        
                        let favoris = () => {
                            let favCharacters = JSON.parse(localStorage.getItem('favCharacters') || '[]')
                            if (favCharacters.includes(character.id)) {
                                return `<img loading="lazy" src="../../../img/favorite.png" alt="star">`;
                            }
                            return '';
                        }
                      
                        return `
                        <li>
                            <a href="http://localhost:8000/#/characters/${character.id}">
                                <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                                <span>${character.nom}</span>
                            </a>
                            ${favoris()}
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
        let taille = await CharacterProvider.getTaille();

        const updateCounter = () => {
            const currentStart = AllCharacters.debut + 1;
            const currentEnd = Math.min(AllCharacters.debut + 4, taille);
            document.getElementById('counter').textContent = `${currentStart}-${currentEnd} / ${taille}`;
        };
    
        updateCounter();

        document.getElementById('prev').addEventListener('click', () => {
            if (AllCharacters.debut <= 3) {
                AllCharacters.debut = taille - 4;
            } else {
                AllCharacters.debut -= 4;
            }
            router();
        });

        document.getElementById('next').addEventListener('click', () => {
            if (AllCharacters.debut >= taille - 4) {
                AllCharacters.debut = 0;
            } else {
                AllCharacters.debut += 4;
            }
            router();
        });

        document.getElementById('prev').addEventListener('click', updateCounter);
        document.getElementById('next').addEventListener('click', updateCounter);

        document.getElementById('search').addEventListener('click', () => {
            let recherche = document.getElementById('search-bar').value;
            AllCharacters.nom = recherche;
            AllCharacters.debut = 0;
            router();
        })
    }
}