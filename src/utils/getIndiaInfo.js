const request=require('request')

const getIndiaStateInfo=(index,callback)=>
{
    const url='https://api.covid19india.org/data.json'
    request({url:url,json:true},(error, response)=>{
        if(error)
        {
            callback({error:'Could Not Connect'},undefined)
        }
        else
        {
            callback(undefined,response.body.statewise[index])
        }
    })
}

const getIndiaDetailsByDate=(startDate,endDate,callback)=>{
    const url='https://api.covid19api.com/country/india/status/confirmed?from='+startDate+'T00:00:00Z&to='+endDate+'T00:00:00Z'
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
            callback(undefined,response.body[0])
        }
    })
}
module.exports={getIndiaStateInfo,getIndiaDetailsByDate}
