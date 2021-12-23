const {exec,spawn}=require("child_process")
const path=require('path')
const cpp=require("./lib/cpp.js")
const java=require('./lib/java.js')
const {createUnique}=require("./lib/randomString.js")
const express=require("express");
const app=express()
app.use(express.json({limit: "50mb",}))
app.use(express.static(path.join(__dirname, "client"))
);
app.set("view-engine",'ejs')
app.set("views",path.join(__dirname,"client"))
app.use(express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: "50000"
}));
app.post("/c_cpp",async(req,res)=>{
  const code=req.body.code
  const input=req.body.input
  try {
    const name=createUnique()
    const compile=await cpp.writeCode(code)
    const execCode= await compile(name)
    const data=await execCode(name,input);
    res.send({"ERROR":null,"OUTPUT":data})
  } catch (e) {
    res.send({"ERROR":e.toString()})
  }
})
app.post("/java",async(req,res)=>{
  const code=req.body.code
  let input=""
  input=req.body.input
  try {
  const runJavaInTime= await java.writeCode(code)
  const data=await runJavaInTime(input)
  console.log(data.length);
  res.send({"ERROR":null,"OUTPUT":data})
  } catch (e) {
  res.send({"ERROR":e.toString()})
  }
})
app.post("/python",(req,res)=>{

})
app.get("/",(req,res)=>{
  res.render("editor.ejs")
})

app.listen(2000,(e)=>{
  if(!e)
  console.log("Listening at 2000..");
})
