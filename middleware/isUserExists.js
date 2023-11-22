import { z } from "zod";

export default function isUserExists(pathname) {
    return function (req, res, next) {
        let errorMeesege = ""
        if (req.body.name && req.body.email && req.body.password) {
            const user = req.data.users.find((user) => user.email == req.body.email)
            const userInputSchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.number().min(8),
            });
            const inputData = userInputSchema.safeParse(req.body);
            if (inputData.error) {
                inputData.error.issues.map((messege) => {
                    return errorMeesege += ", " + messege.message
                })
                res.status(401).send(errorMeesege)
            }
            if (pathname == "register") {
                if (user) {
                    errorMeesege = "User with that email is already exists"
                    res.status(401).send(errorMeesege)
                    return
                }
                return next()

            }else if(pathname == "login"){
                if(user){
                    return next()
                }
                errorMeesege = "There is no user like these details, register first"
                res.status(401).send(errorMeesege)
                return
            }
            else {
                errorMeesege = "You doesnt have a user, register first"
                res.status(401).send(errorMeesege)
                return
            }
            return
        }
        errorMeesege = "name, email and password are requaired"
        res.status(401).send(errorMeesege)
    }
}