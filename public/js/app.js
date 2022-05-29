//const { response } = require("express")

//console.log("client side javascript is loaded")


// fetch('http://puzzle.mead.io/puzzle').then((reponse)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast


        }

    })
})

})