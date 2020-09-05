const handlerLink = (e) => {
    e.preventDefault();
    if (e.target.idform.value != "") {
        laurel.getController().update(e.currentTarget);
    } else {
        laurel.getController().create(e.currentTarget);
    }
};
// render list
const handlerListEditLink = (e) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    laurel.getController().edit(e.currentTarget.dataset.id);

}
const handlerListDeleteLink = (e) => {
    e.preventDefault();
    laurel.getController().delete(e.currentTarget.dataset.id);
};


const renderLinks = (data) => {

    let tbody = document.querySelector("#contenido-body"),
        template = document.querySelector("#fila"),
        tabla = document.querySelector("#table-content"),
        tablaVacia = document.querySelector("#table-empty"),
        fragment = document.createDocumentFragment(),
        i = 0,
        registros = data,
        max = registros.length,
        registro, clone, id, url, acciones,
        eliminar, actualizar, link;

    tbody.innerHTML = "";
    for (; i < max; i++) {
        registro = registros[i];
        clone = template.content.cloneNode(true);
        id = clone.querySelector(".id");
        url = clone.querySelector(".url");
        link = clone.querySelector(".link");

        acciones = clone.querySelector(".acciones");
        eliminar = clone.querySelector(".eliminar");
        actualizar = clone.querySelector(".actualizar");


        actualizar.dataset.id = registro.id;
        actualizar.addEventListener("click", handlerListEditLink, false);
        eliminar.dataset.id = registro.id;
        eliminar.addEventListener("click", handlerListDeleteLink, false);

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

};
// update link
const editLink = (data) => {
    let form = document.querySelector("#form-tarea");
    form.idform.value = data.id;
    form.title.value = data.title;
    form.url.value = data.url;
    form.button.classList.remove("btn-primary");
    form.button.classList.add("btn-success");
    form.button.textContent = "Actualizar";
};