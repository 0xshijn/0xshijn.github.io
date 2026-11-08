const apiList = [
  {
    title: "IP Lookup API & Terminal",
    endpoint: "/api/v1/ip",
    method: "GET",
    desc: "Tra cứu thông tin chi tiết về địa chỉ IP của bạn hoặc một IP bất kỳ (ISP, vị trí, ASN).",
    tag: "Security",
    link: "api/pages/ip-lookup.html"
  },
  //{
  //  title: "CTF Stats API",
  //  endpoint: "/api/v1/ctf",
  //  method: "GET",
  //  desc: "Lấy dữ liệu bảng xếp hạng và giải bài CTF.",
  //  tag: "Data",
  //  link: "#"
  //},
];

let apiQuery = "";

function renderAPIs() {
  const container = document.getElementById("api-list");
  if (!container) return;

  const filtered = apiList.filter(api => {
    const q = apiQuery.toLowerCase();
    return !q ||
      api.title.toLowerCase().includes(q) ||
      api.endpoint.toLowerCase().includes(q) ||
      (api.desc && api.desc.toLowerCase().includes(q));
  });

  container.innerHTML = filtered.map(api => `
    <div class="item reveal">
      <div class="item-header">
        <div class="item-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <span class="item-path">${api.endpoint}</span>
      </div>
      <div class="item-body">
        <a href="${api.link}" class="item-info" style="flex:1; text-decoration:none; color:inherit">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
            <span class="method-badge">${api.method}</span>
            <code style="font-family:var(--mono); font-size:0.9rem; color:var(--brand2)">${api.endpoint}</code>
          </div>
          <h2>${api.title}</h2>
          <p style="font-size: 0.94rem; color: var(--muted); margin: 8px 0 0; line-height: 1.55;">${api.desc}</p>
        </a>
        <div style="display:flex; align-items:center; gap:10px">
          <button type="button" class="copy-ep-btn" data-ep="${api.endpoint}">Copy URI</button>
          <a href="${api.link}" class="badge" style="color:var(--brand2); border-color:rgba(6,182,212,0.35)">Open Tool →</a>
        </div>
      </div>
    </div>
  `).join("") + `
    <div style="text-align: center; padding: 36px; color: var(--muted); border: 1px dashed var(--line-strong); border-radius: var(--radius); font-family: var(--mono); font-size: 0.9rem;" class="reveal">
      ${filtered.length === 0 ? 'Không tìm thấy endpoint phù hợp.' : '[+] Đang phát triển thêm các endpoint mới...'}
    </div>
  `;

  document.querySelectorAll(".copy-ep-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const ep = btn.getAttribute("data-ep");
      navigator.clipboard.writeText(ep);
      const old = btn.textContent;
      btn.textContent = "✓ Copied";
      setTimeout(() => { btn.textContent = old; }, 1500);
    });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(x => obs.observe(x));
}

document.addEventListener("DOMContentLoaded", () => {
  renderAPIs();
  const searchInput = document.getElementById("api-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      apiQuery = e.target.value.trim();
      renderAPIs();
    });
  }
});
