const { spawn } = require("child_process")
const { write } = require("./serverFilesManipulator.js")
const setTimeLimit = require('./timelimit.js')
let lang = '';
let extension = '';

function setInterpretedLang(name, ext) {
    lang = name;
    extension = ext;
    return writeCode;
}
async function writeCode(code) {
    return new Promise(function(resolve, reject) {
        try {
            write(`index.${extension}`, code)
            resolve(runInTime)
        } catch (e) {
            reject(e)
        }
    });
}
async function runInTime(input) {
    return new Promise(async function(resolve, reject) {
        try {
            const result = await Promise.race([run(input), setTimeLimit(10000)])
            resolve(result)
        } catch (e) {
            reject(e)
        }

    });
}

async function run(input) {
    return new Promise(function(resolve, reject) {
        const child = spawn(lang, [`index.${extension}`])
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
module.exports = { setInterpretedLang }