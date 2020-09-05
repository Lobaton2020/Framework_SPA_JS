(function(window, document) {
    document.addEventListener("DOMContentLoaded", () => {
        window.laurel.getBy('view').router()
            .route("/", ["app/components/home/home.component.html"], null, () => {
                window.location.hash = "#/links";
            })
            .route("/links", [
                "app/components/create-link/create-link.component.html",
                "app/components/links/links.component.html"
            ], 'link', function() {
                laurel.getController().list();
            })
            .route("/users", ["app/components/users/users.component.html"], 'user', function() {
                laurel.getController().list();
            })
            .route("/notes", ["app/components/notes/notes.component.html"], 'note', function() {
                // laurel.getController().list();
            })

    });
})(window, document);