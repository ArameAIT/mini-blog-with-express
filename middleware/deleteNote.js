import fs from "node:fs/promises"
import path from "node:path"



export default async function deleteUser(req, res, next) {
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const data = JSON.parse(jsonDataAsString)
    const userNotes = data.notes.find((t) => t.id == req.query.API_KEY)
    const note = userNotes.children.findIndex((t) => t.id == req.query.id)
    if (note !== -1) {
        userNotes.children.splice(+note, 1)
        const stringedData = JSON.stringify(data)
        await fs.writeFile(jsonPath, stringedData)
        return next()
    }
    const errorMessage = "Note with that id is not founded"
    res.status(404).send(errorMessage)
}