const { exec, spawn } = require("child_process")
exec('g++ -o a index.cpp', (e2, r2, stderr2) => {
    console.log(e2)
    console.log(r2)
    console.log(stderr2)
    return
    exec('a.exe <' + 'input.txt', (e, stdout, stderr) => {
        console.log(e)
        console.log(r)
        console.log(std)
    })
})