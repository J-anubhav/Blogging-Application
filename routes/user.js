const {Router} = require('express')
const user = require('../models/user')

const router = Router();


router.get('/signin', (req,res)=>{
return res.render('singnin');
} )

router.get('/signup', (req,res)=>{
return res.render('singup');
} )

router.post('/singup', async (req,res)=>{
    const {fullname, email, password} = req.body;
    await user.create({
        fullname,
        email,
        password,

    });
    return res.redirect('/');
})

module.exports =router;
