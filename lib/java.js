const {exec,spawn}=require("child_process")
const {write,read,deleteFile}=require("./serverFilesManipulator.js")
const setTimeLimit=require('./timelimit.js')
async function writeCode(code)
{return new Promise(function(resolve, reject) {
  try {
    write("index.java",code)
    resolve(runJavaInTime)
  } catch (e) {
    reject(e)
  }
});
}
async function runJavaInTime(input)
{
return new Promise(async function(resolve, reject) {
  try {
    const result=await Promise.race([runJava(input),setTimeLimit(7000)])
    resolve(result)
  } catch (e) {
    reject(e)
  }

});
}

async function runJava(input){
  return new Promise(function(resolve, reject) {
    const child=spawn('java',['index.java'])
    child.stdin.write(input)
    child.stdin.end()
    let output=""
    child.stdout.on('data',(data)=>{
      output=output+data.toString()
    })
    child.stderr.on("data",(error)=>{
      child.kill('SIGINT')
      reject(error.toString())
    })
    child.on('exit',(code)=>{
      resolve(output)
    })
  });
}
module.exports={writeCode}
