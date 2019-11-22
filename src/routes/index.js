const express=require ("express");
const router=express.Router();
const passport=require ("passport"); 
router.get ("/", (req,res,next)=>{
    res.render('index');
});

// las rutas para registrarse 

router.get ("/signup",(req,res,next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
//aqui se indica que se desea hacer en caso si el usuario existe o no o si mete bien sus datos 
    successRedirect:('/perfil'),
    failureRedirect:('/signup'),
    passReqToCallback:true
}));

router.get ("/signin",(req,res,next)=>{
    res.render('signin')
});

router.post ("/signin", passport.authenticate('local-signin',{
    successRedirect:'/perfil',
    failureRedirect: '/signin',
    passReqToCallback:true
}));
router.get('/logout',(req,res,next)=>{
    req.logOut();
    // aqui le indica adonde va a ir al salirse de la sesion 
    res.redirect('/signin');
});
// lo que va a ver el usuario cuando se registre adentro poner la pagina principal
router.get("/perfil",isAuthenticated,(req,res,next)=>{
    res.render("perfil");
});

function isAuthenticated (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signup');
}

module.exports= router;