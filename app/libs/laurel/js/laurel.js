/*
 * Autor : Andres Lobaton
 * Año: 2020
 * Descripcion: Esta libreria esta hace con la finalidad de poder gestionar un sitio SPA.
 * Finalidad: Conectarda con un back-end (java o php). 
 */
import vars from "./vars.js";

(function(window, document) {
    document.addEventListener("DOMContentLoaded", () => {
        'use strict';
        const start = () => { //se interpreta como una clase
            let element = null;
            let frame = null;
            let routes = {};
            let controllers = [];
            let library = {
                url: vars.urlApi,
                urlLaurel: vars.urlLaurel,
                validateStatusResponse: vars.validateStatusResponse,
                loader: '',
                defaultComponents: vars.defaultComponents,
                currentController: '',
                authentication: false,

                getBy: (id) => {
                    element = document.getElementById(id);
                    return laurel;
                },
                getById: (id) => {
                    return document.getElementById(id);
                },

                renderComponent: (route, element) => {
                    let elem = document.getElementById(element);
                    return fetch(route)
                        .then((response) => response.text())
                        .then((text) => {
                            elem.innerHTML = text

                        });
                },

                getController: () => {
                    return window.laurel.currentController;
                },

                controller: (name, objController) => {
                    controllers[name] = objController;
                },

                route: (route, template, controller, action) => {
                    routes[route] = {
                        'templates': template,
                        'controller': controller,
                        'action': action
                    };
                    return window.laurel;
                },

                router: () => {
                    frame = element;
                    return window.laurel;
                },
                renderLoader: (type = false, elem = null) => {
                    if (elem == null) {
                        elem = vars.tagLoader;
                    }
                    let load = document.querySelector("#" + elem);
                    if (load.innerHTML == "") {
                        load.innerHTML = laurel.loader;
                    }
                    if (type) {
                        load.classList.add("loading");
                        document.body.classList.add("hide-overflow");
                        load.classList.remove("loadingOut");
                    } else {
                        document.body.classList.remove("hide-overflow");
                        load.classList.remove("loading");
                        load.classList.add("loadingOut");

                    }
                },
                callDefaultComponents: () => {
                    try {
                        window.laurel.defaultComponents.forEach((view, i) => {
                            window.laurel.renderComponent(view.route, view.element);
                        });
                    } catch (err) {
                        console.error(err)
                    }
                },

                toastr: function(type, message) {
                    toastr[type](message);
                },
                hideDefaultComponents: () => {
                    let contador = 0;
                    for (let view of window.laurel.defaultComponents) {
                        document.getElementById(vars.tagDefault).style.display = "none";
                        document.getElementById(view.element).innerHTML = "";
                    }
                    laurel.fetch(vars.templateLogin, "GET", (data) => {
                        document.getElementById(vars.tagDefaultView).innerHTML = data;
                        controllers[vars.controllerInitCredentials].initValidate();
                        laurel.currentController = controllers[vars.controllerInitCredentials];
                    }, '', 'text')
                },

                fetch: (url, method, callback, data = undefined, type = "json") => {
                    var options = { method: method };
                    typeof data !== undefined && data !== "" ? options.body = data : false;
                    fetch(url, options)
                        .then(response => type == "json" ? response.json() : response.text())
                        .then(result => callback(result));
                },

                verifyAuthentication: async() => {
                    laurel.fetch(vars.urlApi + vars.credentialsUrl, "GET", (data) => {
                        if (typeof data.activeSession !== 'undefined') {
                            laurel.credentials = data.user_data_credentials;
                            laurel.callDefaultComponents();
                            laurel.handlerRoute();
                            return laurel.authentication = true;
                        } else {
                            window.location.hash = vars.redirectBadCredentials;
                            laurel.hideDefaultComponents()
                            return laurel.authentication = false;
                        }
                    });
                },
                initLibraries: () => {
                    // init Toastr
                    toastr.options.progressBar = true;
                    toastr.options.positionClass = "toast-bottom-left";
                },
                handlerRoute: async() => {
                    let hash = window.location.hash.substring(1) || "/";
                    var uri_obj = routes[hash];
                    if (uri_obj && uri_obj.templates) {
                        if (typeof(uri_obj.action) === "function") {
                            if (uri_obj.templates.length === 0) {
                                laurel.currentController = controllers[uri_obj.controller];
                                uri_obj.action()
                                return;
                            }
                        }
                        try {
                            frame.innerHTML = "";
                            for (let uri_template of uri_obj.templates) {
                                let response = await fetch(vars.urlLaurel + uri_template);
                                response = await response.text();
                                frame.insertAdjacentHTML("beforeend", response)
                            };
                            if (uri_obj.controller) {
                                laurel.currentController = controllers[uri_obj.controller];
                            }
                            if (typeof(uri_obj.action) === "function") {
                                uri_obj.action();
                            }


                        } catch (err) {
                            console.error(err)
                        }
                    } else {
                        window.location.hash = vars.redirectRouteNotFound;
                    }
                }


            };
            return library;
        };


        if (typeof window.laurel === "undefined") {
            window.laurel = start();
            window.addEventListener("hashchange", laurel.handlerRoute, false);
        } else {
            console.log("Libreria ya definida")
        }

        const initLaurel = (e) => {
            laurel.initLibraries();
            laurel.loader = vars.loader;
            laurel.renderLoader(false);
            // optional
            laurel.handlerRoute();
            laurel.callDefaultComponents();
            window.laurel = laurel;
            // laurel.defaultComponents = vars.defaultComponents
            // await laurel.verifyAuthentication();
        };

        window.addEventListener("load", initLaurel);

    });
})(window, document);