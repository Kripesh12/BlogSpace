//Global Variable

let postArray = []
let blogContainerEL = document.getElementById("blog-container")
let formEL = document.getElementById("form-el")
const titleEL = document.getElementById("title-eL")
const bodyEL = document.getElementById("body-el")
const btnEL = document.getElementById("form-submit")
// Renders the element of blogs into scren
function render() {
    let htmlContainer = ""
        for(let post of postArray){
            htmlContainer += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <br>
                <hr>
            `
        }
        blogContainerEL.innerHTML = htmlContainer //Change the inner html according to the result of htmlContainer
}

// fetches the elements of title and body form the server

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(res => res.json())
    .then(data => {
        postArray = data.slice(0 , 5)
        render() 
    })

// POST the data of the form to the server

formEL.addEventListener("submit" , function(event){
    event.preventDefault()
    //This checks whether the input field is empty or not
    if(titleEL.value == "" || bodyEL.value == "" ){         
        alert("Title or body must be filled out")
    } else{
        const blogList = {
            title: titleEL.value,
            body: bodyEL.value
        }
        console.log(blogList)
    
        //POST the data to the server
        fetch("https://apis.scrimba.com/jsonplaceholder/posts" , {
            method : "POST",
            body: JSON.stringify(blogList),
            headers : {
                "Content-Type": "application/json"
            }
        })
    
        .then(res => res.json())
        .then( post => {
            postArray.unshift(post)
            render()
            formEL.reset()
        })
    }
    


})



