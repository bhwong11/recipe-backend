const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const data = require('./models/data.json');

app.use(cors());
app.use(express.json());


app.get('/recipes',(req,res)=>{
    return res.status(200).json({
        status:200,
        recipeNames:data.recipes.map((e)=>e.name),
    })
})

app.get('/recipes/details/:id',(req,res)=>{
    const recipeName = req.params.id
    const recipeArray = data.recipes.filter((e)=>e.name===recipeName)
    if(recipeArray.length===0){
        return res.status(200).json({
            status:200,
        })
    }
    const recipe = recipeArray[0]
    const details = {
        ingredients:recipe.ingredients,
        numSteps:recipe.instructions.length,
    }
    return res.status(200).json({
        status:200,
        details,
    })
})

app.post('/recipes',(req,res)=>{
    if(data.recipes.filter((e)=>e.name===req.body.name).length){
        return res.status(400).json({
            error:'Recipe already Exist'
        })
    }
    data.recipes.push(req.body)
    return res.status(201).json({
        status:201
    })
})

app.put('/recipes',(req,res)=>{
    let recipeName = req.body.name
    let index = data.recipes.findIndex(e=>e.name===recipeName)
    console.log('INDEX',index)
    if(index === -1){
        return res.status(404).json({
            error: "Recipe does not exist"
        })
    }
    data.recipes[index]=req.body
    return res.status(204).json({
        status:204
    })

})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})