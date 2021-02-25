import { parameter } from "../helpers/utils.js";


export function SearchForm() {
    const $form = document.createElement("form"),
        $input = document.createElement("input"),
        d = document;
    $form.className = "text-center mb-1 search-form"
    $input.name = "search"
    $input.type = "search"
    $input.placeholder = "Buscar..."
    $input.autocomplete = "off"
    $input.value = parameter("search") || ""
    $form.appendChild($input)

    d.addEventListener("submit", e => {
        if (!e.target.matches(".search-form")) return false;
        e.preventDefault();
        location.hash = `#/search?search=${e.target.search.value}`
    })
    return $form
}