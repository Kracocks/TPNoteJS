export default class Item {
    constructor(id, nom, description, type) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.type = type;
        this.caracteristiques = {}
    }

    // ID
    get id() {
        return this.id;
    }

    // Nom
    get nom() {
        return this.nom;
    }

    set nom(nom) {
        this.nom = nom;
    }

    // Description
    get description() {
        return this.description;
    }

    set description(description) {
        this.description = description;
    }

    // Type
    get type(){
        return this.type;
    }

    set type(type) {
        this.type = type;
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
}