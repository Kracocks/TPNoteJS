

const routes = {
    '/': null,
};

const router = async () => {
    const content = null || document.querySelector('#content');
    let request = Utils.parseRequestURL();
    console.log(request)
    let parsedURL = (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '/');
    console.log(parsedURL)
    let page = new routes[parsedURL] || Error404;
    content.innerHTML = await page.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router)
