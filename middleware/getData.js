import fs from "node:fs/promises"
import path from "node:path"

export default async function getData(req, _res, next){
    const dataPath = path.resolve("db.json")
    const dataAsString = await fs.readFile(dataPath, "utf-8")
    const data = JSON.parse(dataAsString)
    req.data = data
    next()
}