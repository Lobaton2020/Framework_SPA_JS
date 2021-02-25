import api from "./../helpers/wp_api.js"
export function Title() {
    const $h1 = document.createElement("h1")
    $h1.className = "text-center"
    $h1.innerHTML = `
        <a rel="noopener" target="_blank" href="${api.DOMAIN}">
            ${api.NAME.toUpperCase()}
        </a>
    `
    return $h1
}