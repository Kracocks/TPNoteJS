const Utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || "/";
        let r = url.split("/");
        let request = {
            resource: null,
            id: null,
            verb: null,
        };
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    },

    addFavoriteCharacter: (id) => {
        let favCharacters = JSON.parse(localStorage.getItem('favCharacters') || '[]');
        if (!favCharacters.includes(id)) {
            favCharacters.push(id);
            localStorage.setItem('favCharacters', JSON.stringify(favCharacters));
        }
    },

    removeFavoriteCharacter: (id) => {
        let favCharacters = JSON.parse(localStorage.getItem('favCharacters') || '[]');
        if (favCharacters.includes(id)) {
            favCharacters = favCharacters.filter(fav => fav !== id);
            localStorage.setItem('favCharacters', JSON.stringify(favCharacters));
        }
    },

    addFavoriteItem: (id) => {
        let favItems = JSON.parse(localStorage.getItem('favItems') || '[]');
        if (!favItems.includes(id)) {
            favItems.push(id);
            localStorage.setItem('favItems', JSON.stringify(favItems));
        }
    },

    removeFavoriteItem: (id) => {
        let favItems = JSON.parse(localStorage.getItem('favItems') || '[]');
        if (favItems.includes(id)) {
            favItems = favItems.filter(fav => fav !== id);
            localStorage.setItem('favItems', JSON.stringify(favItems));
        }
    },

}

export default Utils;