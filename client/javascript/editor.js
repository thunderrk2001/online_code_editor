var editor = ace.edit("editor");
const   themeJson={"theme":["ambiance","chaos","chrome","clouds","clouds_midnight","cobalt","crimson_editor","dawn","dracula","dreamweaver","eclipse","github","gob","gruvbox","idle_fingers","iplastic","katzenmilch","kr_theme","kuroir","merbivore","merbivore_soft","monokai","mono_industrial","nord_dark","one_dark","pastel_on_dark","solarized_dark","solarized_light","sqlserver","terminal","textmate","tomorrow","tomorrow_night","tomorrow_night_blue","tomorrow_night_bright","tomorrow_night_eighties","twilight","vibrant_ink","xcode"]}
const themes=themeJson['theme']
init()
function init() {
  document.getElementById('editor').style.fontSize='16px';
  setTheme('ambiance')
  editor.setHighlightActiveLine(true);
  editor.session.setMode("ace/mode/c_cpp");
  addThemeOptions()
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
                document.getElementById('output').innerText=(result["OUTPUT"])}
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
