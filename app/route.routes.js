(function(window, document) {
    document.addEventListener("DOMContentLoaded", () => {
        window.laurel.getBy('view').router()
            .route("/", ["app/views/init.html"], null, () => {
                // window.location.hash = "#/links";
            })
            .route("/links/edit", ["app/views/links/update.html"], null, null)
            .route("/error404", ["app/views/templates/error404.html"], null, null)
            .route("/links", ["app/views/links/create.html", "app/views/links/list.html", ], 'link', function() {
                laurel.getController().list();
            })
    });
})(window, document);