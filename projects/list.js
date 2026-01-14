const projects = [
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
   // desc: "Công cụ hỗ trợ tìm lỗ hổng tự động."
 // },
];

function renderProjects() {
  const container = document.getElementById("project-list");
  if (!container) return;

  container.innerHTML = projects.map(proj => `
    <a href="${proj.link}" class="item reveal">
      <div class="item-header">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="item-body">
        <div class="item-info">
          <h2>${proj.title}</h2>
          <p style="font-size: 0.9rem; color: var(--muted); margin: 4px 0 12px;">${proj.desc}</p>
          <div class="meta">
            <span class="badge">${proj.tag}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join("") + `
    <div style="text-align: center; padding: 40px; color: var(--muted); border: 2px dashed var(--line); border-radius: var(--radius);" class="reveal">
      Đang cập nhật thêm các ứng dụng mới...
    </div>
  `;
  
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: .1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
}

document.addEventListener("DOMContentLoaded", renderProjects);
