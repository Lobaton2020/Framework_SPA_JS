import { Header } from "./components/Header.js"
import { Loader } from "./components/Loader.js"
import { Main } from "./components/Main.js"
import { Menu } from "./components/Menu.js"
import { SearchForm } from "./components/SearchForm.js"
import { Router } from "./components/Router.js"
import { InfinitScroll } from "./helpers/infinit_scroll.js"

export function App() {
    const d = document,
        $root = d.querySelector("#root");
    $root.textContent = null
    $root.appendChild(Header())
    $root.appendChild(Menu())
    $root.appendChild(SearchForm())
    $root.appendChild(Main())
    $root.appendChild(Loader())
    Router()
    InfinitScroll()
}
