const passport= require("passport");
const localStategy=require("passport-local").Strategy;
// aqui jalo de models la plantilla de usuario 
const User=require('../models/user');
//serializa los datos
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
//deserealiza los datos
passport.deserializeUser(async (id,done)=>{
    const user= await User.findById(id);
    done(null,user);
});
passport.use('local-signup', new localStategy({
    //aqui va lo que va a recibir el sistema del cliente 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
},async (req,email,password,done)=>{
    // aqui viene lo de la base de datos

    //ver si esxiste un correo como el que se esta ingresando 
    const user=await User.findOne({email: email});
    if(user){
        return done(null,false,req.flash('signupMessage','El correo ya existe'));
    } else {
    const newUser= new User();
    newUser.email=email;
    newUser.password=newUser.encryptPassword(password);
    //aqui se le indica que cuando termine de guardarlo continue con la siguiente linea 
    await newUser.save();
    // aqui vamos a devolver el user nuevo 
    done(null,newUser)
    }
    

}));

passport.use('local-signin', new localStategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
}, async (req, email, password, done)=>{
    const user= await User.findOne({email: email});
    if(!user){
        return done(null,false,req.flash('signinMessage','El usuario no existe'));
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage','La contrasena es incorrecta'));
    }
    done(null,user);
}));