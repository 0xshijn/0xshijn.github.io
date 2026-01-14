const writeups = [
    //{
    //title: "Simple Overflow Writeup",
    //file: "example-pwn-1.txt",
    //tag: "Pwn",
    //date: "Jan 14, 2026"
  //},
  //{
    //title: "Writeup Pwn số 1",
    //file: "pwn1.txt", // Tên file .txt bạn ném vào thư mục writeups/data/
    //tag: "Pwn",
    //date: "Jan 15, 2026"
 // },
    //{
    //comment: "Hướng dẫn Buffer Overflow",
    //title: "Hướng dẫn Buffer Overflow",
    //file: "tutorial.txt",
    //tag: "Tutorial",
    //date: "Jan 14, 2026"
  //},
];

function renderWriteups() {
  const container = document.getElementById("writeup-list");
  if (!container) return;

  container.innerHTML = writeups.map(post => `
    <a href="writeups/viewer.html?file=${post.file}&title=${encodeURIComponent(post.title)}" class="item reveal">
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
      Đang cập nhật thêm các bài viết mới...
    </div>
  `;
  
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: .1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
}

function encodeElementSibling(str) {
    return encodeURIComponent(str);
}

document.addEventListener("DOMContentLoaded", renderWriteups);
