
import Utils from "./services/utils.js";
import CharacterAll from "./views/pages/characterAll.js";
import ShowCharacter from "./views/pages/showCharacter.js";
import Error404 from "./views/pages/error404.js";

const routes = {
    '/': CharacterAll,
    '/characters/': CharacterAll,
    '/characters/:id/': ShowCharacter
};

const router = async () => {
    const content = null || document.querySelector('#content');
    let request = Utils.parseRequestURL();
    console.log(request)
    let parsedURL = (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '/');
    console.log(parsedURL)
    let page = new (routes[parsedURL] || Error404);
    content.innerHTML = await page.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router)
