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
function deleteFile(fileName)
{
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      fs.unlink(fileName+'.exe',(e)=>{
        if(e)
        reject(e)
        resolve(true)
      })
    },100)

  });
}
module.exports={write,read,deleteFile}
