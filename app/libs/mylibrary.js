/*
 * Autor : Andres Lobaton
 * Año: 2020
 * Descripcion: Esta libreria esta hace con la finalidad de poder gestionar un sitio SPA.
 * Finalidad: Conectarda con un back-end (java o php). 
 */

(function(window, document) {
    'use strict';

    function inicio() { //se interpreta como una clase
        let elemento = null;
        let marco = null;
        let rutas = {};
        let controladores = [];
        let ctrlActual = null;
        let libreria = {

            loader: '',
            predefinido: [],

            getId: function(id) {
                elemento = document.getElementById(id);
                return this;
            },

            getById: function(id) {
                return document.getElementById(id);
            },

            noSubmit: function() {
                elemento.addEventListener('submit', (e) => {
                    e.preventDefault();
                });
                return this;
            },

            enrutar: function() {
                marco = elemento;
                return this;
            },

            useFetch: function(ruta, elemento) {
                let elem = document.getElementById(elemento);
                fetch(ruta)
                    .then((response) => response.text())
                    .then((text) => { elem.innerHTML = text });
            },

            getCtrl: function() {
                return ctrlActual;
            },
            controlador: function(nombre, ctrl) {
                controladores[nombre] = ctrl;
            },

            ruta: function(ruta, plantilla, controlador, carga) {
                rutas[ruta] = {
                    'plantilla': plantilla,
                    'controlador': controlador,
                    'carga': carga
                };

                return this;
            },


            manejadorRutas: function() {
                let hash = window.location.hash.substring(1) || "/";
                let destino = rutas[hash];

                if (destino && destino.plantilla) {
                    marco.innerHTML = "";
                    destino.plantilla.map(function(plantilla, i) {
                        fetch(plantilla)
                            .then((response) => response.text())
                            .then((text) => {
                                marco.innerHTML += text;
                                if (i < 1) {
                                    document.getElementById("controller").setAttribute("src", "app/controllers/" + destino.controlador + ".controller.js");
                                    setTimeout(() => {
                                        if (destino.controlador) {
                                            ctrlActual = controladores[destino.controlador];
                                        }
                                        if (typeof(destino.carga) === "function") {
                                            destino.carga();
                                        }
                                    }, 200)

                                }

                            });
                    });
                } else {
                    window.location.hash = '#/error404';
                }

                if (lob.getById("navbar").innerHTML == "" && (hash !== "/error404" || hash !== "/login")) {
                    lob.componentesPredefinidos();
                }
                if (hash == "/error404" || hash === "/login") {
                    lob.getById("navbar").innerHTML = "";
                    lob.getById("slidebar").innerHTML = "";
                    lob.getById("footer").innerHTML = "";
                }
            },
            componentesPredefinidos: function() {
                for (let vista of this.predefinido) {
                    this.useFetch(vista.ruta, vista.elemento);
                }
            }
        };

        return libreria;
    };

    if (typeof window.lob === "undefined") {
        window.lob = inicio();
        window.addEventListener("hashchange", lob.manejadorRutas, false);
    } else {
        console.log("Libreria ya definida")
    }
})(window, document);

// INICIALIZANDO LA LIBRERIA DON DATOS POR DEFECTO
(function(window, document) {
    'use strict';
    // este loader es el cargador de utilizado para mostrar mientras el usuario espera. y la peticion finaliza
    let loader = `<div id="load" class="mt-3 animated fadeIn">
                       <div id="figure">
                         <div class="elemento1"></div>
                         <div class="elemento3"></div>
                      </div>
                     <div id="text"></div>
                   </div>`;
    // son los componentes predefinidos para mostrar al usuario
    let predefinido = [{
            elemento: "navbar",
            ruta: "app/views/templates/navbar.html"
        },
        {
            elemento: "slidebar",
            ruta: "app/views/templates/slidebar.html"
        }, {
            elemento: "footer",
            ruta: "app/views/templates/footer.html"
        }
    ];
    // espera del evento load del navegador y ajuste de la libreria
    window.addEventListener("load", (e) => {

        lob.loader = loader;
        lob.predefinido = predefinido;
        lob.manejadorRutas();
    }, false);
})(window, document);

// 'use strict'
// Patron IIFE
// Patron de cadena