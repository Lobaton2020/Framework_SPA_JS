import DashBoard from './views/Dashboard.js'
import Setting from './views/Setting.js'
import Post from './views/Post.js'
import ViewPost from './views/ViewPost.js'

const navigateTo = url =>{
    history.pushState(null,null,url)
    router()
}

const getParams = match =>{
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])
    return Object.fromEntries(keys.map((key,i)=>{
        return [key,values[i]]
    }))
}

const pathToRegex = (path)=> new RegExp("^"+path.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)") + "$")

const router = async ()=>{
    const routes = [
        { path:"/",view: DashBoard },
        { path:"/posts",view : Post },
        { path:"/posts/:id",view : ViewPost },
        { path:"/settings",view : Setting }
    ]
    
    const potentialMatches  = routes.map( route =>{
        return {
            route :route,
            result: location.pathname.match(pathToRegex(route.path))
        }        
    })
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)
    if(!match){
        match = {
            route: routes.find(({ path }) => path == "/") || routes[0],
            result: [location.pathname]
        }
    }
   const view =  new match.route.view(getParams(match))
   document.querySelector("#root").innerHTML = await view.render()
}
window.addEventListener("popstate",()=>router())
document.addEventListener("DOMContentLoaded",()=>{
    document.body.addEventListener("click",(e)=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})