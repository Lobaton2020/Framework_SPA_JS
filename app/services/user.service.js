import vars from "../libs/laurel/js/vars.js";

export default {
    url: vars.urlApi,
    optionsRequest: function(data) {
        return {
            method: "POST",
            body: data
        }
    },
    validate: async function(datos) {
        try {
            const response = await fetch(this.url + "auth/login", this.optionsRequest(datos));
            const result = await response.json();
            return result.response.type == "logged" ? true : false;
        } catch (err) {
            console.error(err)
        }
    },
    create: async function(datos) {
        try {
            const response = await fetch(this.url + "user/store", this.optionsRequest(datos));
            const result = await response.json();
            return result.response.ok == 200 ? true : result.response.type;
        } catch (err) {
            console.error(err)
        }
    },
    update: async function(datos, id) {
        try {
            const response = await fetch(this.url + `user/update/text/${id}`, this.optionsRequest(datos));
            const result = await response.json();
            return result.response.ok == 200 ? true : result.response.type;
        } catch (err) {
            console.error(err)
        }
    },
    get: async function(id) {
        try {
            const response = await fetch(this.url + `user/get/${id}`);
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    },
    see: async function() {
        try {
            const response = await fetch(this.url + `auth/see`);
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    },

    users: async function(name) {
        try {
            const response = await fetch(this.url + `user/users/${name}`);
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    },
    list: async function() {
        try {
            const response = await fetch(this.url + "users");
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    },
    listRoles: async function() {
        try {
            const response = await fetch(this.url + "rol/all");
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    },
    logout: async function() {
        try {
            const response = await fetch(this.url + "auth/logout");
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err)
        }
    }

};