async function setTimeLimit(ms)
{
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      reject('Time Limit Exceeded')
    },ms)
  });
}
module.exports=setTimeLimit
