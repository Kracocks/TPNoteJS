import Utils from '../../service/Utils.js';
import CharacterProvider from '../../service/provider.js';

export default class ShowCharacter {
    async render(){
        let request = Utils.parseRequestURL();
        let character = await provider.getCharacter(request.id);

        return `
            <section class="character">
                <h2>${character.nom}</h2>
                <p>${character.description}</p>
                <p><ul><li>
                Force : ${character.caracteristique.force}
                    </li><li>
                Endurance : ${character.caracteristique.endurance}
                    </li><li>
                Agilité : ${character.caracteristique.agilite}
                    </li><li>
                Intelligence : ${character.caracteristique.intelligence}
                    </li></ul>
                </p><img loading="lazy" src="../../../data/c${character.id}.jpg" alt="${character.nom}">
            </section>
        `;
    }
}