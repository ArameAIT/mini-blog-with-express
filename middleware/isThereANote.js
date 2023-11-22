export default function isThereANote(req, res, next){
    if(req.query.note){
        return next()
    }
    const errorMessage = "Note is requaired"
    res.status(404).send(errorMessage)
}