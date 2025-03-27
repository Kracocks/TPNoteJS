export default class Accueil {
    static async render() {
        return `
        <section class="accueil">
            <h2>Mon jeu</h2>
            <ul>
                <li><a href="http://localhost:8000/#/characters">Les characters</a></li>
                <li><a href="http://localhost:8000/#/items">Les items</a></li>
            </ul>
        </section>
        `
    }
}