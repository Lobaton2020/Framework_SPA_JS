export default {
    validateStatusResponse: function(result) {
        let error = "";
        result = result.trim();
        error = result == 'invalidemail' ? 'El correo de usuario es invalido' : error;
        error = result == 'imagenotfound' ? 'Selecciona una imagen' : error;
        error = result == 'notvalidatecellphone' ? 'Telefono invalido' : error;
        error = result == 'invalidcellphone' ? 'Tu numero celular es muy largo' : error;
        error = result == 'imagenotsaved' ? 'El servidor no pudo almacenar la imagen' : error;
        error = result == 'invalidpassword' ? 'La contraseña no es valida' : error;
        error = result == 'alreadyexistregister' ? 'El registro ya existe' : error;
        error = result == 'fieldempty' ? 'Debes llenar los campos requerido' : error;
        error = result == 'notregistered' ? 'Error al registrar' : error;
        error = result == 'notexistsregister' ? 'El usuario no existe' : error;
        error = result == 'notupdated' ? 'Error al actializar' : error;
        error = error == "" ? "Error desconocido." : error;
        return error;

    },
    // Mensaje de cargando
    loader: `<div id="load" class="mt-3 animated fadeIn">
                <div id="figure">
                   <div class="elemento1"></div>
                   <div class="elemento2"></div>
                </div>
                <div id="text"></div>
            </div>`,
    // son los componentes predefinidos para mostrar al usuario
    defaultComponents: [{
            element: "navbar",
            route: "app/components/layouts/navbar/navbar.component.html"
        },
        {
            element: "slidebar",
            route: "app/components/layouts/sidebar/sidebar.component.html"
        }
        // ,
        // {
        //     element: "footer",
        //     route: "app/components/layouts/footer.html"
        // }
    ],
    urlLaurel: location.origin.concat(location.pathname),
    urlApi: "",
    tagDefault: "app",
    tagDefaultView: "default-view",
    templateLogin: "app/views/auth/login.html",
    tagLoader: "loading",
    credentialsUrl: "auth/see",
    controllerInitCredentials: "user",
    redirectBadCredentials: "#/auth/logiaan",
    redirectRouteNotFound: "#/auth/lo9888gin"

};