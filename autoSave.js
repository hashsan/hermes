function autoSave(caller){
  const pureUrl=d=>(d||window.location.href).split('?')[0];
  const key = pureUrl()
  const query ='[contenteditable]'  
  const el = document.querySelector(query)
  if(!el) return;
  el.textContent = localStorage.getItem(key)||''
  el.addEventListener('keydown',debounce(()=>{
    const text = el.textContent;
    localStorage.setItem(key,text)
    if(caller) caller(el)
  },200) )

  return el
  ;
  //////////////////////////////////////
  function debounce(func, delay) {
    let timerId;
    return function(...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}

window.autoSave = autoSave
