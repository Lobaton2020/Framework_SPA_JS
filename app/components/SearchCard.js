export function SearchCard(props) {
    let { id, title, _embedded } = props
    let slug = _embedded.self[0].slug
    document.addEventListener("click", (e) => {
        if (e.target.matches(".post-card a")) {
            localStorage.setItem("wp-post-id", e.target.dataset.id)
        }
    })
    return `
    <article class="post-card">
        <h2>${title}</h2>
        <p>
            <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
        </p>
    </article>
    `
}