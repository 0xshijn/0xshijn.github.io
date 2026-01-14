const apiList = [
  //{
    //title: "IP Lookup API",
    //endpoint: "/api/v1/ip",
    //method: "GET",
  //  desc: "Tra cứu thông tin chi tiết về địa chỉ IP của bạn hoặc một IP bất kỳ.",
    //tag: "Security",
    //link: "api/pages/ip-lookup.html"
  //},
  //{
  //  title: "CTF Stats API",
  //  endpoint: "/api/v1/ctf",
  //  method: "GET",
   // desc: "Lấy dữ liệu bảng xếp hạng và giải bài CTF.",
   // tag: "Data",
   // link: "#"
 // },
];

function renderAPIs() {
  const container = document.getElementById("api-list");
  if (!container) return;

  container.innerHTML = apiList.map(api => `
    <a href="${api.link}" class="item reveal" style="text-decoration:none; color:inherit">
      <div class="item-header">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="item-body">
        <div class="item-info">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
            <span class="badge" style="background: var(--brand2); color:#000">${api.method}</span>
            <code style="font-family:var(--mono); font-size:0.9rem; opacity:0.8">${api.endpoint}</code>
          </div>
          <h2 style="margin:0">${api.title}</h2>
          <p style="font-size: 0.9rem; color: var(--muted); margin: 8px 0 0;">${api.desc}</p>
        </div>
        <div class="meta">
          <span class="badge">${api.tag}</span>
        </div>
      </div>
    </a>
  `).join("") + `
    <div style="text-align: center; padding: 40px; color: var(--muted); border: 2px dashed var(--line); border-radius: var(--radius);" class="reveal">
      Đang phát triển thêm các endpoint mới...
    </div>
  `;
  
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: .1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
}

document.addEventListener("DOMContentLoaded", renderAPIs);
