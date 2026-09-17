// FLASH GEAR BD — edit the CONFIG section only.
const CONFIG = {
  whatsappNumber: "8801XXXXXXXXX", // Bangladesh format: 8801XXXXXXXXX
  facebook: "https://www.facebook.com/flashgearbd",
  instagram: "https://www.instagram.com/flashgearbd/",
  // Replace or add products here. Keep prices as numbers.
  products: [
    {name:"65W Fast Charger", category:"Chargers", price:1290, icon:"⚡", featured:true},
    {name:"Type-C Fast Charging Cable", category:"Chargers", price:350, icon:"🔌", featured:true},
    {name:"TWS Wireless Earbuds", category:"Audio", price:1490, icon:"🎧", featured:true},
    {name:"Premium Phone Case", category:"Protection", price:450, icon:"🛡️", featured:true},
    {name:"10,000mAh Power Bank", category:"Power", price:1790, icon:"🔋"},
    {name:"Magnetic Phone Holder", category:"Gadgets", price:690, icon:"✨"},
    {name:"Wireless Neckband", category:"Audio", price:990, icon:"🎵"},
    {name:"USB-C to USB-C Cable", category:"Chargers", price:490, icon:"🔗"}
  ]
};

function money(n){return "৳" + Number(n).toLocaleString("en-BD");}
function waLink(productName=""){
  const text = productName ? `Hello FLASH GEAR BD, I want to order: ${productName}` : `Hello FLASH GEAR BD, I want to know about your products.`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
function productCard(p){
  return `<article class="product"><div class="product-img">${p.icon||"📱"}</div><div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><a class="order" href="${waLink(p.name)}" target="_blank" rel="noopener">Order on WhatsApp</a></div></article>`;
}
function render(list, target){
  const el=document.querySelector(target); if(!el)return;
  el.innerHTML=list.map(productCard).join("");
}
function init(){
  document.querySelectorAll(".wa-link").forEach(a=>{a.href=waLink();a.target="_blank";a.rel="noopener"});
  document.querySelectorAll("[data-facebook]").forEach(a=>a.href=CONFIG.facebook);
  document.querySelectorAll("[data-instagram]").forEach(a=>a.href=CONFIG.instagram);
  document.querySelectorAll("#year").forEach(x=>x.textContent=new Date().getFullYear());

  if(document.querySelector("#featured")) render(CONFIG.products.filter(p=>p.featured).slice(0,4),"#featured");

  const catalog=document.querySelector("#catalog");
  if(catalog){
    const search=document.querySelector("#search"), category=document.querySelector("#category");
    const params=new URLSearchParams(location.search); const cat=params.get("cat");
    if(cat && [...category.options].some(o=>o.value===cat)) category.value=cat;
    function filter(){
      const q=(search.value||"").toLowerCase(), c=category.value;
      const list=CONFIG.products.filter(p=>(c==="All"||p.category===c)&&(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
      render(list,"#catalog"); document.querySelector("#empty").hidden=list.length>0;
    }
    search.addEventListener("input",filter); category.addEventListener("change",filter); filter();
  }
}
document.addEventListener("DOMContentLoaded",init);
