const express=require('express')
const getIndiaInfo=require('./utils/getIndiaInfo.js')
const getGlobalInfo=require('./utils/getGlobalInfo.js')
const path=require('path')
const hbs=require('hbs')

let mixedObj={}
let flag=false

const app=express()

const port=process.env.PORT||3000
const hashMap=new Map([
    ["Maharashtra",1],
    ["Tamil Nadu",2],
    ["Andhra Pradesh",3],
    ["Karnataka",4],
    ["Delhi",5],
    ["Uttar Pradesh",6],
    ["West Bengal",7],
    ["Bihar",8],
    ["Telangana",9],
    ["Gujarat",10],
    ["Assam",11],
    ["Rajasthan",12],
    ["Odisha",13],
    ["Haryana",14],
    ["Madhya Pradesh",15],
    ["Kerala",16],
    ["Punjab",17],
    ["Jammu and Kashmir",18],
    ["Jharkhand",19],
    ["Chhattisgarh",20],
    ["Uttarakhand",21],
    ["Goa",22],
    ["Tripura",23],
    ["Puducherry",24],
    ["Manipur",25],
    ["Himachal Pradesh",26],
    ["Nagaland",27],
    ["Arunachal Pradesh",28],
    ["Andaman and Nicobar Islands",29],
    ["Ladakh",30],
    ["Chandigarh",31],
    ["Dadra and Nagar Haveli and Daman and Diu",32],
    ["Meghalaya",33],
    ["Sikkim",34],
    ["Mizoram",35],
    ["Lakshadweep",37]
])
const hashMapGlobal=new Map([
    ["Afghanistan",0],
    ["Albania",1],
    ["Algeria",2],
    ["Andorra",3],
    ["Angola",4],
    ["Antigua and Barbuda",5],
    ["Argentina",6],
    ["Armenia",7],
    ["Australia",8],
    ["Austria",9],
    ["Azerbaijan",10],
    ["Bahamas",11],
    ["Bahrain",12],
    ["Bangladesh",13],
    ["Barbados",14],
    ["Belarus",15],
    ["Belgium",16],
    ["Belize",17],
    ["Benin",18],
    ["Bhutan",19],
    ["Bolivia",20],
    ["Bosnia and Herzegovina",21],
    ["Botswana",22],
    ["Brazil",23],
    ["Brunei Darussalam",24],
    ["Bulgaria",25],
    ["Burkina Faso",26],
    ["Burundi",27],
    ["Cambodia",28],
    ["Cameroon",29],
    ["Canada",30],
    ["Cape Verde",31],
    ["Central African Republic",32],
    ["Chad",33],
    ["Chile",34],
    ["China",35],
    ["Colombia",36],
    ["Comoros",37],
    ["Congo (Brazzaville)",38],
    ["Congo (Kinshasa)",39],
    ["Costa Rica",40],
    ["Croatia",41],
    ["Cuba",42],
    ["Cyprus",43],
    ["Czech Republic",44],
    ["Côte d'Ivoire",45],
    ["Denmark",46],
    ["Djibouti",47],
    ["Dominica",48],
    ["Dominican Republic",49],
    ["Ecuador",50],
    ["Egypt",51],
    ["El Salvador",52],
    ["Equatorial Guinea",53],
    ["Eritrea",54],
    ["Estonia",55],
    ["Ethiopia",56],
    ["Fiji",57],
    ["Finland",58],
    ["France",59],
    ["Gabon",60],
    ["Gambia",61],
    ["Georgia",62],
    ["Germany",63],
    ["Ghana",64],
    ["Greece",65],
    ["Grenada",66],
    ["Guatemala",67],
    ["Guinea",68],
    ["Guinea-Bissau",69],
    ["Guyana",70],
    ["Haiti",71],
    ["Holy See (Vatican City State)",72],
    ["Honduras",73],
    ["Hungary",74],
    ["Iceland",75],
    ["India",76],
    ["Indonesia",77],
    ["Iran",78],
    ["Iraq",79],
    ["Ireland",80],
    ["Israel",81],
    ["Italy",82],
    ["Jamaica",83],
    ["Japan",84],
    ["Jordan",85],
    ["Kazakhstan",86],
    ["Kenya",87],
    ["Korea (South)",88],
    ["Kuwait",89],
    ["Kyrgyzstan",90],
    ["Lao PDR",91],
    ["Latvia",(93-1)],
    ["Lebanon",94-1],
    ["Lesotho",95-1],
    ["Liberia",96-1],
    ["Libya",97-1],
    ["Liechtenstein",98-1],
    ["Lithuania",99-1],
    ["Luxembourg",100-1],
    ["Macedonia",101-1],
    ["Madagascar",102-1],
    ["Malawi",103-1],
    ["Malaysia",104-1],
    ["Maldives",105-1],
    ["Mali",106-1],
    ["Malta",107-1],
    ["Mauritania",108-1],
    ["Mauritius",109-1],
    ["Mexico",110-1],
    ["Moldova",111-1],
    ["Monaco",112-1],
    ["Mongolia",113-1],
    ["Montenegro",114-1],
    ["Morocco",115-1],
    ["Mozambique",116-1],
    ["Myanmar",117-1],
    ["Namibia",118-1],
    ["Nepal",119-1],
    ["Netherlands",120-1],
    ["New Zealand",121-1],
    ["Nicaragua",122-1],
    ["Niger",123-1],
    ["Nigeria",124-1],
    ["Norway",125-1],
    ["Oman",126-1],
    ["Pakistan",127-1],
    ["Palestinian Territory",128-1],
    ["Panama",129-1],
    ["Papua New Guinea",130-1],
    ["Paraguay",131-1],
    ["Peru",132-1],
    ["Philippines",133-1],
    ["Poland",134-1],
    ["Portugal",135-1],
    ["Qatar",136-1],
    ["Republic of Kosovo",137-1],
    ["Romania",138-1],
    ["Russian Federation",139-1],
    ["Rwanda",140-1],
    ["Saint Kitts and Nevis",141-1],
    ["Saint Lucia",142-1],
    ["Saint Vincent and Grenadines",143-1],
    ["San Marino",144-1],
    ["Sao Tome and Principe",145-1],
    ["Saudi Arabia",146-1],
    ["Senegal",147-1],
    ["Serbia",148-1],
    ["Seychelles",149-1],
    ["Sierra Leone",150-1],
    ["Singapore",151-1],
    ["Slovakia",152-1],
    ["Slovenia",153-1],
    ["Somalia",154-1],
    ["South Africa",155-1],
    ["South Sudan",156-1],
    ["Spain",157-1],
    ["Sri Lanka",158-1],
    ["Sudan",159-1],
    ["Suriname",160-1],
    ["Swaziland",161-1],
    ["Sweden",162-1],
    ["Switzerland",163-1],
    ["Syrian Arab Republic (Syria)",164-1],
    ["Taiwan, Republic of China",165-1],
    ["Tajikistan",166-1],
    ["Tanzania",167-1],
    ["Thailand",168-1],
    ["Timor-Leste",169-1],
    ["Togo",170-1],
    ["Trinidad and Tobago",171-1],
    ["Tunisia",172-1],
    ["Turkey",173-1],
    ["Uganda",174-1],
    ["Ukraine",175-1],
    ["United Arab Emirates",176-1],
    ["United Kingdom",177-1],
    ["United States of America",178-1],
    ["Uruguay",179-1],
    ["Uzbekistan",180-1],
    ["Venezuela (Bolivarian Republic)",181-1],
    ["Viet Nam",182-1],
    ["Western Sahara",183-1],
    ["Yemen",184-1],
    ["Zambia",185-1],
    ["Zimbabwe",186-1]

])


