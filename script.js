const navToggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.navlinks');
if(navToggle&&nav)navToggle.addEventListener('click',()=>nav.classList.toggle('open'));
if(nav)nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{if(progress){let h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+'%'}},{passive:true});
const glow=document.querySelector('.cursor-glow');
if(glow&&matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const filter=btn.dataset.filter;
 document.querySelectorAll('.work-card').forEach(card=>card.classList.toggle('hide',filter!=='all'&&card.dataset.cat!==filter));
}));
// Portfolio lightbox: delegation makes every card/image reliably clickable.
const lb=document.querySelector('.lightbox'), lbImg=lb?.querySelector('img');
const portfolioImages=[...document.querySelectorAll('.work-card img')];
let activeImageIndex=0;
function showPortfolioImage(index){
 if(!lb||!lbImg||!portfolioImages.length)return;
 activeImageIndex=(index+portfolioImages.length)%portfolioImages.length;
 const img=portfolioImages[activeImageIndex];
 lbImg.src=img.currentSrc||img.src; lbImg.alt=img.alt||'Réalisation ETS DK LAND';
 lb.classList.add('open'); document.body.classList.add('lock');
}
function closeLightbox(){lb?.classList.remove('open');document.body.classList.remove('lock');if(lbImg)lbImg.removeAttribute('src')}
document.querySelector('.work-grid')?.addEventListener('click',e=>{
 const card=e.target.closest('.work-card');
 if(!card||card.classList.contains('hide'))return;
 const img=card.querySelector('img');
 if(img){e.preventDefault();showPortfolioImage(portfolioImages.indexOf(img))}
});
lb?.querySelector('[data-lightbox-close]')?.addEventListener('click',closeLightbox);
lb?.querySelector('[data-lightbox-prev]')?.addEventListener('click',()=>showPortfolioImage(activeImageIndex-1));
lb?.querySelector('[data-lightbox-next]')?.addEventListener('click',()=>showPortfolioImage(activeImageIndex+1));
lb?.addEventListener('click',e=>{if(e.target===lb)closeLightbox()});
document.addEventListener('keydown',e=>{
 if(!lb?.classList.contains('open'))return;
 if(e.key==='Escape')closeLightbox();
 if(e.key==='ArrowRight')showPortfolioImage(activeImageIndex+1);
 if(e.key==='ArrowLeft')showPortfolioImage(activeImageIndex-1);
});
document.querySelectorAll('form[data-whatsapp]').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form), lines=[];
 for(const [key,value] of data.entries()){if(value&&typeof value==='string')lines.push(`${key} : ${value}`)}
 const intro=form.dataset.intro||'Bonjour ETS DK LAND, je souhaite vous contacter.';
 const msg=intro+'\n\n'+lines.join('\n')+'\n\nMerci.';
 window.open('https://wa.me/22891173357?text='+encodeURIComponent(msg),'_blank','noopener');
}));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
