export const ENDPOINT = 'http://localhost:3000';
if (localStorage.getItem('favCharacters') === null) {
    localStorage.setItem('favCharacters', []);
}
if (localStorage.getItem('favItems') === null) {
    localStorage.setItem('favItems', []);
}