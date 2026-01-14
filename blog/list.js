const blogPosts = [
  //{
    //title: "Ngày 1: Bắt đầu hành trình",
    //file: "day1.txt",
   // date: "Jan 14, 2026",
   // tag: "Diary"
  //},
];

function renderBlog() {
  const container = document.getElementById("blog-list");
  if (!container) return;

  container.innerHTML = blogPosts.map(post => `
    <a href="blog/viewer.html?file=${post.file}&title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}" class="item reveal">
      <div class="item-header">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="item-body">
        <div class="item-info">
          <h2>${post.title}</h2>
          <div class="meta">
            <span class="badge">${post.tag}</span>
            <span>${post.date}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join("") + `
    <div style="text-align: center; padding: 40px; color: var(--muted); border: 2px dashed var(--line); border-radius: var(--radius);" class="reveal">
      Đang viết tiếp cho ngày mai...
    </div>
  `;
  
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: .1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
}

document.addEventListener("DOMContentLoaded", renderBlog);
