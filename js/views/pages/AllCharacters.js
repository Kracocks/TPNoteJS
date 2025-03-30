import CharacterProvider from '../../services/provider.js';
import { router } from '../../app.js';

export default class AllCharacters {
    static debut = 0;

    static async render() {
        let characters = await CharacterProvider.fetchCharacters(4, AllCharacters.debut);
        let view = `
            <section class="characters">
                <h2>Les characters</h2>
                <ul>
                    ${characters.map((character) => `
                        <li>
                            <a href="http://localhost:8000/#/characters/${character.id}">
                                <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                                <span>${character.nom}</span>
                            </a>
                        </li>`
                    ).join('')}
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
    }
}