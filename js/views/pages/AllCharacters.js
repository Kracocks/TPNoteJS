import Utils from '../../services/utils.js';
import CharacterProvider from '../../services/provider.js';

export default class AllCharacters {
    static async render() {
        let tempo = await CharacterProvider.fetchCharacters();

        let view = `
            <section class="accueil">
                <h2>${tempo.title}</h2>
                <ul>
                    ${tempo.characters
                        .map(
                            (character) => `
                                <li>
                                    <a href="http://localhost:8000/#/characters/:${character.id}">
                                        <img loading="lazy" src="../../../data/c${character.id}.jpg" alt="${character.nom}">
                                        ${character.nom}
                                    </a>
                                </li>`
                        )
}
                </ul>
            </section>`;
        return view;
    }
}