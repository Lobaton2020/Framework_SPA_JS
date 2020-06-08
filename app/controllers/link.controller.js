import { LinkService } from "../services/link.service.js";

(function(window, document) {
    "use strict"
    // Controlador de ejemplo
    // para mostrar el cargador (animacion)
    var vista = document.getElementById("vista");
    var arr = document.createElement("div");
    // opciones del la libreria de alertas
    toastr.options.progressBar = true;
    toastr.options.positionClass = "toast-bottom-right";
    var contador = 0;
    lob.controlador('link', {
        // crear
        create: async function(form) {
            console.log("Crear")
            form.childNodes[5].disabled = true;
            vista.appendChild(arr).innerHTML = lob.loader;
            arr.style.display = "block";

            let datos = {
                id: ++contador,
                title: form.childNodes[1].childNodes[3].value,
                url: form.childNodes[3].childNodes[3].value
            }

            if (await LinkService.crear(datos)) {
                toastr["success"]("Tarea registrada correctamente!");
                form.reset();
                this.listar();
            } else {
                toastr["error"]("Error. Los campos estan vacios.");
            }
            arr.style.display = "none";
            form.childNodes[5].disabled = false;

        },
        // lISTAMOS TODOS LOS LINKS QUE EXISTEN
        //------------------------------------------------------------------------------------------------------------------------------
        listar: function() {
            vista.appendChild(arr).innerHTML = lob.loader;

            let tbody = lob.getById("contenido-body"),
                template = lob.getById("fila"),
                tabla = document.querySelector("#table-content"),
                tablaVacia = document.querySelector("#table-empty"),
                fragment = document.createDocumentFragment(),
                i = 0,
                registros = LinkService.getLinks(),
                max = registros.length,
                registro, clone, id, url, acciones,
                eliminar, actualizar, link,
                self = this;

            tbody.innerHTML = "";
            for (; i < max; i++) {
                registro = registros[i];
                clone = template.content.cloneNode(true);
                id = clone.querySelector(".id");
                url = clone.querySelector(".url");
                link = clone.querySelector(".link");
                // Acciones de eliminar y actualizar
                acciones = clone.querySelector(".acciones");
                eliminar = clone.querySelector(".eliminar");
                actualizar = clone.querySelector(".actualizar");


                eliminar.dataset.id = registro.id;
                eliminar.addEventListener("click", function(e) {
                    e.preventDefault();
                    self.eliminar(e.target.dataset.id);
                }, false);
                const actualizarEvent = (e) => {
                    e.preventDefault();
                    e.target.disabled = true;
                    self.editar(e.target.dataset.id);
                    // actualizar.removeEventListener("click", actualizarEvent);

                }
                actualizar.dataset.id = registro.id;
                actualizar.addEventListener("click", actualizarEvent);

                id.textContent = registro.id;
                link.textContent = registro.title != "" ? registro.title : registro.url;
                link.href = registro.url;
                fragment.appendChild(clone);
            }
            if (max > 0) {
                tabla.style.display = "";
                tablaVacia.innerHTML = "";
                tbody.appendChild(fragment);
            } else {
                tabla.style.display = "none";
                tablaVacia.innerHTML = "En el momento no hay links.";
                tablaVacia.classList.add('text-center');
                tablaVacia.classList.add('text-muted');
                tablaVacia.classList.add('mt-3');

            }

            arr.style.display = "none";
        },
        //------------------------------------------------------------------------------------------------------------------------------
        editar: async function(id) {

            vista.appendChild(arr).innerHTML = lob.loader;
            let link = await LinkService.getLink(id),
                form = lob.getById("form-tarea"),
                self = this;
            if (link) {
                form.childNodes[1].childNodes[3].value = link.title;
                form.childNodes[3].childNodes[3].value = link.url;
                // form.childNodes[3].childNodes[3].value = link.url;
                form.childNodes[5].classList.remove("btn-primary");
                form.childNodes[5].classList.add("btn-success");
                form.childNodes[5].textContent = "Actualizar";
                form.childNodes[5].onclick = null;
                form.childNodes[5].onclick = function(e) {
                    e.target.disabled = false;
                    self.actualizar(id, form);
                };

                // const removerEvento = (e) => {
                //         e.target.disabled = false;
                //         self.actualizar(id, form);
                //     }
                // form.childNodes[5].removeEventListener("click", removerEvento);
                // form.childNodes[5].addEventListener("click", removerEvento);

            } else {
                Swal.fire(
                    "Error!",
                    "No se puede actualizar.",
                    "error"
                );
            }
            arr.style.display = "none";
        },
        //------------------------------------------------------------------------------------------------------------------------------
        actualizar: async function(id, form) {
            console.log("Actualizar")
                // const removeEvent = (e) => {
                //     console.log("Evento de boton actu")
                // }
                // lob.getById("form-tarea").addEventListener("click", removeEvent);
                // lob.getById("form-tarea").removeEventListener("click", removeEvent);
            let self = this;
            vista.appendChild(arr).innerHTML = lob.loader;
            let datos = {
                id: id,
                title: form.childNodes[1].childNodes[3].value,
                url: form.childNodes[3].childNodes[3].value
            }
            if (await LinkService.actualizar(datos)) {

                document.querySelector(`[data-id="${id}"]`).disabled = false;
                form.childNodes[5].classList.add("btn-primary");
                form.childNodes[5].classList.remove("btn-success");
                form.childNodes[5].textContent = "Guardar URL";
                form.childNodes[5].disabled = false;
                form.childNodes[5].onclick = null;
                form.childNodes[5].onclick = function() {
                    self.create(form);
                };

                // const removeEvent = (e) => {
                //     self.create(form);
                // }
                // form.childNodes[5].removeEventListener("click", removeEvent);
                // form.childNodes[5].addEventListener("click", removeEvent);

                self.listar();
                form.reset();
                Swal.fire(
                    "Bien!",
                    "Link actualizado.",
                    "success"
                );
            } else {
                Swal.fire(
                    "Error!",
                    "No se pudo Actualizar",
                    "error"
                );
            }
            arr.style.display = "none";

        },
        //------------------------------------------------------------------------------------------------------------------------------
        eliminar: async function(id) {
            var self = this;
            Swal.fire({
                    title: "¿Estas seguro?",
                    // text: "Eliminaras este registro para siempre!",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Eliminar"
                })
                .then((result) => {
                    // console.log(result.value)
                    if (result.value) {
                        if (LinkService.eliminar(id)) {
                            Swal.fire(
                                "Eliminado!",
                                "El registro ha sido eliminado.",
                                "info"
                            );
                            self.listar();
                        } else {
                            Swal.fire(
                                "Error!",
                                "El registro no se pudo eliminar.",
                                "error"
                            );
                        }
                    }
                });

        }
    });
})(window, document);