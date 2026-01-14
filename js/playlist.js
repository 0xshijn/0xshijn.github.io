const playlistData = [
  { 
    title: "Ricky Star - Khi 22 ft. Blacka", 
    id: "huDU4e9GHIU", 
    type: "youtube" 
  },
];

function initPlaylist() {
  const select = document.getElementById('playlist');
  if (!select) return;

  const defaultOption = select.options[0];
  select.innerHTML = '';
  select.appendChild(defaultOption);

  playlistData.forEach((song, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = (song.type === 'soundcloud' ? '☁️ ' : '📺 ') + song.title;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", initPlaylist);
