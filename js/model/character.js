export default class Character {
    constructor(id, nom, description) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.caracteristiques = {};
        this.items = [];
    }

    // ID
    get id() {
        return this.id;
    }

    // Nom
    get nom() {
        return this.nom;
    }

    set nom(newNom) {
        this.nom = newNom
    }

    // Description
    get description() {
        return this.description;
    }

    set description(newDesc) {
        this.description = newDesc
    }

    // Caracteristique
    get caracteristiques() {
        return this.caracteristiques;
    }

    addCarac(nom, baseValue=0) {
        if (!this.caracteristiques.hasOwnProperty(nom)) {
            this.caracteristiques[nom] = baseValue;
        }
    }

    deleteCarac(nom) {
        if (this.caracteristiques.hasOwnProperty(nom)) {
            delete this.caracteristiques[nom]
        }
    }

    updateCarac(nom, newValue) {
        if (this.caracteristiques.hasOwnProperty(nom)) {
            this.caracteristiques[nom] += newValue
        }
    }

    // Item
    get items() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item)
    }

    deleteItem(item) {
        delete this.items[item]
    }
}