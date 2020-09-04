export const LinkService = { // este objeto es usado como clase
    titulo: "",
    url: "",
    links: [],
    link: [],
    create: function(datos) {
        let self = this;
        return new Promise(function(resolve, reject) {
            if (datos.url !== "") {
                self.links.push(datos);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    },
    getLinks: function() {
        return new Promise((resolve, reject) => {
            resolve(this.links);
        });
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
    update: function(datos) {
        let self = this;
        return new Promise(function(resolve, reject) {
            let newlinks = [];
            self.links.map(function(data, i) {
                if (parseInt(data.id) === parseInt(datos.id)) {
                    data.title = datos.title;
                    data.url = datos.url;
                }
                newlinks.push(data);
            });
            self.links = newlinks;
            resolve(true);
        });
    },
    delete: function(id) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.links.map(function(data, i) {
                if (parseInt(data.id) === parseInt(id)) {
                    self.links.splice(i, 1);
                    resolve(true);
                }
            });
            resolve(false);
        });
    }
};