
const MODEL_DATA=[{"slug": "renault-clio", "brand": "Renault", "model": "Clio", "score": 88, "liquidity": "Çok yüksek", "segment": "B Hatchback", "sales": "33.636 adet (Ocak–Eylül 2026)", "new": true, "headline": "Türkiye'nin likidite kralı; ama motor ve nesil seçimini doğru yap."}, {"slug": "renault-megane-sedan", "brand": "Renault", "model": "Megane Sedan", "score": 84, "liquidity": "Çok yüksek", "segment": "C Sedan", "sales": "22.768 adet (Ocak–Eylül 2026)", "new": true, "headline": "Geniş pazar, güçlü motorlar; 1.3 TCe EDC'de ses ve klima şikâyetlerini bilerek al."}, {"slug": "renault-duster", "brand": "Renault", "model": "Duster", "score": 82, "liquidity": "Yüksek", "segment": "C SUV", "sales": "19.774 adet (Ocak–Eylül 2026)", "new": true, "headline": "Dört farklı motor karakteri; doğru Duster'ı seçmek motor tercihinden başlıyor."}, {"slug": "volkswagen-taigo", "brand": "Volkswagen", "model": "Taigo", "score": 80, "liquidity": "Yüksek", "segment": "B SUV Coupé", "sales": "16.507 adet (Ocak–Eylül 2026)", "new": true, "headline": "Güçlü B-SUV talebi; 1.0/1.5 TSI seçiminden daha kritik konu DSG geçmişi."}, {"slug": "volkswagen-tiguan", "brand": "Volkswagen", "model": "Tiguan", "score": 83, "liquidity": "Yüksek", "segment": "C/D SUV", "sales": "8.240 adet (Ocak–Haziran 2026 SUV verisi)", "new": true, "headline": "Konfor ve kalite güçlü; ikinci elde DSG + dizelde emisyon/4MOTION bakımı maliyet kalemi."}, {"slug": "volkswagen-t-roc", "brand": "Volkswagen", "model": "T-Roc", "score": 81, "liquidity": "Orta-Yüksek", "segment": "C SUV", "sales": "5.627 adet (Ocak–Haziran 2026 SUV verisi)", "new": true, "headline": "İkinci elde 1.0 TSI/1.5 TSI, sıfırda yeni 1.5 eTSI: nesilleri karıştırma."}, {"slug": "toyota-corolla", "brand": "Toyota", "model": "Corolla", "score": 92, "liquidity": "Çok yüksek", "segment": "C Sedan", "sales": "24.495 adet (Ocak–Eylül 2026)", "new": true, "headline": "Güvenilirlik ve ikinci el likiditesinde referans; 1.5 benzin ve hibritin kullanım profili farklı."}, {"slug": "toyota-c-hr", "brand": "Toyota", "model": "C-HR", "score": 88, "liquidity": "Yüksek", "segment": "C SUV Coupé", "sales": "17.952 adet (Ocak–Eylül 2026)", "new": true, "headline": "Şehir içi hibritte çok güçlü; arka görüş/alan ve konfor beklentisini test et."}, {"slug": "toyota-corolla-cross", "brand": "Toyota", "model": "Corolla Cross", "score": 87, "liquidity": "Yüksek", "segment": "C SUV", "sales": "Toyota'nın 2025'te 12.006 adetle 3. binek modeli", "new": true, "headline": "Corolla güven yaklaşımını SUV pratikliğiyle birleştiriyor; ikinci elde hibrit sağlık raporu ana kontrol."}];
let compare=JSON.parse(localStorage.getItem("motorlab_compare")||"[]");
function filterCars(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 const brand=document.querySelector(".filter.brand.active")?.dataset.value||"all";
 const market=document.querySelector(".filter.market.active")?.dataset.value||"all";
 document.querySelectorAll(".car").forEach(c=>{
  const okq=(c.dataset.search||"").includes(q);
  const okb=brand==="all"||c.dataset.brand===brand;
  const okm=market==="all"||c.dataset[market]==="1";
  c.style.display=okq&&okb&&okm?"":"none";
 });
}
function setFilter(el,group){
 document.querySelectorAll(".filter."+group).forEach(x=>x.classList.remove("active"));el.classList.add("active");filterCars();
}
function toggleCompare(slug){
 if(compare.includes(slug)) compare=compare.filter(x=>x!==slug);
 else{if(compare.length>=3){toast("En fazla 3 araç karşılaştırabilirsin.");return}compare.push(slug)}
 localStorage.setItem("motorlab_compare",JSON.stringify(compare));renderCompare();
}
function renderCompare(){
 const bar=document.getElementById("comparebar"); if(!bar)return;
 bar.classList.toggle("show",compare.length>0);
 document.getElementById("compareitems").innerHTML=compare.map(s=>{const m=MODEL_DATA.find(x=>x.slug===s);return `<span class="compareitem">${m.brand} ${m.model} ×</span>`}).join("");
 document.querySelectorAll("[data-compare]").forEach(b=>{b.textContent=compare.includes(b.dataset.compare)?"✓ Eklendi":"+ Karşılaştır"});
}
function openCompare(){
 if(compare.length<2){toast("Karşılaştırma için en az 2 araç seç.");return}
 const ms=compare.map(s=>MODEL_DATA.find(x=>x.slug===s));
 const rows=[
 ["MOTORLAB puanı",...ms.map(m=>m.score+"/100")],
 ["Segment",...ms.map(m=>m.segment)],
 ["Likidite",...ms.map(m=>m.liquidity)],
 ["Satış/pazar notu",...ms.map(m=>m.sales)],
 ["Sıfır satış",...ms.map(m=>m.new?"Evet":"Hayır")]
 ];
 document.getElementById("comparetable").innerHTML=`<tr><th>Ölçüt</th>${ms.map(m=>`<th>${m.brand} ${m.model}</th>`).join("")}</tr>`+rows.map(r=>`<tr>${r.map((x,i)=>`<${i?"td":"th"}>${x}</${i?"td":"th"}>`).join("")}</tr>`).join("");
 document.getElementById("comparemodal").classList.add("show");
}
function closeCompare(){document.getElementById("comparemodal")?.classList.remove("show")}
function clearCompare(){compare=[];localStorage.setItem("motorlab_compare","[]");renderCompare()}
function toast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.style.cssText="position:fixed;left:50%;bottom:85px;transform:translateX(-50%);background:#b6ff3b;color:#071008;padding:10px 13px;border-radius:10px;font:800 11px Inter,sans-serif;z-index:200";document.body.appendChild(t)}t.textContent=msg;t.style.display="block";clearTimeout(window.__tt);window.__tt=setTimeout(()=>t.style.display="none",2200)}
function setTab(id,el){document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tabpane").forEach(x=>x.classList.remove("active"));el.classList.add("active");document.getElementById(id).classList.add("active")}
document.addEventListener("DOMContentLoaded",renderCompare);
