(function(window, document) {
    lob.getId('vista').enrutar()
        .ruta("/", ["app/views/init.html"], null, null)
        .ruta("/error404", ["app/views/templates/error404.html"], null, null)
        // rutas de los links
        .ruta("/links", ["app/views/links/create.html", "app/views/links/list.html"], 'link', function() {
            lob.getCtrl().listar();
            lob.getId("form-tarea").noSubmit();
        })

})(window, document);