export default function forHeaders(){
    return function (_req, res, next){
        res.set({
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        })
        next()
    }
}