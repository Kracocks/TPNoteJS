import Utils from "./services/utils.js";
import AllCharacters from "./views/pages/AllCharacters.js";
import ShowCharacter from "./views/pages/showCharacter.js";
import AllItems from "./views/pages/allItems.js";
import ShowItem from "./views/pages/showItem.js";
import Error404 from "./views/pages/error404.js";
import Accueil from "./views/pages/accueil.js";

const routes = {
    '/': Accueil,
    '/characters': AllCharacters,
    '/characters/:id': ShowCharacter,
    '/items': AllItems,
    '/items/:id': ShowItem,
    '/404': Error404
};

export const router = async () => {
    const content = null || document.querySelector('#content');

    let resource = Utils.parseRequestURL();

    let parsedURL = (resource.resource ? '/' + resource.resource : '/') +
    (resource.id ? '/:id' : '') +
    (resource.verb ? '/' + resource.verb : '');

    let page = routes[parsedURL] ? routes[parsedURL] : routes['/error404'];
    
    content.innerHTML = await page.render();

    if (page === AllCharacters) {
        await page.renderScript();
    }

    if (page === AllItems) {
        await page.renderScript();
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router)
