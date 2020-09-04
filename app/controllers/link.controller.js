import { LinkService } from "../services/link.service.js";

(function(window, document) {
    "use strict"
    document.addEventListener("DOMContentLoaded", (e) => {
        let contador = 0;
        window.laurel.controller('link', {
            create: async function(form) {
                try {
                    form.button.disabled = true;
                    laurel.renderLoader(true);
                    let datos = {
                        id: ++contador,
                        title: form.title.value,
                        url: form.url.value
                    };

                    if (await LinkService.create(datos)) {
                        laurel.toastr("success", "Tarea registrada correctamente!");
                        form.reset();
                        this.list();
                    } else {
                        laurel.toastr("error", "Error. Los campos estan vacios.");
                    }
                    form.button.disabled = false;
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            },
            list: async function() {
                try {
                    laurel.renderLoader(true);
                    renderLinks(await LinkService.getLinks());
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            },
            edit: async function(id) {
                try {
                    laurel.renderLoader(true);
                    let link = await LinkService.getLink(id);
                    if (link) {
                        editLink(link, id);
                    } else {
                        Swal.fire(
                            "Error!",
                            "No se puede actualizar.",
                            "error"
                        );
                    }
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            },
            update: async function(form) {
                try {

                    laurel.renderLoader(true);
                    let data = {
                        id: form.idform.value,
                        title: form.title.value,
                        url: form.url.value
                    }
                    if (await LinkService.update(data)) {
                        form.idform.value = "";
                        form.button.classList.add("btn-primary");
                        form.button.classList.remove("btn-success");
                        form.button.textContent = "Guardar URL";
                        form.button.disabled = false;
                        this.list();
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
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            },
            delete: async function(id) {
                try {
                    laurel.renderLoader(true);
                    let self = this;
                    Swal.fire({
                            title: "¿Estas seguro?",
                            text: "Eliminaras este registro para siempre!",
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: "Eliminar"
                        })
                        .then(async(result) => {
                            if (result.value) {
                                if (await LinkService.delete(id)) {
                                    Swal.fire(
                                        "Eliminado!",
                                        "El registro ha sido eliminado.",
                                        "info"
                                    );
                                    self.list();
                                } else {
                                    Swal.fire(
                                        "Error!",
                                        "El registro no se pudo eliminar.",
                                        "error"
                                    );
                                }
                            }
                        });
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            }

        });
    });
})(window, document);