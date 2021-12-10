const {write,read}=require("./readWrite.js")
const {exec}=require("child_process")
async function execCode()
{
return  new Promise(function(resolve, reject) {
if(read('input.txt').toString().length!=0)
{
  exec("a.exe >"+'input.txt',(error,res,stderr)=>{
    if(error)
    {
      reject(error)
    }
    if(stderr)
    reject(stderr)
    resolve(res)
  })
}
else{
  exec("a.exe",(error,res,stderr)=>{
    if(error)
    {
      reject(error)
    }
    if(stderr)
    reject(stderr)
    resolve(res)
  })
}
});
}
async function compile() {
  return new Promise(function(resolve, reject) {
    const fileName="index.cpp"
    exec("g++ -o a "+fileName,(error,res,stderr)=>{
      if(error)
      {
        reject(error.toString())
      }
      if(stderr)
      reject(stderr.toString())
      resolve(writeInput)
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
async function writeInput(input) {
  return new Promise(function(resolve, reject) {
    try {
      write("input.txt",input)
      resolve(execCode)
    } catch (e) {
      reject(e)
    }
  });
}
module.exports={writeCode}
