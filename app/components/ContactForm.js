export function ContactForm() {
    const $form = document.createElement("form"),
        $styles = document.querySelector("#dynamic-styles");
    $styles.innerHTML = `html {
            box-sizing: border-box;
            font-family: sans-serif;
            font-size: 16px;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          /* **********     ContactForm Validations     ********** */
          .contact-form {
            --form-ok-color: #4caf50;
            --form-error-color: #f44336;
            margin-left: auto;
            margin-right: auto;
            width: 4    0%;
          }

          .contact-form>* {
            padding: 0.5rem;
            margin: 1rem auto;
            display: block;
            width: 50%;
          }

          .contact-form textarea {
            resize: none;
          }

          .contact-form legend,
          .contact-form-response {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
          }

          .contact-form input,
          .contact-form textarea {
            font-size: 1rem;
            font-family: sans-serif;
          }

          .contact-form input[type="submit"] {
            width: 50%;
            font-weight: bold;
            cursor: pointer;
          }

          .contact-form *::placeholder {
            color: #000;
          }

          .contact-form [required]:valid {
            border: thin solid var(--form-ok-color);
          }

          .contact-form [required]:invalid {
            border: thin solid var(--form-error-color);
          }

          .contact-form-error {
            margin-top: -1rem;
            font-size: 80%;
            background-color: var(--form-error-color);
            color: #fff;
            transition: all 800ms ease;
          }

          .contact-form-error.is-active {
            display: block;
            animation: show-message 1s 1 normal 0s ease-out both;
          }

          .contact-form-loader {
            text-align: center;
          }

          .none {
            display: none;
          }

          @keyframes show-message {
            0% {
              visibility: hidden;
              opacity: 0;
            }

            100% {
              visibility: visible;
              opacity: 1;
            }
          }`
    $form.classList.add("contact-form");

    $form.innerHTML = `
        <legend>Envíanos tus comentarios</legend>
        <input type="text" name="Nombre" placeholder="Escribe tu nombre"
        title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" required>
        <input type="email" name="Correo" placeholder="Escribe tu email" title="Email incorrecto"
        pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required>
        <input type="text" name="Tema" placeholder="Asunto a tratar" title="El Asunto es requerido" required>
        <textarea name="Comentario" cols="50" rows="5" placeholder="Escribe tus comentarios"
        title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
        <input type="submit" value="Enviar">
        <div class="contact-form-loader none">
        <img src="assets/loader.svg" alt="Cargando">
        </div>
        <div class="contact-form-response none">
        <p>Los datos han sido enviados</p>
        </div>
    `
    $form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        data.append("_template", "table")
        data.append("Click aqui", "http://127.0.0.1:5500/#/the-core-web-vitals-hype-train")
        fetch("https://formsubmit.co/ajax/andrespipe021028@gmail.com", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                e.target.reset()
            })
            .catch(res => alert(res))
    })
    return $form
}