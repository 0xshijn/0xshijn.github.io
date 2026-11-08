const writeups = [
  {
    title: "Simple Overflow Writeup — Phân tích & Khai thác Buffer Overflow",
    file: "example-pwn-1.txt",
    tag: "Pwn",
    date: "Jan 14, 2026",
    desc: "Kiểm tra cơ chế bảo mật với checksec và viết script pwntools ghi đè địa chỉ trả về (ret2win)."
  },
  //{
    //title: "Writeup Pwn số 1",
    //file: "pwn1.txt", // Tên file .txt bạn ném vào thư mục writeups/data/
    //tag: "Pwn",
    //date: "Jan 15, 2026"
  //},
  //{
    //comment: "Hướng dẫn Buffer Overflow",
    //title: "Hướng dẫn Buffer Overflow",
    //file: "tutorial.txt",
    //tag: "Tutorial",
    //date: "Jan 14, 2026"
  //},
];

let activeTag = "all";
let searchQuery = "";

function renderWriteups() {
  const container = document.getElementById("writeup-list");
  if (!container) return;

  const filtered = writeups.filter(post => {
    const matchTag = activeTag === "all" || (post.tag && post.tag.toLowerCase() === activeTag.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      post.title.toLowerCase().includes(q) ||
      (post.desc && post.desc.toLowerCase().includes(q)) ||
      (post.tag && post.tag.toLowerCase().includes(q));
    return matchTag && matchSearch;
  });

  container.innerHTML = filtered.map(post => `
    <a href="writeups/viewer.html?file=${post.file}&title=${encodeURIComponent(post.title)}" class="item reveal">
      <div class="item-header">
        <div class="item-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <span class="item-path">~/writeups/data/${post.file}</span>
      </div>
      <div class="item-body">
        <div class="item-info">
          <h2>${post.title}</h2>
          ${post.desc ? `<p class="item-desc">${post.desc}</p>` : ''}
          <div class="meta">
            <span class="badge">${post.tag}</span>
            <span>📅 ${post.date}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; color:var(--brand2)"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join("") + `
    <div style="text-align: center; padding: 36px; color: var(--muted); border: 1px dashed var(--line-strong); border-radius: var(--radius); font-family: var(--mono); font-size: 0.9rem;" class="reveal">
      ${filtered.length === 0 ? 'Không tìm thấy writeup phù hợp với từ khóa.' : '[+] Đang cập nhật thêm các bài viết mới...'}
    </div>
  `;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(x => obs.observe(x));
}

function encodeElementSibling(str) {
  return encodeURIComponent(str);
}

document.addEventListener("DOMContentLoaded", () => {
  renderWriteups();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderWriteups();
    });
  }

  document.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTag = btn.getAttribute("data-tag");
      renderWriteups();
    });
  });
});
