export function Main() {
    const $main = document.createElement("main")
    $main.id = "main";
    if (!location.hash.includes("#/search") && !location.hash.includes("#/contact")) $main.classList.add("grid-fluid")
    return $main
}