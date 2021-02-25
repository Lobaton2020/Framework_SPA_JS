export function PostCard(props) {
    let { date, title, slug, _embedded, id } = props,
        dateFormat = new Date(date).toLocaleString(),
        urlPoster = _embedded["wp:featuredmedia"]
            ? _embedded["wp:featuredmedia"][0].source_url
            : "https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg";
    document.addEventListener("click", (e) => {
        if (e.target.matches(".post-card a")) {
            localStorage.setItem("wp-post-id", e.target.dataset.id)
        }
    })
    return `
    <article class="post-card">
            <img class="img-container" src="${urlPoster}" alt="${title.rendered}">
            <h2>${title.rendered}</h2>
            <p>
                <time datetime="${dateFormat}">${dateFormat}</time>
                <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
            </p>
        </article>
    `;

}