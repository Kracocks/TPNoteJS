export default class Character {
    constructor(id, nom, description, note, nbnote) {
        this._id = id;
        this._nom = nom;
        this._description = description;
        this._caracteristiques = {};
        this._items = [];
        this._note = note;
        this._nbnote = nbnote;
    }

    // ID
    get id() {
        return this._id;
    }

    // Nom
    get nom() {
        return this._nom;
    }

    set nom(newNom) {
        this._nom = newNom
    }

    // Description
    get description() {
        return this._description;
    }

    set description(newDesc) {
        this._description = newDesc
    }

    // Caracteristique
    get caracteristiques() {
        return this._caracteristiques;
    }

    addCarac(nom, baseValue=0) {
        if (!this._caracteristiques.hasOwnProperty(nom)) {
            this._caracteristiques[nom] = baseValue;
        }
    }

    deleteCarac(nom) {
        if (this._caracteristiques.hasOwnProperty(nom)) {
            delete this._caracteristiques[nom]
        }
    }

    updateCarac(nom, newValue) {
        if (this._caracteristiques.hasOwnProperty(nom)) {
            this._caracteristiques[nom] += newValue
        }
    }

    // Item
    get items() {
        return this._items;
    }

    addItem(item) {
        this._items.push(item)
    }

    deleteItem(item) {
        delete this._items[item]
    }

    // Note
    get note() {
        return this._note;
    }

    get nbnote() {
        return this._nbnote;
    }

    set note(newnote) {
        this._note = newnote;
    }

    set nbnote(nbnote) {
        this._nbnote = nbnote;
    }
}