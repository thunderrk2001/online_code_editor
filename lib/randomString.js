function createUnique() {
    let string = ""
    for (let i = 0; i < 10; i++)
        string = string + String.fromCharCode(Math.floor(65 + 26 * Math.random()))
    string = './' + string
    return string;
}
module.exports = { createUnique }