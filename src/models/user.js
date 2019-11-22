const mongoose =require("mongoose");
const bcrypt=require("bcrypt-nodejs")
const {Schema}=mongoose;
// esta es la estructura que tienen nuestros usuarios 
const userSchema= new Schema({
    email: String,
    password: String

});
//esto es para encriptar la contrasena y no se vea desde consola

userSchema.methods.encryptPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};
// aqui se compara la contrasena que mete con la que esta en la base
userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);

};

// aqui se le indica que al ingresar al usuario se va a guardar en la coleccion users de mongodb

module.exports= mongoose.model('users',userSchema);