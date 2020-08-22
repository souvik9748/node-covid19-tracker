const request=require('request')

const getGlobalCountryInfo=(index,callback)=>
{
    const url='https://api.covid19api.com/summary'
    request({url:url,json:true},(error, response)=>{
        if(error)
        {
            callback({error:'Could Not Connect'},undefined)
        }
        else
        {
            callback(undefined,response.body.Countries[index])
        }
    })
}

const getIndiaAndGlobalDetails=(index,callback)=>{
    const url='https://api.covid19api.com/summary'
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback({error:'Could Not Connect'},undefined)
        }
        else if(response.body.length===0)
        {
            callback({error:'No Data Found'},undefined)
        }
        else
        {
            const global=response.body.Global
            const india=response.body.Countries[index]
            callback(undefined,{
                global:global,
                india:india
            })
        }
    })
}
module.exports={getGlobalCountryInfo,getIndiaAndGlobalDetails}
