const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//  console.log(__dirname)
//  console.log(__filename)
//  console.log(path.join(__dirname,'../public'))



const app = express()
const publicDirectoryPath=path.join(__dirname,'../public')

const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index' ,{
        name:'karan',
        title:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About her',
        name:'Andrew Mead'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'help',
        name:'karan kumar sharma'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address term'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address

            })
        })
    })


    // res.send({
    //         forecast:'It is raining ',
    //         location:'Mysore',
    //         address:req.query.address
    // })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            errror:'You provide a search term'
        })
    }else{
    
    console.log(req.query)
    res.send({
        products: []
    })
    }


})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'kks',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'kks',
        errorMessage:'page not found'
    })

})






app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})