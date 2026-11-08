const blogPosts = [
  {
    title: "Ngày 1: Bắt đầu hành trình chinh phục Pwn",
    file: "day1.txt",
    date: "Jan 14, 2026",
    tag: "Diary"
  },
];

let blogQuery = "";

function renderBlog() {
  const container = document.getElementById("blog-list");
  if (!container) return;

  const filtered = blogPosts.filter(post => {
    const q = blogQuery.toLowerCase();
    return !q ||
      post.title.toLowerCase().includes(q) ||
      (post.tag && post.tag.toLowerCase().includes(q));
  });

  container.innerHTML = filtered.map(post => `
    <a href="blog/viewer.html?file=${post.file}&title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}" class="item reveal">
      <div class="item-header">
        <div class="item-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <span class="item-path">~/blog/data/${post.file}</span>
      </div>
      <div class="item-body">
        <div class="item-info">
          <h2>${post.title}</h2>
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
      ${filtered.length === 0 ? 'Không tìm thấy bài viết nào.' : '[+] Đang viết tiếp cho ngày mai...'}
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
  renderBlog();
  const searchInput = document.getElementById("blog-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      blogQuery = e.target.value.trim();
      renderBlog();
    });
  }
});
