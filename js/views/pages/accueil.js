import Utils from '../../service/Utils.js';
import CharacterProvider from '../../service/provider.js';

export default class ShowCharacter {
    async render() {
        let characters = await CharacterProvider.fetchCharacter();

        let view = `
            <section class="accueil">
                <h2>${character.nom}</h2>
                <ul>
                    ${characters
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