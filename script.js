// Configuration & Constants
let API_KEY = localStorage.getItem('yt_tracker_api_key') || 'AIzaSyDioQzo_L1ntXG43T4ADLUkslRhcmccf-A';
const CHANNELS = {
    lpbz: {
        id: 'lpbz',
        channelId: localStorage.getItem('yt_tracker_cid_lpbz') || 'UCScdEW9zdV25rmeMFm-DzRw',
        name: 'Lets Pray and Bible Zone',
        targetPerWeek: 4,
        types: ['Short Prayer', 'Long-form'],
        schedule: '2 short prayers & 2 long-form videos per week',
        color: '#818cf8',
        uploadDays: [0, 2, 4, 6],
        subscribers: 0
    },
    ecq: {
        id: 'ecq',
        channelId: localStorage.getItem('yt_tracker_cid_ecq') || 'UC9xco5rz9PCBTp8uEF7IbGg',
        name: 'Epic Cute Quests',
        targetPerWeek: 2,
        types: ['Short'],
        schedule: '2 shorts per week',
        color: '#f472b6',
        uploadDays: [1, 3],
        subscribers: 0
    }
};

// State Management
let videos = JSON.parse(localStorage.getItem('yt_tracker_videos')) || [];
let ideas = JSON.parse(localStorage.getItem('yt_tracker_ideas')) || [];
let subsHistory = JSON.parse(localStorage.getItem('yt_tracker_subs_history')) || { lpbz: [], ecq: [] };
let activeTab = 'dashboard';
let lastSync = localStorage.getItem('yt_tracker_last_sync') || 'Never';
let charts = {};

// DOM Elements
const tabs = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const videoModal = document.getElementById('video-modal');
const videoForm = document.getElementById('video-form');
const closeModalBtns = document.querySelectorAll('.close-modal');
const addVideoBtns = document.querySelectorAll('.add-video-btn');
const resetBtn = document.getElementById('reset-data-btn');
const syncBtn = document.getElementById('sync-youtube-btn');
const syncStatusEl = document.getElementById('sync-status');
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTabs();
    initForms();
    initSettings();
    initIdeaBank();
    updateSyncStatusDisplay();
    renderAll();
    checkAutoSync();
});

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('yt_tracker_theme') || 'dark';
    document.body.className = `${savedTheme}-theme`;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.className = `${newTheme}-theme`;
        localStorage.setItem('yt_tracker_theme', newTheme);
        renderAll();
    });
}

// Sync Logic
async function syncWithYouTube() {
    syncBtn.disabled = true;
    syncBtn.innerText = 'Syncing...';
    try {
        for (const channelKey in CHANNELS) {
            const channel = CHANNELS[channelKey];
            await fetchChannelData(channel);
            await fetchChannelVideos(channel);
        }
        lastSync = new Date().toLocaleString();
        localStorage.setItem('yt_tracker_last_sync', lastSync);
        localStorage.setItem('yt_tracker_last_sync_timestamp', Date.now().toString());
        updateSyncStatusDisplay();
    } catch (error) {
        console.error('Sync failed:', error);
        alert('YouTube Sync failed. Please check your API key or connection.');
    } finally {
        syncBtn.disabled = false;
        syncBtn.innerText = 'Sync YouTube';
        renderAll();
    }
}

async function fetchChannelData(channel) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel.channelId}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        const subCount = parseInt(data.items[0].statistics.subscriberCount) || 0;
        channel.subscribers = subCount;
        localStorage.setItem(`yt_tracker_subs_${channel.id}`, subCount);

        // Log history
        const today = new Date().toISOString().split('T')[0];
        const lastEntry = subsHistory[channel.id][subsHistory[channel.id].length - 1];
        if (!lastEntry || lastEntry.date !== today) {
            subsHistory[channel.id].push({ date: today, count: subCount });
            if (subsHistory[channel.id].length > 30) subsHistory[channel.id].shift(); // Keep 30 days
            localStorage.setItem('yt_tracker_subs_history', JSON.stringify(subsHistory));
        }
    }
}

