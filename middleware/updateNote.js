import fs from "node:fs/promises"
import path from "node:path"

export default async function updateNote(req, res, next) {
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const data = JSON.parse(jsonDataAsString)
    const userNotes = data.notes.find((t) => t.id == req.query.API_KEY)
    const note = userNotes.children.findIndex((note) => note.id == req.query.id)
    if (note !== -1) {
        userNotes.children[note] = {
            id: userNotes.children[note].id,
            note: req.query.text
        }
        const stringedData = JSON.stringify(data)
        await fs.writeFile(jsonPath, stringedData)
        return next()
    }
    // const userNote = data.notes.filter((user) => user.userId == req.query.id)
    // const noteIndex = data.notes.findIndex((user)=> user.userId == req.query.id)
    // console.log(userNote);
    // console.log(noteIndex);
    // if (userNote) {

    //     data.notes[noteIndex] = {
    //         id: req.query.API_KEY,
    //         note: req.query.text
    //     }
    //     console.log(userNote);
    //     console.log(data);
    //     const stringedData = JSON.stringify(data)
    //     await fs.writeFile(jsonPath, stringedData)
    // return next()   
    // }
    const errorMessage = "Note with that id doesn't exists"
    res.status(404).send(errorMessage)
}