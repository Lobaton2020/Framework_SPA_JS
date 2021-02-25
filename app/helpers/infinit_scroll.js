import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import { loader, parameter } from "./utils.js";
import api from "./wp_api.js"
export function InfinitScroll() {
    const d = document, w = window;
    let query = parameter("search") || "",
        apiURL,
        Component;
    w.addEventListener("scroll", async (e) => {
        let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
            { hash } = w.location;
        loader(true)
        if (scrollTop + clientHeight >= scrollHeight) {
            api.page++;
            if (!hash || hash == "#/home" || hash == "#/") {
                apiURL = `${api.POSTS}&page=${api.page}`
                Component = PostCard;
            } else if (hash.includes("#/search")) {
                apiURL = `${api.SEARCH}${query}`
                Component = SearchCard;
            } else {
                return false
            }

            await ajax({
                url: apiURL,
                success: (posts) => {
                    let html = ""
                    posts.forEach((post) => html += Component(post))
                    loader(false)
                    d.querySelector("#main").insertAdjacentHTML("beforeend", html)
                }
            })
        }
    })

}