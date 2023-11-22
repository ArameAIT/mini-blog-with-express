export default function isPasswordtrue(req, res, next){
    const user = req.data.users.find((user)=> user.email == req.body.email)
    if(user.password == req.body.password){
        return next()
    }
    const errorMessage = "Wrong password or email"
    res.status(404).send(errorMessage)
} 