async function fetchChannelVideos(channel) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}&maxResults=20&order=date&type=video&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
        videos = videos.filter(v => v.channelId !== channel.id || !v.isApiData);
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        if (statsData.items) {
            statsData.items.forEach(item => {
                const videoData = {
                    id: item.id,
                    channelId: channel.id,
                    title: item.snippet.title,
                    date: item.snippet.publishedAt.split('T')[0],
                    type: detectVideoType(channel.id, item),
                    views: parseInt(item.statistics.viewCount) || 0,
                    likes: parseInt(item.statistics.likeCount) || 0,
                    comments: parseInt(item.statistics.commentCount) || 0,
                    thumbnail: item.snippet.thumbnails.default.url,
                    status: 'Live',
                    checklist: { seo: true, thumb: true, playlist: true, desc: true },
                    isApiData: true
                };
                videos.push(videoData);
            });
        }
        saveToLocal();
    }
}

function detectVideoType(channelKey, item) {
    const title = item.snippet.title.toLowerCase();
    if (channelKey === 'lpbz') {
        if (title.includes('prayer') || title.includes('short')) return 'Short Prayer';
        return 'Long-form';
    } else {
        return 'Short';
    }
}

function updateSyncStatusDisplay() {
    syncStatusEl.innerText = `Last synced: ${lastSync}`;
}

function checkAutoSync() {
    const lastSyncTime = localStorage.getItem('yt_tracker_last_sync_timestamp');
    const now = Date.now();
    for (const channelKey in CHANNELS) {
        CHANNELS[channelKey].subscribers = parseInt(localStorage.getItem(`yt_tracker_subs_${channelKey}`)) || 0;
    }
    if (!lastSyncTime || now - parseInt(lastSyncTime) > 3600000) {
        syncWithYouTube();
    }
}

