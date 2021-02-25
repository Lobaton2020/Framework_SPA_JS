import { ajax } from "../helpers/ajax.js"

export function PostCardCats() {
    const $container = document.createElement("div")
    const $img = document.createElement("img")
    $img.alt = "Cargando..."
    $img.style.background = "red"
    $img.classList.add("center")
    ajax({
        url: "http://127.0.0.1:5500/app/assets/ids_cats.json",
        success: (data) => {
            const numRand = Math.floor(Math.random() * data.length)
            ajax({
                url: `https://api.thecatapi.com/v1/images/${data[numRand]}`,
                success: function (data) {
                    let { url, width, height, id } = data
                    $img.width = "500"
                    $img.src = url
                    $img.style.margin = "0px auto"
                    $img.id = id
                }
            })
        }
    })
    $container.appendChild($img)
    return $container
}