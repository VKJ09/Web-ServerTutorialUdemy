console.log ("Server side script is called")



const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const myMsg1 = document.querySelector('#msg1')
const myMsg2 = document.querySelector('#msg2')


//console.log(weatherForm.value)
weatherForm.addEventListener('submit',(e) =>{
    //document.querySelector("testing");



    myMsg2.textContent = 'Loading...'
    e.preventDefault()
    const location = search.value
    const url = "http://localhost:3000/weather?address="+location
    fetch (url).then((resp) => {
        resp.json().then((data)=>
        {
           if (data.Error) {
               myMsg1.textContent = data.Error
                myMsg2.textContent = ""
            }
            else {
                myMsg1.textContent = data.location
                myMsg2.textContent = data.Forecast
            }
        
        })
    })
    



})



// const place = document.querySelector("input")
// console.log(place.value)