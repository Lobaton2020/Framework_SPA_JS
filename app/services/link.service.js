const LinkService = { // este objeto es usado como clase
    titulo: "",
    url: "",
    links: [],
    link: [],
    crear: function(datos) {

        return new Promise(function(resolve, reject) {

            if (datos.url !== "") {
                LinkService.links.push(datos);
                resolve(true);
            } else {
                resolve(false);
            }

        });
    },
    getLinks: function() {
        return this.links;
    },
    getLink: function(id) {
        let self = this;
        return new Promise(function(resolve, reject) {

            self.links.map(function(data, i) {
                if (data.id === parseInt(id)) {
                    resolve(data);
                }
            });
        });
    },
    actualizar: function(datos) {
        let self = this;
        return new Promise(function(resolve, reject) {
            let newlinks = [];
            self.links.map(function(data, i, links) {
                if (data.id === parseInt(datos.id)) {
                    data.title = datos.title;
                    data.url = datos.url;
                    // return links;
                }
                newlinks.push(data);
            });
            self.links = newlinks;
            resolve(true);
        });
    },
    eliminar: function(id) {
        let self = this;
        let response = false;
        this.links.map(function(dato, i) {
            if (dato.id === parseInt(id)) {
                self.links.splice(i, 1);
                response = true;
            }
        });
        return response;
    }
};



export { LinkService }