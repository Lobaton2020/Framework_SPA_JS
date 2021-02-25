const randNumberPost = (e)=>{
    e.preventDefault()
    e.target.href = "/posts/"+Math.floor(Math.random() * 100)
}