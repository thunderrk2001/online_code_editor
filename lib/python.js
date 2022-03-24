const { exec, spawn } = require("child_process")
const { write, read, deleteFile } = require("./serverFilesManipulator.js")
const setTimeLimit = require('./timelimit.js')
async function writeCode(code) {
    return new Promise(function(resolve, reject) {
        try {
            write("index.py", code)
            resolve(runPyInTime)
        } catch (e) {
            reject(e)
        }
    });
}
async function runPyInTime(input) {
    return new Promise(async function(resolve, reject) {
        try {
            const result = await Promise.race([runPy(input), setTimeLimit(10000)])
            resolve(result)
        } catch (e) {
            reject(e)
        }

    });
}

async function runPy(input) {
    return new Promise(function(resolve, reject) {
        const child = spawn('python', ['index.py'])
        child.stdin.write(input)
        child.stdin.end()
        let output = ""
        child.stdout.on('data', (data) => {
            output = output + data.toString()
        })
        child.stderr.on("data", (error) => {
            child.kill('SIGINT')
            reject(error.toString())
        })
        child.on('exit', (code) => {
            resolve(output)
        })
    });
}
module.exports = { writeCode }