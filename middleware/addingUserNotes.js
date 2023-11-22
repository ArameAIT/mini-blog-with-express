import fs from "node:fs/promises"
import path from "node:path"


export default async function addingUserNotes(req, res, next){
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const data = JSON.parse(jsonDataAsString)
    const usersNumber = data.users.length
    const userNotes = {
        name : `User-${usersNumber}`,
        id : req.body.id,
        children : []
    }
    data.notes.push(userNotes)
    console.log(req.data);
    const stringedData = JSON.stringify(data)
    await fs.writeFile(jsonPath, stringedData)
    next()
}