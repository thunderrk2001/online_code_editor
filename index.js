const path = require('path')
const port = 2000
const cpp = require("./lib/cpp.js")
const iL = require('./lib/interpretedLang.js')
const { createUnique } = require("./lib/randomString.js")
const express = require("express");
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json({ limit: "50mb", }))
app.use(express.static(path.join(__dirname, "client")));
app.set("view-engine", 'ejs')
app.set("views", path.join(__dirname, "client"))
app.use(express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: "50000"
}));
app.post("/c_cpp", async(req, res) => {
    const code = req.body.code
    const input = req.body.input
    try {
        const name = createUnique()
        const compile = await cpp.writeCode(code)
        const execCode = await compile(name)
        const data = await execCode(name, input);
        res.send({ "ERROR": null, "OUTPUT": data })
    } catch (e) {
        res.send({ "ERROR": e.toString() })
    }
})
app.post("/java", async(req, res) => {
    const code = req.body.code
    let input = ""
    input = req.body.input
    try {
        const writeCode = iL.setInterpretedLang('java', 'java')
        const runJavaInTime = await writeCode(code)
        const data = await runJavaInTime(input)
        res.send({ "ERROR": null, "OUTPUT": data })
    } catch (e) {
        res.send({ "ERROR": e.toString() })
    }
})
app.post("/python", async(req, res) => {
    const code = req.body.code
    let input = ""
    input = req.body.input
    try {
        const writeCode = iL.setInterpretedLang('python', 'py')
        const runPyInTime = await writeCode(code)
        const data = await runPyInTime(input)
        res.send({ "ERROR": null, "OUTPUT": data })
    } catch (e) {
        res.send({ "ERROR": e.toString() })
    }
})
app.get("/", (req, res) => {
    res.render("editor.ejs")
})

app.listen(port, (e) => {
    if (!e)
        console.log(`Listening at ${port}..`);
})