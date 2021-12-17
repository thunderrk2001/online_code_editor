var editor = ace.edit("editor");
document.getElementById('editor').style.fontSize='16px';
editor.setTheme("ace/theme/monokai");
editor.setHighlightActiveLine(true);
editor.session.setMode("ace/mode/c_cpp");
document.getElementById('run_btn').addEventListener("click",async()=>{
await runCode()
})
async function runCode() {
  const code=editor.getValue().toString()
  try{
  const rawResponse = await fetch("http://localhost:2000/cpp", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:
              JSON.stringify({"code":code})
          });
            if(rawResponse.ok)
            {
              const result=await rawResponse.json()
              if(result["ERROR"]!=null)
              document.getElementById('output').innerText=(result["ERROR"])
              else
              document.getElementById('output').innerText=(result["OUTPUT"])
            }}
            catch(e){
              console.log(e);
        }
}
