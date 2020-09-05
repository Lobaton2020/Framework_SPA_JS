import UserService from "../../services/user.service.js";
(function(window, document) {
    "use strict"
    document.addEventListener("DOMContentLoaded", (e) => {
        window.laurel.controller('user', {
            create: async function(form) {
                try {
                    // 
                } catch (err) {
                    console.error(err)
                }
            },
            list: async function() {
                try {
                    laurel.renderLoader(true);
                    let res = await UserService.list();
                    if (res.status == 200) {
                        renderUsers(res);
                    }
                    laurel.renderLoader(false);
                } catch (err) {
                    console.error(err)
                }
            }
        });
    });
})(window, document);