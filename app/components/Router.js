import { ajax } from "./../helpers/ajax.js"
import api from "./../helpers/wp_api.js"
import { PostCard } from "./PostCard.js"
import { SearchCard } from "./SearchCard.js"
import { Post } from "./Post.js"
import { loader, parameter } from "../helpers/utils.js";
import { ContactForm } from "./ContactForm.js"

export async function Router() {
    const d = document, w = window, $main = d.querySelector("#main");
    let { hash, } = w.location;
    let max = hash.indexOf("?") === -1 ? hash.length : hash.indexOf("?");
    hash = hash.slice(0, max)
    switch (hash) {
        case "":
        case "#/":
        case "#/home":
            await handlerPosts($main, d)
            break;
        case "#/search":
            await handlerSearch($main, d);
            break;
        case "#/contact":
            $main.appendChild(ContactForm())
            break;
        default:
            await handlerPost($main, d)
            break;
    }
    loader(false)
}

async function handlerPosts(el, d) {
    return await ajax({
        url: api.POSTS,
        success: (posts) => {
            let html = "";
            posts.forEach((post) => html += PostCard(post))
            el.innerHTML = html
        }
    });
}


async function handlerPost(el, d) {
    return await ajax({
        url: `${api.POST}/${localStorage.getItem("wp-post-id")}`,
        success: (post) => {
            el.innerHTML = Post(post)
        }
    });
}
async function handlerSearch(el, d) {
    let search = parameter("search") || "";
    return await ajax({
        url: `${api.SEARCH}${search}`,
        success: (posts) => {
            let html = "";
            posts.forEach((post) => html += SearchCard(post))
            if (posts.length === 0) {
                html = `<p class="error">Error, No hubo resultados de busqueda para :<mark>${search}`
            }
            el.innerHTML = html
        }
    })
}