import CharacterProvider from '../../services/provider.js';
import { ENDPOINT } from '../../config.js';

export default class CharacterAll {
    async render(){
        let p = await CharacterProvider.fetchCharacters(10);
        console.log(p)
        let characters = p.characters

        let view = `
        <h2>${p.title}</h2>
        <ul>
        ${characters.map(character => {
            return `<li><a href='${ENDPOINT}/characters/${character.id}'>${character.nom}</a></li>`;
        }).join('\n')}
        </ul>
        `;

        return view;
    }
}