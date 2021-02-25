export async function ajax(props) {
    let { url, success } = props;
    await fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => success(json))
        .catch(err => {
            let message = err.statusText || "Ocurrio un error al acceder a la API",
                status = err.status || "Codigo Desconocido",
                main = document.querySelector("#main")
            main.className = ""
            posts.innerHTML = `<div class="error"> <h1>Error! ${status}</h1><p>${message}</p></div>`
            console.log(err)
        })
}

export async function lbon({ url, error, success, method, data_a }) {
    const id = setInterval(() => {
        console.log("Loading...")
    }, 500);
    try {
        const options = {
            "method": method || "GET"
        };
        if (data_a) options.body = data_a
        const res = await fetch(url, options)
        if (!res.ok) throw `Error : ${res.status}!\nEl API '${url}' no responde.`
        const data = await res.json()
        success ? success(data, res) : console.error("Method <<success>> not declarated");
        clearInterval(id)
    } catch (err) {
        clearInterval(id)
        error ? error(err) : console.error("Method <<error>> not declarated");
    }

}