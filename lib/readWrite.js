const fs=require("fs")
function write(filename,content) {
  return new Promise((resolve,reject)=>{
    try {
      fs.writeFileSync(filename,content,"utf-8")
      resolve(true)
    } catch (e) {
      reject(e)
    }
  })
}
function read(filename) {
  return fs.readFileSync(filename,"utf-8")
}
module.exports={write,read}
