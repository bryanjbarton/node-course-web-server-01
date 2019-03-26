console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')


messageOne.textContent = 'From Javascript'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

const location = search.value
messageOne.textContent = 'Loading...'
messageTwo.textContent = ''


messageTwo.textContent = ''

fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data) => {
        console.log(data)
        if(data.error){
             messageOne.textContent = 'Unable to find location. Please try again.'
           return messageTwo.textContent = ''

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})  

})