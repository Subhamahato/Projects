const canvas = document.getElementById('timeCircle');
const ctx = canvas.getContext('2d');

function drawClockHand(ctx, radius) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  const totalHours = hours + minutes / 60 + seconds / 3600;
  const angle = ((totalHours / 24) * 2 * Math.PI) - Math.PI / 2;
  
  const handLength = radius * 0.95;
  const tipX = handLength * Math.cos(angle);
  const tipY = handLength * Math.sin(angle);
  
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(tipX, tipY);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
  
  // Draw triangle tip
  const triangleLength = 10;
  const triangleWidth = 6;
  
  const baseX1 = tipX - triangleLength * Math.cos(angle) + (triangleWidth / 2) * Math.sin(angle);
  const baseY1 = tipY - triangleLength * Math.sin(angle) - (triangleWidth / 2) * Math.cos(angle);
  
  const baseX2 = tipX - triangleLength * Math.cos(angle) - (triangleWidth / 2) * Math.sin(angle);
  const baseY2 = tipY - triangleLength * Math.sin(angle) + (triangleWidth / 2) * Math.cos(angle);
  
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(baseX1, baseY1);
  ctx.lineTo(baseX2, baseY2);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  
  // Center dot
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

function resizeAndDraw() {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  const scale = window.devicePixelRatio * 2 || 2;
  
  canvas.width = displayWidth * scale;
  canvas.height = displayHeight * scale;
  
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  ctx.save();
  ctx.translate(displayWidth / 2, displayHeight / 2);
  
  const radius = Math.floor(Math.min(displayWidth, displayHeight) / 2) - 0.5;
  const rotationOffset = -Math.PI / 2;
  
  // Draw 24 white slices
  for (let i = 0; i < 24; i++) {
    const start = (i / 24) * 2 * Math.PI + rotationOffset;
    const end = ((i + 1) / 24) * 2 * Math.PI + rotationOffset;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
  
  // Draw activity sections
  activities.forEach(act => {
    const start = (act.from / 24) * 2 * Math.PI + rotationOffset;
    let end = (act.to / 24) * 2 * Math.PI + rotationOffset;
    if (act.to <= act.from) end += 2 * Math.PI;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = act.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.stroke();
  });
  
  drawClockHand(ctx, radius);
  
  ctx.restore();
}

function formatTime(decimalHour) {
  const hours = Math.floor(decimalHour) % 24;
  const minutes = Math.round((decimalHour % 1) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function createLegend() {
  const legend = document.getElementById('legend');
  legend.innerHTML = "";
  activities.forEach(act => {
    const duration = (act.to > act.from) ?
      act.to - act.from :
      24 - act.from + act.to;
    
    const line = document.createElement("div");
    line.className = "legend-line";
    line.innerHTML = `
      <div class="color-box" style="background-color: ${act.color}"></div>
      <div class="legend-text">
        <strong>${act.label}</strong>: ${formatTime(act.from)} - ${formatTime(act.to)} (${duration.toFixed(2)} hrs)
      </div>
    `;
    legend.appendChild(line);
  });
}

window.addEventListener('load', () => {
  resizeAndDraw();
  createLegend();
});

window.addEventListener('resize', resizeAndDraw);
setInterval(resizeAndDraw, 1000);
