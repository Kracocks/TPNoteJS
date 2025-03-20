

export default class Error404 {
    static async render() {
        return `
            <section class="error404">
                <h1>404</h1>
                <p>Page not found</p>
            </section>
        `;
    }

}