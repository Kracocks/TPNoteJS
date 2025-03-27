import AllCharacters from './js/views/pages/AllCharacters.js';
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
    AllCharacters.render();
});

document.getElementById('next').addEventListener('click', () => {
    console.log(AllCharacters.debut);
    if (AllCharacters.debut >= taille - 3) {
        AllCharacters.debut = 0;
    } else {
        AllCharacters.debut -= 4;
    }
    AllCharacters.render();
});
