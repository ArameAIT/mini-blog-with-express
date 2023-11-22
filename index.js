import express from "express"
import forHeaders from "./middleware/headers.js"
import getData from "./middleware/getData.js"
import isUserExists from "./middleware/isUserExists.js"
import isPasswordtrue from "./middleware/isPasswordtrue.js"
import addingUser from "./middleware/AddingUser.js"
import isApiKeyWrited from "./middleware/isApiKeyWrited.js"
import isThereANote from "./middleware/isThereANote.js"
import addingNote from "./middleware/addingNote.js"
import getUserNotes from "./middleware/getUserNotes.js"
import isQueryHasAProblem from "./middleware/isQueryHasAProblem.js"
import updateNote from "./middleware/updateNote.js"
import addingUserNotes from "./middleware/addingUserNotes.js"
import deleteUser from "./middleware/deleteNote.js"

const app = express()
const PORT = 4000

app.use(express.json())
app.use(forHeaders())
app.use(getData)


app.get("/user", (req, res) => {
    res.send(req.data.users)
})

app.post("/register",
    isUserExists("register"),
    addingUser,
    addingUserNotes,
    (req, res) => {
        res.status(201).send(`User added succesfully, this is your API_KEY=${req.body.id}`)
    }
)

app.get("/notes", (req, res) => {
    res.send(req.data.notes)
})

app.get(
    "/usernotes",
    isApiKeyWrited,
    getUserNotes,
    (req, res) => {
        res.send(req.userNotes)
    }
)

app.put(
    "/putnote",
    isQueryHasAProblem,
    updateNote,
    (req, res) => {
        res.send("Note changed or updated succesfully")
    }
)

app.delete(
    "/deletenote",
    deleteUser,
    (req, res) => {
        res.send("Note deleted succesfully")
    }
)



app.post(
    "/addnote",
    isThereANote,
    isApiKeyWrited,
    addingNote,
    (req, res) => {
        res.send("Note added succesfully")
    }
)

app.post(
    "/login",
    isApiKeyWrited,
    isUserExists("login"),
    isPasswordtrue,
    (req, res) => {
        res.send("User logined succesfully")
    }
)

app.listen(PORT, () => {
    console.log(`Server is listening in port ${PORT}`);
})