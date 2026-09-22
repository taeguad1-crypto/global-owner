
(()=>{const KEY='r12_internal_history_v2';const home=()=>location.pathname.endsWith('/nosora.html')?'index.html':'#home';
const sameSite=(u)=>{try{const x=new URL(u,location.href);return x.origin===location.origin}catch{return false}};
function stack(){try{return JSON.parse(sessionStorage.getItem(KEY)||'[]')}catch{return[]}}
function put(s){sessionStorage.setItem(KEY,JSON.stringify(s.slice(-30)))}
function mark(){const s=stack(),here=location.pathname+location.search+location.hash;if(s[s.length-1]!==here){s.push(here);put(s)}}
function navBack(){const s=stack();if(s.length>1){s.pop();const dest=s.pop();put(s);location.href=dest||'index.html'}else{history.pushState({r12:true},'',location.href);if(location.pathname.endsWith('/nosora.html'))location.href='index.html';else{location.hash='home';scrollTo({top:0,behavior:'smooth'})}}}
document.addEventListener('DOMContentLoaded',()=>{mark();if(!history.state?.r12)history.pushState({r12:true},'',location.href);
const n=document.createElement('nav');n.id='r12-shell-nav';n.innerHTML='<button type="button" data-r12="back"><span class="ico">‹</span><span class="txt">이전</span></button><button type="button" data-r12="home"><span class="ico">⌂</span><span class="txt">홈</span></button><button type="button" data-r12="next"><span class="txt">다음</span><span class="ico">›</span></button>';document.body.appendChild(n);
n.querySelector('[data-r12="back"]').onclick=navBack;n.querySelector('[data-r12="home"]').onclick=()=>{if(location.pathname.endsWith('/nosora.html'))location.href='index.html';else{location.hash='home';scrollTo({top:0,behavior:'smooth'})}};
n.querySelector('[data-r12="next"]').onclick=()=>{const links=[...document.querySelectorAll('main a[href],main button[data-detail],.filters button')].filter(x=>!x.disabled);const y=scrollY+innerHeight*.45;const next=links.find(el=>{const r=el.getBoundingClientRect();return r.top+scrollY>y});if(next){next.scrollIntoView({behavior:'smooth',block:'center'});next.focus?.()}else scrollTo({top:document.body.scrollHeight,behavior:'smooth'})};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a&&sameSite(a.href)&&!a.href.startsWith('javascript:'))setTimeout(mark,0)},true);
});window.addEventListener('popstate',()=>{history.pushState({r12:true},'',location.href);navBack()});})();
