
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
    el.dataset.time = nowTime() // data-time
    el.dataset.lines = countLines(text) //data-lines
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

  function nowTime() {
    const pa = d => d.toString().padStart(2, '0');
    // 現在の日時を取得
    const now = new Date();
    // 時間と分を取得 hh:mm
    return pa(now.getHours()) + ':' + pa(now.getMinutes());
  }

  function countLines(text) {
    var count = 0;
    // 文字列を1文字ずつ走査して、改行文字を見つけたらカウントを増やす
    for (var i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            count++;
        }
    }
    return count;
　}
  function countPages(n){
    return ~~(n/32) + 1
  }
  ///////////////////////////////////
}

autoSave(makeMenu)

function makeMenu(el){
  const isShapes = (d) => /^##+/.test(d);  
  const menu = document.querySelector('.menu')
  const text = el.textContent;
  const menuText = text.split('\n')
    .filter(d=>/^#/.test(d))
    .map(d=>{
       return isShapes(d)? '　'+d:d;    
    }).join('\n')
  
  menu.textContent = menuText;
}
