export default function isQueryHasAProblem(req, res, next){
    let errorMessage = ""
    if(req.query.id && req.query.API_KEY && req.query.text){
        const user = req.data.users.find((user)=> user.id == req.query.API_KEY)
        if(user){
            return next()
        }
        errorMessage = "User with that API_KEY havent found"
        res.status(404).send(errorMessage)
        return
    }
    errorMessage = "ID, text and API_KEY is requaired"
    res.status(404).send(errorMessage)
}