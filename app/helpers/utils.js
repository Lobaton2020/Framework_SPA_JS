export function parameter(key) {
    let oSearch = new URLSearchParams(location.hash.slice(location.hash.indexOf("?"), location.hash.length))
    return oSearch.get(key) || false;
}
export function loader(show) {
    document.querySelector(".loader").style.display = show ? "block" : "none";
}