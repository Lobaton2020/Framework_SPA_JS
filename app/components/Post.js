export function Post(props) {
    let { date, title, content, slug, _embedded, id } = props,
        dateFormat = new Date(date).toLocaleString();
    return `
        <section class="post-page">
            <aside>
                <h2>${title.rendered}</h2>
                <time datetime="${date}">${dateFormat}</time>
            </aside>
            <hr />
            <article>${content.rendered}</article>
        </section>
    `;
}