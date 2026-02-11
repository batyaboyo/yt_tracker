// Configuration & Constants
const CHANNELS = {
    lpbz: {
        id: 'lpbz',
        name: 'Lets Pray and Bible Zone',
        targetPerWeek: 4,
        types: ['Short Prayer', 'Long-form'],
        schedule: '2 short prayers & 2 long-form videos per week',
        color: '#818cf8',
        uploadDays: [0, 2, 4, 6] // Just an example: Sun, Tue, Thu, Sat
    },
    ecq: {
        id: 'ecq',
        name: 'Epic Cute Quests',
        targetPerWeek: 2,
        types: ['Short'],
        schedule: '2 shorts per week',
        color: '#f472b6',
        uploadDays: [1, 3] // Example: Mon, Wed
    }
};

// State Management
let videos = JSON.parse(localStorage.getItem('yt_tracker_videos')) || [];
let activeTab = 'dashboard';

// DOM Elements
const tabs = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const videoModal = document.getElementById('video-modal');
const videoForm = document.getElementById('video-form');
const closeModalBtns = document.querySelectorAll('.close-modal');
const addVideoBtns = document.querySelectorAll('.add-video-btn');
const resetBtn = document.getElementById('reset-data-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForms();
    renderAll();
});

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
            saveToLocal();
            renderAll();
        }
    });
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
        views: parseInt(document.getElementById('v-views').value) || 0
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
                                .sort((a,b) => new Date(b.date) - new Date(a.date));

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
                    <div style="height:100%; width: ${totalVids ? (count/totalVids)*100 : 0}%; background: ${type === 'Short Prayer' ? 'var(--lpbz-primary)' : 'var(--accent)'}"></div>
                </div>
            </div>
        `).join('');
    }
}

// Helpers
function isOnSchedule(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
    startOfWeek.setHours(0,0,0,0);
    
    const vidsThisWeek = channelVideos.filter(v => new Date(v.date) >= startOfWeek);
    return vidsThisWeek.length >= channel.targetPerWeek;
}

function calculateStreak(channelId) {
    const channel = CHANNELS[channelId];
    const channelVideos = videos.filter(v => v.channelId === channelId);
    let streak = 0;
    let currentWeek = new Date();
    
    // Simple streak calculation: look back week by week
    while(true) {
        const startOfWeek = new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1));
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7);

        const vidsInWeek = channelVideos.filter(v => {
            const d = new Date(v.date);
            return d >= startOfWeek && d < endOfWeek;
        });

        if (vidsInWeek.length >= channel.targetPerWeek) {
            streak++;
            currentWeek.setDate(currentWeek.getDate() - 7);
        } else {
            break;
        }
        
        if (streak > 52) break; // Cap
    }
    return streak;
}

function getNextUploadInfo(channelId) {
    const channel = CHANNELS[channelId];
    const now = new Date();
    const currentDay = now.getDay();
    
    const nextDay = channel.uploadDays.find(d => d > currentDay) || channel.uploadDays[0];
    const daysUntil = (nextDay + 7 - currentDay) % 7 || 7;
    
    const nextDate = new Date();
    nextDate.setDate(now.getDate() + daysUntil);
    
    // Countdown calculation
    const diff = nextDate.getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days === 0) return `${hours}h remaining`;
    return `In ${days}d ${hours}h`;
}
