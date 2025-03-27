import CharacterProvider from '../../services/provider.js';

export default class AllCharacters {
    static debut = 0;

    static async render() {
        let characters = await CharacterProvider.fetchCharacters(4, AllCharacters.debut);
        let view = `
            <section class="characters">
                <h2>Les characters</h2>
                <button id="prev">Précédent</button>
                <ul>
                    ${characters.map((character) => `
                        <li>
                            <a href="http://localhost:8000/#/characters/${character.id}">
                                <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                                ${character.nom}
                            </a>
                        </li>`
                    )}
                </ul>
                <button id="next">Suivant</button>
            </section>`;

        return view;
    }

    static async renderScript() {
        return `import AllCharacters from './js/views/pages/AllCharacters.js';
        import CharacterProvider from './js/services/provider.js';
        
        let taille = await CharacterProvider.getTaille();
        console.log(taille);
        
        document.getElementById('prev').addEventListener('click', () => {
            console.log(AllCharacters.debut);
            if (AllCharacters.debut <= 3) {
                AllCharacters.debut = taille - 4;
            } else {
                AllCharacters.debut -= 4;
            }
                console.log(AllCharacters.debut);
            AllCharacters.render();
        });
        
        document.getElementById('next').addEventListener('click', () => {
            console.log(AllCharacters.debut);
            if (AllCharacters.debut >= taille - 3) {
                AllCharacters.debut = 0;
            } else {
                AllCharacters.debut += 4;
            }
            console.log(AllCharacters.debut);
            AllCharacters.render();
        });
        `;};
}