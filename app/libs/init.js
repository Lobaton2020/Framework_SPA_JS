((window, document) => {
    // Do a request por compile the css and js handler for renew a files
    document.addEventListener("DOMContentLoaded", (e) => {
        fetch(window.laurel.urlCompileAuth)
            .then(res => {

                if (res.ok) {
                    if (localStorage.getItem("refresh")) {
                        console.log("Files compiled");
                    } else {
                        localStorage.setItem("refresh", "ok")
                        window.location.reload();
                    }
                } else {
                    console.error("Files not compiled");
                };
            });
    });

})(window, document);