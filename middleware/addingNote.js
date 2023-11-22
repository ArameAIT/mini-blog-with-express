import fs from 'node:fs/promises'
import path from 'node:path'

export default async function addingNote(req, res, next) {
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const data = JSON.parse(jsonDataAsString)
    // console.log(data.notes, "/notes");
    const userNote = data.notes.find((note) => note.id == req.query.API_KEY)
    // console.log(userNote, "userNote");
    // console.log(userNote[0].children.lenght);
    const note = {
        id: userNote.children.length + 1,
        note: req.query.note
    }
    userNote.children.push(note)
    const stringedData = JSON.stringify(data)
    await fs.writeFile(jsonPath, stringedData)
    next()
}