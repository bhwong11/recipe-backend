const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    return res.send('hello')
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})