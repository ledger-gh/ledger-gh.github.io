(function(){
  // People who opened Ledger from their home screen go straight to the app
  try{
    var standalone=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
    if(standalone){location.replace('/app.html');return;}
  }catch(e){}
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  if(!b||!m)return;
  function set(open){m.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');b.setAttribute('aria-label',open?'Close menu':'Open menu');}
  b.addEventListener('click',function(){set(!m.classList.contains('open'));});
  m.addEventListener('click',function(e){if(e.target.tagName==='A')set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
})();
