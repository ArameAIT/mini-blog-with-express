import fs from "node:fs/promises"
import path from "node:path"

export default  async function addingUser(req, _res, next){
    const jsonPath = path.resolve("db.json")
    const jsonDataAsString = await fs.readFile(jsonPath, "utf-8")
    const jsonData = JSON.parse(jsonDataAsString)
    req.body.id = Math.floor(Math.random()*100000+1)
    jsonData.users.push(req.body)
    const stringifiedJsonData = JSON.stringify(jsonData)
    await fs.writeFile(jsonPath, stringifiedJsonData)
    next()
}