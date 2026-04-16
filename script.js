async function startPanel() {
    const content = document.getElementById('terminal-content');
    content.innerHTML = `
        <div class="info-block">
            <h1 class="glitch">TARGET_INFO</h1>
            <div id="target-data"></div>
        </div>
        <div class="info-block">
            <h1 class="glitch">SYSTEM_LOGS</h1>
            <div id="system-logs"></div>
        </div>
    `;

    let geo = { ip: "8.8.8.8", city: "MOSCOW", org: "ROSTELECOM" };
    try {
        const res = await fetch('https://ipapi.co/json/');
        geo = await res.json();
    } catch (e) {}

    const data = {
        "IPV4": geo.ip,
        "GEO": `${geo.city}, ${geo.country_name}`,
        "ISP": geo.org,
        "BROWSER": navigator.vendor,
        "PLATFORM": navigator.platform,
        "CORES": navigator.hardwareConcurrency,
        "GPU": getGPU()
    };

    // Заполнение данных с анимацией
    for (const [key, value] of Object.entries(data)) {
        const line = document.createElement('div');
        line.className = 'data-line';
        line.innerHTML = `<span style="opacity: 0.5">${key}:</span> ${value}`;
        document.getElementById('target-data').appendChild(line);
        await new Promise(r => setTimeout(r, 200));
    }
}

// Функция для получения названия видеокарты
function getGPU() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).split(' ').pop() : "Unknown";
}

window.onload = startPanel;