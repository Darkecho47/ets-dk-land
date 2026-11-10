/* ETS DK LAND — écran de chargement cinématique (5 s, 1 fois par session) */
(function(){
  var root=document.documentElement, L=document.getElementById('dk-loader');
  if(!L)return;
  if(!root.classList.contains('intro-lock')){L.remove();return;}

  var PROGRESS_MS=4000;   // la barre atteint 100 % à 4,0 s
  var HOLD_MS=150;        // courte pause sur 100 %
  var REMOVE_MS=1150;     // rideau terminé -> total ≈ 5,3 s
  var fill=L.querySelector('.ld-fill'), pct=L.querySelector('.ld-pct');
  var done=false, t0=performance.now();

  try{window.scrollTo(0,0)}catch(e){}

  // progression fluide : démarrage rapide, léger ralentissement au milieu, arrivée douce
  function ease(t){return .55*t+.45*(t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2)}
  function frame(now){
    if(done)return;
    var t=Math.min((now-t0)/PROGRESS_MS,1), p=ease(t);
    fill.style.transform='scaleX('+p+')';
    pct.textContent=String(Math.round(p*100)).padStart(3,'0')+'%';
    if(t<1)requestAnimationFrame(frame); else setTimeout(leave,HOLD_MS);
  }

  function leave(){
    if(done)return; done=true;
    fill.style.transform='scaleX(1)'; pct.textContent='100%';
    L.classList.add('is-leaving');
    setTimeout(function(){root.classList.remove('intro-lock')},450); // l'accueil se révèle derrière le rideau
    setTimeout(function(){L.remove()},REMOVE_MS);
  }

  var skip=L.querySelector('.ld-skip');
  if(skip)skip.addEventListener('click',leave);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')leave()});
  requestAnimationFrame(frame);
})();
