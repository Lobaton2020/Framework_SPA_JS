
// init -- This script is magic pure
let original = history.pushState
history.pushState = function () {
    let $return = original.apply(this, arguments)
    let event = new Event("historychange")
    event.arguments = arguments
    window.dispatchEvent(event)
    return $return;
}
history.push = function (route) {
    let url = window.location.origin + route;
    window.history.pushState({}, "", url)
}
window.addEvent = (events) => {
    events.forEach(({ el, event: $event, callback }) => {
        try {
            document.querySelector(el).addEventListener($event, (e) => callback(e))
        } catch (err) {
            console.error(err)
        }
    })
}
// end

addEvent([
    {
        el: "#sell",
        event: "click",
        callback: (e) => {
            history.push("/ventas")
        }
    },
    {
        el: "#business",
        event: "click",
        callback: (e) => {
            history.push("/negocios")
        }
    },
    {
        el: "#help",
        event: "click",
        callback: (e) => {
            history.push("/ayuda")
        }
    }
])

window.addEventListener("hashchange", Router)
window.addEventListener("popstate", Router)
window.addEventListener("historychange", Router)