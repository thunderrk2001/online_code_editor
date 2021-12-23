var editor = ace.edit("editor");
var prevValue="c_cpp"
const   themeJson={"theme":["ambiance","chaos","chrome","clouds","clouds_midnight","cobalt","crimson_editor","dawn","dracula","dreamweaver","eclipse","github","gob","gruvbox","idle_fingers","iplastic","katzenmilch","kr_theme","kuroir","merbivore","merbivore_soft","monokai","mono_industrial","nord_dark","one_dark","pastel_on_dark","solarized_dark","solarized_light","sqlserver","terminal","textmate","tomorrow","tomorrow_night","tomorrow_night_blue","tomorrow_night_bright","tomorrow_night_eighties","twilight","vibrant_ink","xcode"]}
const themes=themeJson['theme']
const defaultCode={'java':`class main{
    public static void main(String[] arg)
    {
        /*Your Code goes here*/

    }
}`,'c_cpp':`#include "iostream"
using namespace std;
int main()
{
   /*Your code goes here*/
}`,
"python":"/*write code here*/"
}
init()
function init() {
  document.getElementById('editor').style.fontSize='16px';
  setTheme('ambiance')
  editor.setHighlightActiveLine(true);
  addThemeOptions()
  setMode('c_cpp')
  const prevCppCode=localStorage.getItem("thunder_c_cpp")
  if(prevCppCode!=null && prevCppCode!=undefined)
  setEditorCode(prevCppCode)
  else {
    setEditorCode(defaultCode['c_cpp'])
  }
}
function setEditorCode(code) {
editor.setValue(code)
}
function addThemeOptions() {
  const themeSelectEle=  document.getElementById('theme')
  themes.forEach((theme) => {
  let option=document.createElement('option')
  option.innerText=theme
  option.value=theme
  themeSelectEle.appendChild(option)

});
}
function setTheme(value) {
  editor.setTheme(`ace/theme/${value}`);
}

document.getElementById('theme').addEventListener('input',(event)=>{
  const themeValue=event.target.value
  setTheme(themeValue)
})

document.getElementById('language').addEventListener('input',(event)=>{
  console.log(`prev : ${prevValue} curr: ${event.target.value}`);
  const storeCode=function storeCodeIntoLocalHost(lang,code) {
    localStorage.setItem(`thunder_${lang}`,code)
  }
  setMode(event.target.value)
  storeCode(prevValue,editor.getValue())
  const selectedLangCode=localStorage.getItem(`thunder_${event.target.value}`)
  console.log(selectedLangCode);
  if(selectedLangCode!=null && selectedLangCode!=undefined)
  {
    setEditorCode(selectedLangCode)
  }
  else {
      setEditorCode(defaultCode[event.target.value])
  }
  prevValue=event.target.value
})
function setMode(lang) {
  editor.session.setMode(`ace/mode/${lang}`)
}
function toggleRun() {
    const ele= document.getElementById('run_btn')
    if(this.status==true){
    ele.style.opacity='0.5'
    ele.innerText='Running.....'
ele.style.pointerEvents="none"
  }
    else {
      ele.style.opacity='1'
      ele.innerText='RUN'
      ele.style.pointerEvents="initial"
    }
}
document.getElementById('run_btn').addEventListener("click",async()=>{
toggleRun.call({"status":true})
const lang=document.getElementById('language').value
await runCode(lang)
toggleRun.call({"status":false})
})
async function runCode(lang) {
  const code=editor.getValue().toString()
  const input=document.getElementById('input').innerText.toString()
  try{
  const rawResponse = await fetch(`http://localhost:2000/${lang}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:
              JSON.stringify({"code":code,"input":input})
          });
            if(rawResponse.ok)
            {
              const result=await rawResponse.json()
             if(result["ERROR"]!=null){ changefontColor(true,document.getElementById('output'))
              document.getElementById('output').innerText=(result["ERROR"])}
              else
              {  changefontColor(false,document.getElementById('output'))
              if(lang=='java'){
                  document.getElementById('output').textContent=(result["OUTPUT"])
              }
              else{
                  document.getElementById('output').innerText=(result["OUTPUT"])}
              }

            }}
            catch(e){
              console.log(e);
        }

}
function changefontColor(isBlack,ele) {
if(isBlack)
ele.style.color="RED"
else {
  ele.style.color="Black"
}
}
