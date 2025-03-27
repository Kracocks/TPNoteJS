import CharacterProvider from '../../services/provider.js';

export default class AllCharacters {
    static async render() {
        
        let characters = await CharacterProvider.fetchCharacters();
        let view = `
            <section class="characters">
                <h2>Les characters</h2>
                <ul>
                    ${characters.map((character) => {
                        let ratings = Array.from({ length: character.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');

                        return `
                            <li>
                                <a href="http://localhost:8000/#/characters/${character.id}">
                                    <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                                    ${character.nom}
                                </a>
                                <ul>
                                    ${ratings}
                                </ul>
                            </li>`;
                    }).join('')}
                </ul>
            </section>`;
        return view;
    }
}