const {write,read,deleteFile}=require("./serverFilesManipulator.js")
const {exec,spawn}=require("child_process")
async function execCode(child,input)
{
return  new Promise(function(resolve, reject) {
child.stdin.write(input)
child.stdin.end()
let output=""
child.stdout.on('data',(data)=>{
  output=output+data.toString()
})
child.on("exit",(code)=>{
  resolve(output)
})
}
);
}
async function setTimeLimit(ms)
{
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      reject('Time Limit Exceeded')
    },ms)
  });
}
async  function executeInTime(exeFileName,input)
{const child=spawn(exeFileName)
  return new Promise(async function(resolve, reject) {
  try {
  const res=await Promise.race([setTimeLimit(2000),execCode(child,input)])
  child.kill('SIGINT')
  deleteFile(exeFileName).then(()=>{}).catch((e)=>{console.log(e);})
  resolve(res);
} catch (e) {
  child.kill('SIGINT')
  deleteFile(exeFileName).then(()=>{}).catch((e)=>{console.log(e);})
  reject(e)
}
});


}
async function compile(exeFileName) {
  return new Promise(function(resolve, reject) {
    const fileName="index.cpp"
    exec(`g++ -o ${exeFileName} `+fileName,(error,res,stderr)=>{
      if(error)
      {
        reject(error.toString())
      }
      if(stderr)
      reject(stderr.toString())
      resolve(executeInTime)
    })
  });
}
async function writeCode(code)
{return new Promise(function(resolve, reject) {
  try {
    write("index.cpp",code)
    resolve(compile)
  } catch (e) {
    reject(e)
  }
});
}
module.exports={writeCode}
