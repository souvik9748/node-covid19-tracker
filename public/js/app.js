const form=document.querySelector('form')
const form2=document.querySelector('#form2')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')
const select=document.querySelector('select')
const message3=document.querySelector('#message3')
const message4=document.querySelector('#message4')
const date=document.querySelector('#start')


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent="Fetching Data...."
    message2.textContent=""
    message3.textContent=""
    let url='/india-state-report?name='+select.value
    fetch(url).then((response)=>
    {
        console.log(response)
        response.json().then((data)=>{
            if(data.error)
            {
                message1.textContent="Error: "+data.error
                message2.textContent=""
                message3.textContent=""
            }
            else{
                message1.textContent="State: "+data.state
                message2.textContent="There are "+data.active+" active cases and "+data.confirmed+" confirmed cases as last updated on "+data.lastupdatedtime+". And number of deaths are "+data.deaths+"."
                message3.textContent=""
            }
            
        })
        
    })
})
form2.addEventListener('submit',(e)=>
{
    e.preventDefault()
    
    
    const date2=new Date(date.value)
    const date3=new Date(date2)
    date3.setDate(date2.getDate()+1)
    let startDate=""
    let endDate=""

    startDate=date2.getFullYear()+"-"
    endDate=date3.getFullYear()+"-"

    const tempEMonth=date3.getMonth()+1
    if(tempEMonth.toString().length==1)
    endDate=endDate+"0"+tempEMonth+"-"
    else
    endDate=endDate+"0"+tempEMonth+"-"
    if(date3.getDate().toString().length==1)
    endDate=endDate+"0"+date3.getDate()
    else
    endDate=endDate+date3.getDate()

    const tempSMonth=date2.getMonth()+1
    if(tempSMonth.toString().length==1)
    startDate=startDate+"0"+tempSMonth+"-"
    else
    startDate=startDate+"0"+tempSMonth+"-"
    if(date2.getDate().toString().length==1)
    startDate=startDate+"0"+date2.getDate()
    else
    startDate=startDate+date2.getDate()

    message1.textContent=""
    message2.textContent=""

    if(date3<=new Date())
    {
        let url='/india-day-wise-report?startDate='+startDate+'&endDate='+endDate
    fetch(url).then((response)=>
    {
        console.log(response)
        response.json().then((data)=>{
            if(data.error)
            {
                message3.textContent="Error: "+data.error
                message1.textContent=""
                message2.textContent=""
                message4.textContent=""
            }
            else{
                message1.textContent=""
                message2.textContent=""
                message3.textContent="Confirmed Cases: "+data.Cases
                message4.textContent="Date: "+data.Date
            }
            
        })
        
    })
    }
    else{
        message3.textContent="Give a valid date"
        message4.textContent=""
    }

    
    
    
})