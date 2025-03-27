import Utils from '../../services/utils.js';
import CharacterProvider from '../../services/provider.js';

export default class ShowCharacter {
    static async render(){
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        let note = Array.from({ length: 5 }, (_, i) => `
                            <li>
                                <input type="radio" id="note${character.id}-${i+1}" name="note-${character.id}" value="${i+1}"/>
                                <label for="note${character.id}-${i+1}">${i+1}</label>
                            </li>
                        `).join('');

        let ratings = Array.from({ length: character.note }, (_, i) => `
                            <li>
                                <img loading="lazy" src="../../../img/star.png" alt="star${i}">
                            </li>
                        `).join('');

        let caracteristiques = Object.entries(character.caracteristique).map(([key, value]) => `
            <li>
                <p>${key} -> ${value}</p>
            </li>
        `).join('');

        return `
            <section class="character">
                <h2>${character.nom}</h2>
                <p>${character.description}</p>
                <img loading="lazy" src="../../../img/C${character.id}.png" alt="${character.nom}">
                <p>
                <ul>
                    ${caracteristiques}
                </ul>
                <h2>Note</h2>
                <ul>
                    ${ratings}
                </ul>
                <ul>
                    ${note}
                </ul>
            </section>
        `;
    }
}