const pathToPublicDirectory=path.join(__dirname,'../public')
app.use(express.static(pathToPublicDirectory))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('/india',(req,res)=>{
    res.render('india',mixedObj)
})
app.get('/india-state-report',(req,res)=>
{
    const placeName=req.query.name
    const index=hashMap.get(placeName)
    if(index===undefined)
    return res.send({error:'Not Found'})
    getIndiaInfo.getIndiaStateInfo(index,(error , response)=>{
        if(error)
        return res.send(error)
        res.send(response)
    })
    
})
app.get('/india-day-wise-report',(req,res)=>
{
    const startDate=req.query.startDate
    const endDate=req.query.endDate
    getIndiaInfo.getIndiaDetailsByDate(startDate,endDate,(error,response)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(response)
        }
    })
})

app.get('/global-country-info',(req,res)=>{
    const placeName=req.query.name
    const index=hashMapGlobal.get(placeName)
    if(index===undefined)
    return res.send({error:'Not Found'})
    getGlobalInfo.getGlobalCountryInfo(index,(error , response)=>{
        if(error)
        return res.send(error)
        res.send(response)
    })
})

app.get('',(req,res)=>{
    const placeName="India"
    const index=hashMapGlobal.get(placeName)
    if(flag)
    return res.render('index',mixedObj)
    getGlobalInfo.getIndiaAndGlobalDetails(index,(error,response)=>{
        if(error)
        return res.send(error)
        mixedObj=response
        flag=true
        res.render('index',mixedObj)
    })
    
})
app.get('/global',(req,res)=>{
    res.render('global',mixedObj)
})
app.get('/about',(req,res)=>{
    res.render('about',mixedObj)
})
app.get('/help',(req,res)=>{
    res.render('help',mixedObj)
})
app.get('/about_creator',(req,res)=>{
    res.render('about_creator',mixedObj)
})
app.get('/*',(req,res)=>{
    res.send("Error: The page you are trying to access does not exist!")
})
app.listen(port,()=>
{
    console.log('Server up and running......')
})