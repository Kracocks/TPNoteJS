export default class Item {
    constructor(id, nom, description, type, note, nbnote) {
        this._id = id;
        this._nom = nom;
        this._description = description;
        this._type = type;
        this._note = note;
        this._nbnote = nbnote;
        this._caracteristiques = {}
    }

    // ID
    get id() {
        return this._id;
    }

    // Nom
    get nom() {
        return this._nom;
    }

    set nom(nom) {
        this._nom = nom;
    }

    // Description
    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    // Type
    get type(){
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    // Note
    get note() {
        return this._note;
    }

    set note(note) {
        this._note = note;
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