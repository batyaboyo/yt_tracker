// Configuration & Constants
const API_KEY = 'AIzaSyDioQzo_L1ntXG43T4ADLUkslRhcmccf-A';
const CHANNELS = {
    lpbz: {
        id: 'lpbz',
        channelId: 'UCScdEW9zdV25rmeMFm-DzRw', // Let's Pray and Bible Zone
        name: 'Lets Pray and Bible Zone',
        targetPerWeek: 4,
        types: ['Short Prayer', 'Long-form'],
        schedule: '2 short prayers & 2 long-form videos per week',
        color: '#818cf8',
        uploadDays: [0, 2, 4, 6] // Sun, Tue, Thu, Sat
    },
    ecq: {
        id: 'ecq',
        channelId: 'UC9xco5rz9PCBTp8uEF7IbGg', // Correct ID for Epic Cute Quests
        name: 'Epic Cute Quests',
        targetPerWeek: 2,
        types: ['Short'],
        schedule: '2 shorts per week',
        color: '#f472b6',
        uploadDays: [1, 3] // Mon, Wed
    }
};

// State Management
let videos = JSON.parse(localStorage.getItem('yt_tracker_videos')) || [];
let activeTab = 'dashboard';
let lastSync = localStorage.getItem('yt_tracker_last_sync') || 'Never';

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

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForms();
    updateSyncStatusDisplay();
    renderAll();

    // Auto-sync if it's been more than 1 hour or never synced
    checkAutoSync();
});

// Sync Logic
async function syncWithYouTube() {
    syncBtn.disabled = true;
    syncBtn.innerText = 'Syncing...';

    try {
        for (const channelKey in CHANNELS) {
            const channel = CHANNELS[channelKey];
            await fetchChannelVideos(channel);
        }

        lastSync = new Date().toLocaleString();
        localStorage.setItem('yt_tracker_last_sync', lastSync);
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

async function fetchChannelVideos(channel) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}&maxResults=20&order=date&type=video&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
        // Clear old API data for THIS channel to remove any previous incorrect IDs
        videos = videos.filter(v => v.channelId !== channel.id || !v.isApiData);

        // To get view counts, we need the "videos" endpoint
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
                    // Detect type: common pattern for shorts is #shorts or duration < 60s
                    type: detectVideoType(channel.id, item),
                    views: parseInt(item.statistics.viewCount) || 0,
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
    const duration = item.contentDetails.duration; // e.g. PT1M30S

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

    if (!lastSyncTime || now - parseInt(lastSyncTime) > 3600000) { // 1 hour
        syncWithYouTube();
        localStorage.setItem('yt_tracker_last_sync_timestamp', now.toString());
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
        btn.addEventListener('click', () => {
            const channelId = btn.dataset.channel;
            openModal(channelId);
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            videoModal.classList.remove('active');
        });
    });

    videoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveVideo();
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            videos = [];
            lastSync = 'Never';
            localStorage.removeItem('yt_tracker_last_sync');
            localStorage.removeItem('yt_tracker_last_sync_timestamp');
            saveToLocal();
            updateSyncStatusDisplay();
            renderAll();
        }
    });

    syncBtn.addEventListener('click', syncWithYouTube);
}

