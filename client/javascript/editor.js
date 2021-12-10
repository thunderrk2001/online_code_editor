document.getElementById('run_btn').addEventListener("click",async()=>{
await runCode()
})
async function runCode() {
  const code=document.querySelector('.editor').innerText
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
              const text=await rawResponse.json()
              alert(JSON.stringify(text))
            }}
            catch(e){
              console.log(e);
            }

}
