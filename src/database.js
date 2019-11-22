const mongoose =require ("mongoose");
// aqui le mandas la direccion de la base de datos
const {mongodb}= require ('./keys');



mongoose.connect(mongodb.URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(db=> console.log("La base de datos se ha conectado "))
    .catch(err=> console.error(err));