function openModal(channelId, videoId = null) {
    const channel = CHANNELS[channelId];
    document.getElementById('modal-title').innerText = videoId ? 'Edit Video' : 'Log New Video';
    document.getElementById('video-channel').value = channelId;
    document.getElementById('video-id').value = videoId || '';

    // Set default date to today
    document.getElementById('v-date').value = new Date().toISOString().split('T')[0];

    // Populate types
    const typeSelect = document.getElementById('v-type');
    typeSelect.innerHTML = channel.types.map(t => `<option value="${t}">${t}</option>`).join('');

    if (videoId) {
        const video = videos.find(v => v.id === videoId);
        if (video) {
            document.getElementById('v-title').value = video.title;
            document.getElementById('v-date').value = video.date;
            document.getElementById('v-type').value = video.type;
            document.getElementById('v-views').value = video.views;
        }
    } else {
        videoForm.reset();
        document.getElementById('v-date').value = new Date().toISOString().split('T')[0];
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

function saveToLocal() {
    localStorage.setItem('yt_tracker_videos', JSON.stringify(videos));
}

// Rendering Logic
function renderAll() {
    renderGlobalStats();
    if (activeTab === 'dashboard') {
        renderDashboard();
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
        <div class="stat-item">
            <span class="stat-value">${totalVideos}</span>
            <span class="stat-label">Total Videos</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalViews.toLocaleString()}</span>
            <span class="stat-label">Total Views</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${avgViews.toLocaleString()}</span>
            <span class="stat-label">Avg Views</span>
        </div>
    `;
}

function renderDashboard() {
    const lpbzVideos = videos.filter(v => v.channelId === 'lpbz');
    const ecqVideos = videos.filter(v => v.channelId === 'ecq');

    renderChannelCard('lpbz', lpbzVideos);
    renderChannelCard('ecq', ecqVideos);

    // Summary banner
    const lpbzOnSchedule = isOnSchedule('lpbz', lpbzVideos);
    const ecqOnSchedule = isOnSchedule('ecq', ecqVideos);

    const banner = document.getElementById('dashboard-banner');
    if (lpbzOnSchedule && ecqOnSchedule) {
        banner.innerHTML = `<p>🔥 <strong>Amazing job!</strong> Both channels are currently on schedule for this week.</p>`;
        banner.style.borderLeftColor = 'var(--success)';
    } else if (!lpbzOnSchedule && !ecqOnSchedule) {
        banner.innerHTML = `<p>⚠️ <strong>Time to catch up!</strong> You haven't met your upload goals for either channel this week.</p>`;
        banner.style.borderLeftColor = 'var(--danger)';
    } else {
        const on = lpbzOnSchedule ? 'Lets Pray & Bible Zone' : 'Epic Cute Quests';
        banner.innerHTML = `<p>✨ <strong>Keep it up!</strong> ${on} is on schedule. Don't forget your other channel!</p>`;
        banner.style.borderLeftColor = 'var(--warning)';
    }
}

function renderChannelCard(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    const card = document.getElementById(`card-${channelId}`);
    const nextUpload = getNextUploadInfo(channelId);
    const schedStatus = isOnSchedule(channelId, channelVideos);

    card.innerHTML = `
        <h3>${channel.name}</h3>
        <div class="channel-card-stat">
            <span>Weekly Goal</span>
            <span>${channel.schedule}</span>
        </div>
        <div class="channel-card-stat">
            <span>Total Uploads</span>
            <span>${channelVideos.length} videos</span>
        </div>
        <div class="channel-card-stat">
            <span>Status</span>
            <span class="${schedStatus ? 'on-schedule' : 'off-schedule'}">
                ${schedStatus ? '✓ On Schedule' : '○ Behind Schedule'}
            </span>
        </div>
        <div class="channel-card-stat">
            <span>Next Upload</span>
            <span>${nextUpload}</span>
        </div>
    `;
}

function renderChannelView(channelId) {
    const channel = CHANNELS[channelId];
    const channelVideos = videos.filter(v => v.channelId === channelId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render Stats
    const totalVids = channelVideos.length;
    const totalViews = channelVideos.reduce((sum, v) => sum + v.views, 0);
    const avgViews = totalVids ? Math.round(totalViews / totalVids) : 0;
    const streak = calculateStreak(channelId);

    const statsContainer = document.getElementById(`${channelId}-stats`);
    statsContainer.innerHTML = `
        <div class="stat-card">
            <span class="value">${totalVids}</span>
            <span class="label">Total Videos</span>
        </div>
        <div class="stat-card">
            <span class="value">${avgViews.toLocaleString()}</span>
            <span class="label">Average Views</span>
        </div>
        <div class="stat-card">
            <span class="value">${streak}</span>
            <span class="label">Week Streak</span>
        </div>
    `;

    // Render History
    const tbody = document.querySelector(`#${channelId}-history tbody`);
    tbody.innerHTML = channelVideos.map(v => `
        <tr>
            <td>${v.title}</td>
            <td>${new Date(v.date).toLocaleDateString()}</td>
            <td><span class="type-tag type-${v.type.toLowerCase().replace(' ', '-')}">${v.type}</span></td>
            <td>${v.views.toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="openModal('${channelId}', '${v.id}')">Edit</button>
                <button class="btn btn-sm btn-outline" style="color: var(--danger)" onclick="deleteVideo('${v.id}')">Delete</button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="5" style="text-align:center">No videos logged yet.</td></tr>';

    // Render Breakdown (if LPBZ)
    if (channelId === 'lpbz') {
        const breakdown = document.getElementById('lpbz-breakdown');
        const counts = {};
        channel.types.forEach(t => counts[t] = channelVideos.filter(v => v.type === t).length);

        breakdown.innerHTML = Object.entries(counts).map(([type, count]) => `
            <div class="breakdown-item" style="margin-bottom: 1rem">
                <div style="display:flex; justify-content:space-between; margin-bottom: 0.2rem">
                    <span>${type}</span>
                    <span>${count}</span>
                </div>
                <div style="height: 8px; background: var(--bg-dark); border-radius: 4px; overflow:hidden">
                    <div style="height:100%; width: ${totalVids ? (count / totalVids) * 100 : 0}%; background: ${type === 'Short Prayer' ? 'var(--lpbz-primary)' : 'var(--accent)'}"></div>
                </div>
            </div>
        `).join('');
    }
}

// Helpers
function isOnSchedule(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    const now = new Date();
    // Get start of current week (Monday)
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const vidsThisWeek = channelVideos.filter(v => new Date(v.date) >= startOfWeek);
    return vidsThisWeek.length >= channel.targetPerWeek;
}

function calculateStreak(channelId) {
    const channel = CHANNELS[channelId];
    const channelVideos = videos.filter(v => v.channelId === channelId);
    let streak = 0;
    let currentWeekStart = new Date();
    const day = currentWeekStart.getDay();
    const diff = currentWeekStart.getDate() - day + (day === 0 ? -6 : 1);
    currentWeekStart.setDate(diff);
    currentWeekStart.setHours(0, 0, 0, 0);

    while (true) {
        const endOfWeek = new Date(currentWeekStart);
        endOfWeek.setDate(endOfWeek.getDate() + 7);

        const vidsInWeek = channelVideos.filter(v => {
            const d = new Date(v.date);
            return d >= currentWeekStart && d < endOfWeek;
        });

        if (vidsInWeek.length >= channel.targetPerWeek) {
            streak++;
            currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        } else {
            // Check if we are currently in the middle of a week and haven't failed yet
            const now = new Date();
            if (streak === 0 && now >= currentWeekStart && now < endOfWeek) {
                // Still in progress, don't break yet, but streak is 0
                currentWeekStart.setDate(currentWeekStart.getDate() - 7);
                continue;
            }
            break;
        }

        if (streak > 52) break; // Cap at 1 year
    }
    return streak;
}

function getNextUploadInfo(channelId) {
    const channel = CHANNELS[channelId];
    const now = new Date();
    const currentDay = now.getDay();

    const nextDay = channel.uploadDays.find(d => d > currentDay) ?? channel.uploadDays[0];
    const daysUntil = (nextDay + 7 - currentDay) % 7 || 7;

    const nextDate = new Date();
    nextDate.setDate(now.getDate() + daysUntil);
    nextDate.setHours(12, 0, 0, 0); // Assume noon

    const diff = nextDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days === 0) return `${hours}h remaining`;
    return `In ${days}d ${hours}h`;
}
