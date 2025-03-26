import CharacterProvider from '../../services/provider.js';

export default class AllCharacters {
    static async render() {
        
        let characters = await CharacterProvider.fetchCharacters();
        let view = `
            <section class="accueil">
                <h2>Les characters</h2>
                <ul>
                    ${characters.characters.map((character) => `
                        <li>
                            <a href="http://localhost:8000/#/characters/${character.id}">
                                <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                                ${character.nom}
                            </a>
                        </li>`
                    )}
                </ul>
            </section>`;
        return view;
    }
}