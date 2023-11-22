export default function isApiKeyWrited(req, res, next){
    const user = req.data.users.find((user)=> user.email == req.body.email)
    if(req.query.API_KEY == user.id){

        next()
        return
    }
    const errorMessage = "API_KEYs is not the same"
    res.status(404).send(errorMessage)
}