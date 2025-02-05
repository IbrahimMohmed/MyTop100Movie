const User = require('../model/user');


const addToMyListController = async(req,res)=>{
    
    const cookies = req.cookies;
    const movie = req.body;
    console.log({movie})
    if(!cookies && !cookies.jwt)
    {
        return res.sendStatus(401);
    }

    let refeshToken = cookies.jwt;
    await User.findOne({refreshTokenSecret:refeshToken}).then((user)=>{
        
        if(!user){
            res.setStatus(404);
        }
        console.log('1',{movie})
        user.myList.push(movie);
        user.save();
    })

    try{
        res.sendStatus(200);

    }
    catch(e)
    {
        res.sendStatus(500);
    }

}

module.exports = addToMyListController;