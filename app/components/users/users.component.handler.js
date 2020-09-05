 const renderUsers = (data) => {
     let tbody = document.querySelector("#tbody"),
         template = document.querySelector("#template"),
         fragment = document.createDocumentFragment(),
         clon;
     tbody.innerHTML = "";
     data.data.forEach((register, i) => {
         let { iduser, name, lastname, email, nickname, rol, status, create_date } = register;
         clon = template.content.cloneNode(true);
         clon.querySelector(".id").textContent = iduser;
         clon.querySelector(".name").textContent = `${name} ${lastname}`;
         clon.querySelector(".email").textContent = email;
         clon.querySelector(".nickname").textContent = nickname;
         clon.querySelector(".rol").textContent = rol.name;
         clon.querySelector(".status").textContent = status;
         clon.querySelector(".create_date").textContent = create_date;

         fragment.appendChild(clon);
     });
     tbody.appendChild(fragment);
 };