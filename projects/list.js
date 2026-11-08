const projects = [
  {
    title: "IP Lookup Terminal — Công cụ tra cứu IP & ASN",
    link: "api/pages/ip-lookup.html",
    tag: "Security Tool",
    desc: "Giao diện dòng lệnh (CLI) giúp tra cứu nhanh thông tin vị trí, ISP và dữ liệu JSON của một địa chỉ IP."
  },
  //{
    //title: "Game Con Cò",
    //link: "mini-web/conco.html",
    //tag: "Game",
    //desc: "Một trò chơi nhỏ giải trí cực vui."
  //},
  //{
    //title: "Tool Quét Lỗi",
    //link: "mini-web/scanner.html",
    //tag: "Security",
    //desc: "Công cụ hỗ trợ tìm lỗ hổng tự động."
  //},
];

let projectQuery = "";

function renderProjects() {
  const container = document.getElementById("project-list");
  if (!container) return;

  const filtered = projects.filter(proj => {
    const q = projectQuery.toLowerCase();
    return !q ||
      proj.title.toLowerCase().includes(q) ||
      (proj.desc && proj.desc.toLowerCase().includes(q)) ||
      (proj.tag && proj.tag.toLowerCase().includes(q));
  });

  container.innerHTML = filtered.map(proj => `
    <a href="${proj.link}" class="item reveal">
      <div class="item-header">
        <div class="item-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <span class="item-path">~/${proj.link}</span>
      </div>
      <div class="item-body">
        <div class="item-info">
          <h2>${proj.title}</h2>
          <p style="font-size: 0.94rem; color: var(--muted); margin: 6px 0 14px; line-height: 1.55;">${proj.desc}</p>
          <div class="meta">
            <span class="badge">${proj.tag}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; color:var(--brand2)"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join("") + `
    <div style="text-align: center; padding: 36px; color: var(--muted); border: 1px dashed var(--line-strong); border-radius: var(--radius); font-family: var(--mono); font-size: 0.9rem;" class="reveal">
      ${filtered.length === 0 ? 'Không tìm thấy ứng dụng phù hợp.' : '[+] Đang cập nhật thêm các ứng dụng mới...'}
    </div>
  `;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(x => obs.observe(x));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      projectQuery = e.target.value.trim();
      renderProjects();
    });
  }
});
