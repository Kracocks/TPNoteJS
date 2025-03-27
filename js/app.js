import Utils from "./services/utils.js";
import AllCharacters from "./views/pages/AllCharacters.js";
import ShowCharacter from "./views/pages/showCharacter.js";
import AllItems from "./views/pages/allItems.js";
import ShowItem from "./views/pages/showItem.js";
import Error404 from "./views/pages/error404.js";
import Accueil from "./views/pages/accueil.js";

const routes = {
    '/': AllItems,
    '/characters': AllCharacters,
    '/characters/:id': ShowCharacter,
    '/items': AllItems,
    '/items/:id': ShowItem,
    '/404': Error404
};

const router = async () => {
    const content = null || document.querySelector('#content');

    let resource = Utils.parseRequestURL();
    console.log("Requete : " . resource)

    let parsedURL = (resource.resource ? '/' + resource.resource : '/') +
    (resource.id ? '/:id' : '') +
    (resource.verb ? '/' + resource.verb : '');

    console.log(parsedURL)
    let page = routes[parsedURL] ? routes[parsedURL] : routes['/error404'];
    console.log("Page : ", page)
    
    content.innerHTML = await page.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router)
