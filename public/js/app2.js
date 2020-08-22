const form=document.querySelector('form')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')
const select=document.querySelector('select')



form.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent="Fetching Data...."
    message2.textContent=""
    let url='/global-country-info?name='+select.value
    fetch(url).then((response)=>
    {
        console.log(response)
        response.json().then((data)=>{
            if(data.error)
            {
                message1.textContent="Error: "+data.error
                message2.textContent=""
                
            }
            else{
                message1.textContent="Country: "+data.Country
                message2.textContent="There are "+data.TotalConfirmed+" total confirmed cases and "+data.NewConfirmed+" new confirmed cases as last updated on "+data.Date+". Total number of deaths are "+data.TotalDeaths+" and total "+data.TotalRecovered+" people recovered successfully."
        
            }
            
        })
        
    })
})