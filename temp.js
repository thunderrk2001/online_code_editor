const fs=require("fs")
fs.readdir('./client/ace-builds-master/src',(e,r)=>{

if(!e)
{ var result={"theme":[]}
  r.forEach((file) => {
    if(file.slice(0,5)=='theme')
    result["theme"].push(file.slice(6,-3))
  });
fs.writeFileSync('./client/javascript/theme.json',JSON.stringify(result))
}
});
