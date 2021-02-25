export function Menu() {
    const $menu = document.createElement("nav")
    $menu.classList.add("text-center")
    $menu.innerHTML = `
   <nav class="menu">
        <a href="#/home">
            Home
        </a>
        <span>-</span>
        <a href="#/search">
            Busqueda
        </a>
        <span>-</span>
        <a href="#/contact">
            Cotacto
        </a>
        <span>-</span>
        <a href="https://aprendejavascript.org" target="_blank">
            SITIO JON
        </a>
        <span>-</span>
   </nav>`;
    return $menu
}