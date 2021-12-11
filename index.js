const {exec,spawn}=require("child_process")
const path=require('path')
const cpp=require("./lib/cpp.js")
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
app.post("/cpp",async(req,res)=>{
  const code=req.body.code
  try {
    const compile=await cpp.writeCode(code)
    const writeInput= await compile()
    const execCode=await writeInput('')
    const data=await execCode();
    res.send({"OUTPUT":data})
  } catch (e) {
    res.send({"ERROR":e.toString()})
  }
})
app.get("/java",(req,res)=>{

})
app.get("/py",(req,res)=>{

})
app.get("/",(req,res)=>{
  res.render("editor.ejs")
})

app.listen(2000,(e)=>{
  if(!e)
  console.log("Listening at 2000..");
})
