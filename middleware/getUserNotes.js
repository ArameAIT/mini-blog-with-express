import fs from "node:fs/promises"
import path from "node:path"
export default async function getUserNotes(req, res, next){
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const jsonData = JSON.parse(jsonDataAsString)
    const userNotes = jsonData.notes.filter((notes)=>{
        return notes.id == req.query.API_KEY
    })
    req.userNotes = userNotes
    next()
}