// Tab Logic
function initTabs() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${activeTab}`) {
                    content.classList.add('active');
                }
            });
            renderAll();
        });
    });
}

// Form Logic
function initForms() {
    addVideoBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.channel));
    });
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoForm.reset();
        });
    });
    videoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveVideo();
    });
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            videos = [];
            ideas = [];
            subsHistory = { lpbz: [], ecq: [] };
            lastSync = 'Never';
            localStorage.clear();
            saveToLocal();
            updateSyncStatusDisplay();
            renderAll();
        }
    });
    syncBtn.addEventListener('click', syncWithYouTube);
}

function openModal(channelId, videoId = null, ideaData = null) {
    const channel = CHANNELS[channelId];
    videoForm.reset();
    document.getElementById('modal-title').innerText = videoId ? 'Edit Video' : (ideaData ? 'Promote Idea to Video' : 'Log New Video');
    document.getElementById('video-channel').value = channelId;
    document.getElementById('video-id').value = videoId || '';
    document.getElementById('v-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('v-type').innerHTML = channel.types.map(t => `<option value="${t}">${t}</option>`).join('');
    document.getElementById('v-notes').value = '';

    if (ideaData) {
        document.getElementById('v-title').value = ideaData.title;
        document.getElementById('v-notes').value = ideaData.description;
        document.getElementById('v-status').value = 'Planned';
    }

    if (videoId) {
        const video = videos.find(v => v.id === videoId);
        if (video) {
            document.getElementById('v-title').value = video.title;
            document.getElementById('v-date').value = video.date;
            document.getElementById('v-type').value = video.type;
            document.getElementById('v-views').value = video.views;
            document.getElementById('v-status').value = video.status || 'Live';
            document.getElementById('v-notes').value = video.notes || '';

            if (video.checklist) {
                document.getElementById('check-seo').checked = video.checklist.seo;
                document.getElementById('check-thumb').checked = video.checklist.thumb;
                document.getElementById('check-playlist').checked = video.checklist.playlist;
                document.getElementById('check-desc').checked = video.checklist.desc;
            }
        }
    }
    videoModal.classList.add('active');
}

function saveVideo() {
    const id = document.getElementById('video-id').value;
    const channelId = document.getElementById('video-channel').value;
    const videoData = {
        id: id || Date.now().toString(),
        channelId: channelId,
        title: document.getElementById('v-title').value,
        date: document.getElementById('v-date').value,
        type: document.getElementById('v-type').value,
        views: parseInt(document.getElementById('v-views').value) || 0,
        status: document.getElementById('v-status').value,
        notes: document.getElementById('v-notes').value,
        thumbnail: 'https://via.placeholder.com/120x68?text=Planned',
        checklist: {
            seo: document.getElementById('check-seo').checked,
            thumb: document.getElementById('check-thumb').checked,
            playlist: document.getElementById('check-playlist').checked,
            desc: document.getElementById('check-desc').checked
        },
        likes: 0,
        comments: 0,
        isApiData: false
    };

    if (id) {
        const index = videos.findIndex(v => v.id === id);
        videos[index] = videoData;
    } else {
        videos.push(videoData);
    }
    saveToLocal();
    videoModal.classList.remove('active');
    renderAll();
}

function deleteVideo(id) {
    if (confirm('Delete this video entry?')) {
        videos = videos.filter(v => v.id !== id);
        saveToLocal();
        renderAll();
    }
}

// Idea Bank Logic
function initIdeaBank() {
    document.getElementById('add-idea-btn').addEventListener('click', () => {
        const title = prompt('Idea Title:');
        if (!title) return;
        const desc = prompt('Short Description/Notes:');
        const channelId = prompt('Channel (lpbz/ecq):', 'lpbz');

        ideas.push({
            id: Date.now().toString(),
            title: title,
            description: desc || '',
            channelId: channelId === 'ecq' ? 'ecq' : 'lpbz',
            date: new Date().toISOString().split('T')[0]
        });
        saveToLocal();
        renderAll();
    });
}

function promoteIdea(id) {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
        openModal(idea.channelId, null, idea);
        // Remove idea after promotion (optional, or keep it until saved)
        // ideas = ideas.filter(i => i.id !== id);
    }
}

function deleteIdea(id) {
    if (confirm('Delete this idea?')) {
        ideas = ideas.filter(i => i.id !== id);
        saveToLocal();
        renderAll();
    }
}

function saveToLocal() {
    localStorage.setItem('yt_tracker_videos', JSON.stringify(videos));
    localStorage.setItem('yt_tracker_ideas', JSON.stringify(ideas));
}

// Settings Logic
function initSettings() {
    const apiKeyInput = document.getElementById('set-api-key');
    apiKeyInput.value = API_KEY;

    document.getElementById('save-api-key-btn').addEventListener('click', () => {
        const newKey = apiKeyInput.value.trim();
        if (newKey) {
            API_KEY = newKey;
            localStorage.setItem('yt_tracker_api_key', API_KEY);
            alert('API Key saved successfully!');
        }
    });

    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('import-data-btn').addEventListener('click', () => {
        document.getElementById('import-file-input').click();
    });

    document.getElementById('import-file-input').addEventListener('change', importData);

    renderSettings();
}

function renderSettings() {
    const list = document.getElementById('settings-channels-list');
    if (!list) return;
    list.innerHTML = Object.entries(CHANNELS).map(([key, ch]) => `
        <div class="channel-setting-item">
            <div class="channel-setting-info">
                <strong>${ch.name}</strong>
                <span>ID: ${ch.channelId}</span>
            </div>
            <div style="display: flex; gap: 0.5rem">
                <input type="text" class="channel-setting-input" value="${ch.channelId}" placeholder="New Channel ID" id="input-cid-${key}">
                <button class="btn btn-primary btn-sm" onclick="updateChannelId('${key}')">Update</button>
            </div>
        </div>
    `).join('');
}

function updateChannelId(key) {
    const newId = document.getElementById(`input-cid-${key}`).value.trim();
    if (newId) {
        CHANNELS[key].channelId = newId;
        localStorage.setItem(`yt_tracker_cid_${key}`, newId);
        alert(`${CHANNELS[key].name} ID updated!`);
        renderSettings();
    }
}

function exportData() {
    const data = {
        videos: videos,
        ideas: ideas,
        subsHistory: subsHistory,
        apiKey: API_KEY,
        settings: {
            lpbz_id: CHANNELS.lpbz.channelId,
            ecq_id: CHANNELS.ecq.channelId,
            lastSync: lastSync,
            theme: localStorage.getItem('yt_tracker_theme') || 'dark'
        }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yt_tracker_creator_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (data.videos) {
                videos = data.videos;
                ideas = data.ideas || [];
                subsHistory = data.subsHistory || { lpbz: [], ecq: [] };
                saveToLocal();
                if (data.apiKey) {
                    API_KEY = data.apiKey;
                    localStorage.setItem('yt_tracker_api_key', API_KEY);
                }
                if (data.settings) {
                    if (data.settings.lpbz_id) localStorage.setItem('yt_tracker_cid_lpbz', data.settings.lpbz_id);
                    if (data.settings.ecq_id) localStorage.setItem('yt_tracker_cid_ecq', data.settings.ecq_id);
                    if (data.settings.theme) localStorage.setItem('yt_tracker_theme', data.settings.theme);
                }
                alert('Data imported successfully! The page will reload.');
                window.location.reload();
            } else {
                alert('Invalid backup file.');
            }
        } catch (err) {
            alert('Error parsing backup file.');
        }
    };
    reader.readAsText(file);
}

// Rendering Logic
function renderAll() {
    renderGlobalStats();
    if (activeTab === 'dashboard') {
        renderDashboard();
    } else if (activeTab === 'settings') {
        renderSettings();
    } else {
        renderChannelView(activeTab);
    }
}

function renderGlobalStats() {
    const totalVideos = videos.length;
    const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
    const avgViews = totalVideos ? Math.round(totalViews / totalVideos) : 0;
    const container = document.getElementById('global-stats-summary');
    container.innerHTML = `
        <div class="stat-item"><span class="stat-value">${totalVideos}</span><span class="stat-label">Videos</span></div>
        <div class="stat-item"><span class="stat-value">${totalViews.toLocaleString()}</span><span class="stat-label">Views</span></div>
        <div class="stat-item"><span class="stat-value">${avgViews.toLocaleString()}</span><span class="stat-label">Avg Views</span></div>
    `;
}

function renderDashboard() {
    renderChannelCard('lpbz', videos.filter(v => v.channelId === 'lpbz'));
    renderChannelCard('ecq', videos.filter(v => v.channelId === 'ecq'));

    // Idea Bank
    const ideaList = document.getElementById('idea-list');
    ideaList.innerHTML = ideas.map(idea => `
        <div class="idea-item idea-${idea.channelId}">
            <div>
                <span class="status-tag status-planned" style="margin-bottom:0.5rem">${CHANNELS[idea.channelId].name}</span>
                <h4>${idea.title}</h4>
                <p>${idea.description || 'No description provided.'}</p>
            </div>
            <div class="idea-actions">
                <button class="btn btn-sm btn-outline" onclick="promoteIdea('${idea.id}')">Promote</button>
                <button class="btn btn-sm btn-outline" style="color:var(--danger)" onclick="deleteIdea('${idea.id}')">Delete</button>
            </div>
        </div>
    `).join('') || '<p style="color:var(--text-muted); grid-column:1/-1">No ideas in the bank yet. Start brainstorming!</p>';

    updateBanner();
    setTimeout(initComparisonChart, 0);
}

function renderChannelCard(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    const card = document.getElementById(`card-${channelId}`);
    const nextUpload = getNextUploadInfo(channelId);
    const schedStatus = isOnSchedule(channelId, channelVideos);
    card.innerHTML = `
        <h3>${channel.name}</h3>
        <div class="channel-card-stat"><span>Subscribers</span><span>${channel.subscribers.toLocaleString()}</span></div>
        <div class="channel-card-stat"><span>Weekly Goal</span><span>${channel.schedule}</span></div>
        <div class="channel-card-stat"><span>Status</span><span class="${schedStatus ? 'on-schedule' : 'off-schedule'}">${schedStatus ? '✓ On Schedule' : '○ Behind Schedule'}</span></div>
        <div class="channel-card-stat"><span>Next Upload</span><span>${nextUpload}</span></div>
    `;
}

function renderChannelView(channelId) {
    const channel = CHANNELS[channelId];
    const channelVideos = videos.filter(v => v.channelId === channelId).sort((a, b) => new Date(b.date) - new Date(a.date));
    const liveVideos = channelVideos.filter(v => v.status === 'Live');
    const plannedVideos = channelVideos.filter(v => v.status === 'Planned');

    const totalVids = liveVideos.length;
    const totalViews = liveVideos.reduce((sum, v) => sum + v.views, 0);
    const avgViews = totalVids ? Math.round(totalViews / totalVids) : 0;
    const streak = calculateStreak(channelId);

    document.getElementById(`${channelId}-stats`).innerHTML = `
        <div class="stat-card"><span class="value">${channel.subscribers.toLocaleString()}</span><span class="label">Subscribers</span></div>
        <div class="stat-card"><span class="value">${totalVids}</span><span class="label">Total Videos</span></div>
        <div class="stat-card"><span class="value">${avgViews.toLocaleString()}</span><span class="label">Avg Views</span></div>
        <div class="stat-card"><span class="value">${streak}</span><span class="label">Week Streak</span></div>
    `;

    const productionList = document.getElementById(`${channelId}-production`);
    productionList.innerHTML = plannedVideos.map(v => {
        const doneCount = Object.values(v.checklist || {}).filter(Boolean).length;
        return `
            <div class="production-item">
                <div class="production-info">
                    <h4>${v.title}</h4>
                    <p>Planned for: ${new Date(v.date).toLocaleDateString()}</p>
                </div>
                <div class="production-actions">
                    <span class="status-tag status-planned">${doneCount}/4 Ready</span>
                    <button class="btn btn-sm btn-outline" onclick="openModal('${channelId}', '${v.id}')">Edit</button>
                </div>
            </div>
        `;
    }).join('') || '<p style="color:var(--text-muted); font-size:0.85rem">No planned videos.</p>';

    renderIntelligence(channelId, liveVideos);

    const tbody = document.querySelector(`#${channelId}-history tbody`);
    tbody.innerHTML = liveVideos.map(v => `
        <tr>
            <td class="thumbnail-cell"><img src="${v.thumbnail || ''}" class="thumbnail-img"></td>
            <td>${v.title}</td>
            <td>${new Date(v.date).toLocaleDateString()}</td>
            <td><span class="type-tag type-${v.type.toLowerCase().replace(' ', '-')}">${v.type}</span></td>
            <td>${v.views.toLocaleString()}</td>
            <td><span class="status-tag status-live">Live</span></td>
            <td>${(v.likes || 0).toLocaleString()}</td>
            <td>${(v.comments || 0).toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="openModal('${channelId}', '${v.id}')">Edit</button>
                <button class="btn btn-sm btn-outline" style="color:var(--danger)" onclick="deleteVideo('${v.id}')">Delete</button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="9" style="text-align:center">No live videos yet.</td></tr>';

    if (channelId === 'lpbz') renderBreakdown(liveVideos);
    setTimeout(() => initChart(channelId, liveVideos), 0);
}

function renderIntelligence(channelId, liveVideos) {
    const channel = CHANNELS[channelId];
    const totalViews = liveVideos.reduce((sum, v) => sum + v.views, 0);
    const avgViews = liveVideos.length ? totalViews / liveVideos.length : 0;
    const engagementScore = channel.subscribers ? (avgViews / channel.subscribers * 10).toFixed(2) : 0;

    const dayViews = [0, 0, 0, 0, 0, 0, 0], dayCounts = [0, 0, 0, 0, 0, 0, 0];
    liveVideos.forEach(v => {
        const d = new Date(v.date).getDay();
        dayViews[d] += v.views;
        dayCounts[d]++;
    });

    let bIdx = -1, mAvg = 0;
    dayViews.forEach((v, i) => {
        const a = dayCounts[i] ? v / dayCounts[i] : 0;
        if (a > mAvg) { mAvg = a; bIdx = i; }
    });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bestDay = bIdx !== -1 ? days[bIdx] : 'N/A';

    document.getElementById(`${channelId}-intelligence`).innerHTML = `
        <div class="intel-item"><span class="intel-value">${engagementScore}</span><span class="intel-label">Engagement Score</span></div>
        <div class="intel-item"><span class="intel-value" style="font-size: 1.1rem">${bestDay}</span><span class="intel-label">Best Upload Day</span></div>
        <div class="intel-item"><span class="intel-value">${Math.max(0, 1000 - channel.subscribers % 1000)}</span><span class="intel-label">Next 1k Milestone</span></div>
    `;
}

function renderBreakdown(channelVideos) {
    const counts = {};
    CHANNELS.lpbz.types.forEach(t => counts[t] = channelVideos.filter(v => v.type === t).length);
    const total = channelVideos.length;
    document.getElementById('lpbz-breakdown').innerHTML = Object.entries(counts).map(([type, count]) => `
        <div class="breakdown-item" style="margin-bottom: 1rem">
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.2rem"><span>${type}</span><span>${count}</span></div>
            <div style="height: 8px; background: var(--bg-dark); border-radius: 4px; overflow:hidden">
                <div style="height:100%; width: ${total ? (count / total) * 100 : 0}%; background: ${type === 'Short Prayer' ? 'var(--lpbz-primary)' : 'var(--accent)'}"></div>
            </div>
        </div>
    `).join('');
}

function initChart(channelId, liveVideos) {
    const canvas = document.getElementById(`${channelId}-chart`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (charts[channelId]) charts[channelId].destroy();
    if (liveVideos.length === 0) return;

    const last7 = liveVideos.slice(0, 7).reverse();
    const isLight = document.body.classList.contains('light-theme');

    charts[channelId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7.map(v => new Date(v.date).toLocaleDateString()),
            datasets: [{
                label: 'Views',
                data: last7.map(v => v.views),
                borderColor: CHANNELS[channelId].color,
                backgroundColor: CHANNELS[channelId].color + '33',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: isLight ? '#e2e8f0' : '#334155' },
                    ticks: { color: isLight ? '#64748b' : '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: isLight ? '#64748b' : '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            }
        }
    });
}

function initComparisonChart() {
    const canvas = document.getElementById('comparison-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (charts['comparison']) charts['comparison'].destroy();

    const isLight = document.body.classList.contains('light-theme');
    const datasets = [];

    for (const key in CHANNELS) {
        const liveVids = videos.filter(v => v.channelId === key && v.status === 'Live').slice(0, 7).reverse();
        if (liveVids.length > 0) {
            datasets.push({
                label: CHANNELS[key].name,
                data: liveVids.map(v => v.views),
                borderColor: CHANNELS[key].color,
                backgroundColor: CHANNELS[key].color + '33',
                tension: 0.4,
                fill: false
            });
        }
    }

    charts['comparison'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 7 }, (_, i) => `Video ${i + 1}`),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: isLight ? '#e2e8f0' : '#334155' },
                    ticks: { color: isLight ? '#64748b' : '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: isLight ? '#64748b' : '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: true, labels: { color: isLight ? '#1e293b' : '#f1f5f9' } }
            }
        }
    });
}

function updateBanner() {
    const lOn = isOnSchedule('lpbz', videos.filter(v => v.channelId === 'lpbz' && v.status === 'Live'));
    const eOn = isOnSchedule('ecq', videos.filter(v => v.channelId === 'ecq' && v.status === 'Live'));
    const banner = document.getElementById('dashboard-banner');
    if (!banner) return;
    if (lOn && eOn) {
        banner.innerHTML = `<p>🔥 <strong>Amazing!</strong> Both channels are on schedule.</p>`;
        banner.style.borderLeftColor = 'var(--success)';
    } else {
        banner.innerHTML = `<p>✨ Keep it up! Consistency is key to growing your audience.</p>`;
        banner.style.borderLeftColor = 'var(--warning)';
    }
}

function isOnSchedule(channelId, channelVideos) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
    startOfWeek.setHours(0, 0, 0, 0);
    return channelVideos.filter(v => new Date(v.date) >= startOfWeek).length >= CHANNELS[channelId].targetPerWeek;
}

function calculateStreak(channelId) {
    const liveVids = videos.filter(v => v.channelId === channelId && v.status === 'Live');
    let streak = 0, currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay() === 0 ? 6 : currentWeekStart.getDay() - 1));
    currentWeekStart.setHours(0, 0, 0, 0);

    while (streak < 52) {
        const vids = liveVids.filter(v => {
            const d = new Date(v.date);
            return d >= currentWeekStart && d < new Date(currentWeekStart.getTime() + 7 * 86400000);
        });
        if (vids.length >= CHANNELS[channelId].targetPerWeek) {
            streak++;
            currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        } else break;
    }
    return streak;
}

function getNextUploadInfo(channelId) {
    const ch = CHANNELS[channelId], now = new Date(), currentDay = now.getDay();
    const nextDay = ch.uploadDays.find(d => d > currentDay) ?? ch.uploadDays[0];
    const daysUntil = (nextDay + 7 - currentDay) % 7 || 7;
    return `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
}

// Global functions for inline Event Listeners
window.deleteVideo = deleteVideo;
window.openModal = openModal;
window.updateChannelId = updateChannelId;
window.promoteIdea = promoteIdea;
window.deleteIdea = deleteIdea;
