// Configuration & Constants
let API_KEYS = safeJSONParse('yt_tracker_api_keys', ['AIzaSyCxeLcxccx2O5ZZyIPszKM_egCVyZI6HhA']);
let currentKeyIndex = 0;

function getApiKey() {
    return API_KEYS[currentKeyIndex] || '';
}

function rotateApiKey() {
    if (API_KEYS.length > 1) {
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        console.log(`📡 Switched to API Key #${currentKeyIndex + 1}`);
        return true;
    }
    return false;
}
const CHANNELS = {
    lpbz: {
        id: 'lpbz',
        channelId: localStorage.getItem('yt_tracker_cid_lpbz') || 'UCScdEW9zdV25rmeMFm-DzRw',
        name: 'Lets Pray and Bible Zone',
        targetPerWeek: 4,
        types: ['Short Prayer', 'Long-form'],
        schedule: 'Mon, Fri (Shorts) | Wed, Sun (Long-form) @ 8pm EAT',
        color: '#818cf8',
        uploadDays: [1, 3, 5, 0],
        subscribers: 0,
        searchFocus: '',
        competitors: [
            {
                name: "Tales by Monisha",
                note: "Cultural fables & moral stories",
                topContent: [
                    { title: "Don't Share Everything | A Deep Moral Story About Trust", views: "733K", url: "https://www.youtube.com/results?search_query=Tales+by+Monisha+Don%27t+Share+Everything" },
                    { title: "You're Not Less Than Anyone | Life-Changing Moral Story", views: "37K", url: "https://www.youtube.com/results?search_query=Tales+by+Monisha+You%27re+Not+Less+Than+Anyone" },
                    { title: "Use Mind, Not Muscle | A Powerful Jungle Lesson", views: "25K", url: "https://www.youtube.com/results?search_query=Tales+by+Monisha+Use+Mind+Not+Muscle" },
                    { title: "Never Lose Your Identity | A Powerful Life Lesson", views: "24K", url: "https://www.youtube.com/results?search_query=Tales+by+Monisha+Never+Lose+Your+Identity" },
                    { title: "Power of a Calm Mind | A Powerful Life Lesson Story", views: "20K", url: "https://www.youtube.com/results?search_query=Tales+by+Monisha+Power+of+a+Calm+Mind" }
                ]
            },

            {
                name: "Life Lessons Library",
                note: "Powerful English stories that touch the soul",
                topContent: [
                    { title: "The Wrong Door That Opened the Right Future", views: "73K", url: "https://www.youtube.com/results?search_query=Life+Lessons+Library+The+Wrong+Door" },
                    { title: "7 Rules of Success and Wealth | Life-Changing Motivational", views: "26K", url: "https://www.youtube.com/results?search_query=Life+Lessons+Library+7+Rules+of+Success" },
                    { title: "Three Greatest Enemies of Success — A Zen Story", views: "18K", url: "https://www.youtube.com/results?search_query=Life+Lessons+Library+Three+Greatest+Enemies" },
                    { title: "Why God Took Everything From Him | Heart-Touching Story", views: "7.5K", url: "https://www.youtube.com/results?search_query=Life+Lessons+Library+Why+God+Took+Everything" },
                    { title: "You're Not Anxious, You're Awake — A Soul-Healing Story", views: "2.1K", url: "https://www.youtube.com/results?search_query=Life+Lessons+Library+You%27re+Not+Anxious" }
                ]
            },

            {
                name: "Einzelgänger",
                note: "Stoic philosophy & calm wisdom",
                topContent: [
                    { title: "The Joys of Not Needing People", views: "2M" },
                    { title: "Life Has No Meaning...", views: "3M" },
                    { title: "Stop Letting the News Ruin Your Peace", views: "1.5M" },
                    { title: "The Taoist Art of Non-Resistance", views: "1M" },
                    { title: "Why Nothing Feels Exciting Anymore", views: "2.5M" }
                ]
            },
            {
                name: "Living Life Tales",
                note: "Daily inspiration & vocabulary",
                topContent: [
                    { title: "The Secret of 5 AM | One Habit That Changed a Poor Man's Life", views: "644K", url: "https://www.youtube.com/results?search_query=Living+Life+Tales+The+Secret+of+5+AM" },
                    { title: "The Lazy Boy Story | Motivational video", views: "609K", url: "https://www.youtube.com/results?search_query=Living+Life+Tales+The+Lazy+Boy+Story" },
                    { title: "You're Not Alone - A Beautiful Inspirational Short Story", views: "483K", url: "https://www.youtube.com/results?search_query=Living+Life+Tales+You%27re+Not+Alone" },
                    { title: "A Story About Life (INSPIRATIONAL)", views: "446K", url: "https://www.youtube.com/results?search_query=Living+Life+Tales+A+Story+About+Life" },
                    { title: "A SHORT STORY FULL OF WISDOM", views: "403K", url: "https://www.youtube.com/results?search_query=Living+Life+Tales+A+Short+Story+Full+of+Wisdom" }
                ]
            },
            {
                name: "Grace for Purpose",
                note: "Morning prayers & motivation",
                topContent: [
                    { title: "Speak God's Blessing Over Your Mornings in 2026", views: "138K", url: "https://www.youtube.com/results?search_query=Grace+for+Purpose+Speak+God%27s+Blessing" },
                    { title: "GOD IS NEAR To Those Who Call On Him", views: "127K", url: "https://www.youtube.com/results?search_query=Grace+for+Purpose+GOD+IS+NEAR" },
                    { title: "Start Your Morning with a Prayer That Carries Power", views: "112K", url: "https://www.youtube.com/results?search_query=Grace+for+Purpose+Start+Your+Morning+Prayer" },
                    { title: "Be Still and Begin Your Day Rich In Spiritual Blessings", views: "100K", url: "https://www.youtube.com/results?search_query=Grace+for+Purpose+Be+Still+and+Begin+Your+Day" },
                    { title: "Never Forget That Living For God Is Your MAIN Priority", views: "92K", url: "https://www.youtube.com/results?search_query=Grace+for+Purpose+Never+Forget+Living+For+God" }
                ]
            },
            {
                name: "Daily Jesus Prayers",
                note: "Daily devotionals & prayers",
                topContent: [
                    { title: "PRAY THIS Powerful February 2026 Prayer for Blessing", views: "21K", url: "https://www.youtube.com/results?search_query=Daily+Jesus+Prayers+February+2026+Prayer" },
                    { title: "Go Before Me & Guide Me For The Rest Of 2026", views: "15K", url: "https://www.youtube.com/results?search_query=Daily+Jesus+Prayers+Go+Before+Me" },
                    { title: "Guide My Steps in Peace and Strength", views: "13K", url: "https://www.youtube.com/results?search_query=Daily+Jesus+Prayers+Guide+My+Steps" },
                    { title: "Lord, Restore Me and Save Me", views: "11K", url: "https://www.youtube.com/results?search_query=Daily+Jesus+Prayers+Lord+Restore+Me" },
                    { title: "I Need You, Lord | Morning Prayer", views: "11K", url: "https://www.youtube.com/results?search_query=Daily+Jesus+Prayers+I+Need+You+Lord" }
                ]
            },
            {
                name: "Wisdom of Hope",
                note: "Motivational & inspirational stories",
                topContent: [
                    { title: "How to Stay Positive in Tough Times | Power of Belief", views: "71K", url: "https://www.youtube.com/results?search_query=Wisdom+of+Hope+How+to+Stay+Positive" },
                    { title: "Who Is Truly Happy? | Eye-Opening Story", views: "8.5K", url: "https://www.youtube.com/results?search_query=Wisdom+of+Hope+Who+Is+Truly+Happy" },
                    { title: "Everything You Do to Others… Comes Back to You", views: "3.5K", url: "https://www.youtube.com/results?search_query=Wisdom+of+Hope+Everything+You+Do+to+Others" },
                    { title: "The Value of Your Life – A Powerful Story on Self-Worth", views: "1.3K", url: "https://www.youtube.com/results?search_query=Wisdom+of+Hope+The+Value+of+Your+Life" },
                    { title: "Never Lose Hope", views: "5K", url: "https://www.youtube.com/results?search_query=Wisdom+of+Hope+Never+Lose+Hope" }
                ]
            },
            {
                name: "Reflections of Life",
                note: "Cinematic, high-quality short films",
                topContent: [
                    { title: "96 Years of WISDOM: The 3 Lessons That Will Make You Feel Awe", views: "2.9M", url: "https://www.youtube.com/results?search_query=Reflections+of+Life+96+Years+of+WISDOM" },
                    { title: "Our Island Life: Finding Peace & Freedom in Isolation", views: "2.5M", url: "https://www.youtube.com/results?search_query=Reflections+of+Life+Our+Island+Life" },
                    { title: "The Simple Life: How to Find Your 'ENOUGH'", views: "2.3M", url: "https://www.youtube.com/results?search_query=Reflections+of+Life+The+Simple+Life" },
                    { title: "Silence and Noise", views: "500K", url: "https://www.youtube.com/results?search_query=Reflections+of+Life+Silence+and+Noise" },
                    { title: "Finding Meaning", views: "250K", url: "https://www.youtube.com/results?search_query=Reflections+of+Life+Finding+Meaning" }
                ]
            },


        ]
    },
    ecq: {
        id: 'ecq',
        channelId: localStorage.getItem('yt_tracker_cid_ecq') || 'UC9xco5rz9PCBTp8uEF7IbGg',
        name: 'Epic Cute Quests',
        targetPerWeek: 2,
        types: ['Short'],
        schedule: 'Tuesday & Friday @ 8pm EAT',
        color: '#f472b6',
        uploadDays: [2, 5],
        subscribers: 0,
        searchFocus: 'cute animal videos pets',
        competitors: [


            {
                name: "The Secret Life of my Hamster",
                note: "Epic hamster mazes & escapes",
                topContent: [
                    { title: "Hamster Ball pool Maze", views: "289M", url: "https://www.youtube.com/results?search_query=The+Secret+Life+of+my+Hamster+Hamster+Ball+pool+Maze" },
                    { title: "Hamster vs Pop It maze for pets Escape", views: "198M", url: "https://www.youtube.com/results?search_query=The+Secret+Life+of+my+Hamster+Pop+It+maze" },
                    { title: "Hamster Pop It Maze", views: "136M", url: "https://www.youtube.com/results?search_query=The+Secret+Life+of+my+Hamster+Hamster+Pop+It+Maze" },
                    { title: "The Best Hamster Challenges", views: "108M", url: "https://www.youtube.com/results?search_query=The+Secret+Life+of+my+Hamster+Best+Hamster+Challenges" },
                    { title: "Hamster Escapes the Pool Maze", views: "72M", url: "https://www.youtube.com/results?search_query=The+Secret+Life+of+my+Hamster+Escapes+the+Pool+Maze" }
                ]
            },
            {
                name: "Shadow the Rat",
                note: "Incredible rat tricks & agility",
                topContent: [
                    { title: "Shadow The Rat - Best Rat Tricks (Compilation)", views: "805K", url: "https://www.youtube.com/results?search_query=Shadow+the+Rat+Best+Rat+Tricks" },
                    { title: "10 Weird Yet Totally Normal Behaviors from Pet Rats", views: "517K", url: "https://www.youtube.com/results?search_query=Shadow+the+Rat+10+Weird+Yet+Totally+Normal+Behaviors" },
                    { title: "Rats vs Boiled Egg Part 2 - Chill Out Bean!", views: "206K", url: "https://www.youtube.com/results?search_query=Shadow+the+Rat+Rats+vs+Boiled+Egg" },
                    { title: "Latte's Epic Rat Tricks - Part 3!", views: "147K", url: "https://www.youtube.com/results?search_query=Shadow+the+Rat+Latte%27s+Epic+Rat+Tricks" },
                    { title: "How I Introduced My 3 Younger Rats to My 2 Older Girls", views: "144K", url: "https://www.youtube.com/results?search_query=Shadow+the+Rat+How+I+Introduced+My+3+Younger+Rats" }
                ]
            },
            {
                name: "Little Adventures",
                note: "Cinematic guinea pig life",
                topContent: [
                    { title: "New Guinea Pig Introduction", views: "872K", url: "https://www.youtube.com/results?search_query=Little+Adventures+New+Guinea+Pig+Introduction" },
                    { title: "I Bought My Guinea Pigs Everything They Asked For", views: "544K", url: "https://www.youtube.com/results?search_query=Little+Adventures+I+Bought+My+Guinea+Pigs+Everything" },
                    { title: "My Instagram Followers Control My Life Guinea Pig Edition", views: "535K", url: "https://www.youtube.com/results?search_query=Little+Adventures+My+Instagram+Followers+Control+My+Life" },
                    { title: "10 Strange But Common Guinea Pig Behaviors", views: "533K", url: "https://www.youtube.com/results?search_query=Little+Adventures+10+Strange+But+Common+Guinea+Pig+Behaviors" },
                    { title: "Failed Guinea Pig Introduction", views: "518K", url: "https://www.youtube.com/results?search_query=Little+Adventures+Failed+Guinea+Pig+Introduction" }
                ]
            },
            {
                name: "The Modern Ferret",
                note: "Funny ferret chaos & bonding",
                topContent: [
                    { title: "FERRETS Taking Over TikTok | FUNNIEST Trending", views: "1.3M", url: "https://www.youtube.com/results?search_query=The+Modern+Ferret+FERRETS+Taking+Over+TikTok" },
                    { title: "FERRETS Taking Over Tiktok | FUNNIEST Trending pt. 2", views: "797K", url: "https://www.youtube.com/results?search_query=The+Modern+Ferret+Taking+Over+Tiktok+pt+2" },
                    { title: "What is a Ferret? | Ferrets as Pets 101", views: "713K", url: "https://www.youtube.com/results?search_query=The+Modern+Ferret+What+is+a+Ferret" },
                    { title: "11 FUN Ways to Bond With Your Ferret", views: "411K", url: "https://www.youtube.com/results?search_query=The+Modern+Ferret+11+FUN+Ways+to+Bond" },
                    { title: "BEST FERRET Products | The Modern Ferret", views: "290K", url: "https://www.youtube.com/results?search_query=The+Modern+Ferret+BEST+FERRET+Products" }
                ]
            },
            {
                name: "Pet Pop",
                note: "Viral cute & funny pet compilations (@petpopz)",
                topContent: [
                    { title: "Try Not To Laugh - Funniest Pet Moments", views: "5M", url: "https://www.youtube.com/results?search_query=Pet+Pop+petpopz+funny+pets" },
                    { title: "Cutest Pets Doing Funny Things", views: "3.2M", url: "https://www.youtube.com/results?search_query=Pet+Pop+petpopz+cutest+pets" },
                    { title: "Animals That Will Make Your Day Better", views: "2.1M", url: "https://www.youtube.com/results?search_query=Pet+Pop+petpopz+animals+make+day+better" },
                    { title: "Funny Dogs And Cats - Best Of The Week", views: "1.8M", url: "https://www.youtube.com/results?search_query=Pet+Pop+petpopz+funny+dogs+cats" },
                    { title: "Adorable Pets You Need To See", views: "900K", url: "https://www.youtube.com/results?search_query=Pet+Pop+petpopz+adorable+pets" }
                ]
            }
        ]
    },
    tj: {
        id: 'tj',
        channelId: localStorage.getItem('yt_tracker_cid_tj') || 'UCtIova4flqS4LBtA5hQ8o5w',
        name: 'Tozz Jerry',
        targetPerWeek: 2,
        types: ['Short', 'Long-form'],
        schedule: 'Wednesday (Shorts) & Friday (Long-form) @ 8pm EAT',
        color: '#10b981',
        uploadDays: [3, 5],
        subscribers: 0,
        searchFocus: 'AI reconstructions African cities historical architecture',
        competitors: [
            {
                name: "SeeNew Africa",
                note: "AI Visualization of precolonial African Architecture",
                topContent: [
                    { title: "AI: Bringing precolonial African Architecture to life", views: "15K", url: "https://www.youtube.com/results?search_query=SeeNew+Africa+AI+African+Architecture" }
                ]
            },
            {
                name: "African History Fountain",
                note: "Digital reconstructions of ancient history",
                topContent: [
                    { title: "The Algorithm Remembers: AI Says I Know Africa's History", views: "45K", url: "https://www.youtube.com/results?search_query=African+History+Fountain+AI+History" }
                ]
            },
            {
                name: "Pan-African History",
                note: "Urban history and civilization depth",
                topContent: [
                    { title: "Lost Cities of Ancient Africa", views: "120K", url: "https://www.youtube.com/results?search_query=Pan+African+History+Lost+Cities" }
                ]
            },
            {
                name: "Ancient African Viz",
                note: "3D renders of lost African empires",
                topContent: [
                    { title: "Timbuktu: A 3D Reconstruction", views: "30K", url: "https://www.youtube.com/results?search_query=Ancient+African+Viz+Timbuktu" }
                ]
            },
            {
                name: "Historical Africa AI",
                note: "AI-driven historical face and city reconstructions",
                topContent: [
                    { title: "Faces of Ancient African Kings (AI)", views: "200K", url: "https://www.youtube.com/results?search_query=Historical+Africa+AI+Reconstruction" }
                ]
            }
        ]
    }
};

// Helper for safe JSON parsing
function safeJSONParse(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.warn(`Error parsing ${key}`, e);
        return fallback;
    }
}

// State Management
let videos = safeJSONParse('yt_tracker_videos', []);
let ideas = safeJSONParse('yt_tracker_ideas', []);
let subsHistory = safeJSONParse('yt_tracker_subs_history', { lpbz: [], ecq: [], tj: [] });
let activeTab = 'dashboard';
let lastSync = localStorage.getItem('yt_tracker_last_sync') || 'Never';
let inspirationSources = safeJSONParse('yt_tracker_inspiration', []);
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
    initInspirationFeed();
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
async function syncWithYouTube(retryCount = 0) {
    // Check for quota backoff
    const quotaBlock = localStorage.getItem('yt_tracker_quota_blocked_until');
    if (quotaBlock && Date.now() < parseInt(quotaBlock)) {
        const remaining = Math.ceil((parseInt(quotaBlock) - Date.now()) / 60000);
        console.warn(`Sync skipped: Quota blocked for another ${remaining} minutes.`);
        alert(`API Quota exceeded. Using local data only. Retrying in ${remaining}m.`);
        return;
    }

    syncBtn.disabled = true;
    const originalText = syncBtn.innerText;
    syncBtn.innerHTML = `<span class="syncing-icon">↻</span> Syncing...`;

    // Optional: Add skeleton class to containers during sync
    const containers = ['global-stats-summary', 'idea-list', ...Object.keys(CHANNELS).map(id => `card-${id}`)];
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('skeleton');
    });

    try {
        for (const channelKey in CHANNELS) {
            const channel = CHANNELS[channelKey];
            await fetchChannelData(channel);
            await fetchChannelVideos(channel);
        }
        lastSync = new Date().toLocaleString();
        localStorage.setItem('yt_tracker_last_sync', lastSync);
        localStorage.setItem('yt_tracker_last_sync_timestamp', Date.now().toString());
        localStorage.removeItem('yt_tracker_quota_blocked_until'); // Clear block on success
        updateSyncStatusDisplay();
    } catch (error) {
        console.error('Sync failed:', error);

        if (error.message.includes('quota')) {
            // Try rotating key if we haven't tried all keys yet
            if (retryCount < API_KEYS.length - 1 && rotateApiKey()) {
                console.log('🔄 Quota exceeded. Rotating key and retrying...');
                return await syncWithYouTube(retryCount + 1);
            }

            // All keys failed or only one key
            const blockUntil = Date.now() + (4 * 60 * 60 * 1000);
            localStorage.setItem('yt_tracker_quota_blocked_until', blockUntil.toString());
            alert(`YouTube API Quota Exceeded on all keys. Syncing blocked for 4 hours. Loading local data...`);
        } else {
            alert(`YouTube Sync failed: ${error.message}. Please check your API keys or connection.`);
        }
    } finally {
        syncBtn.disabled = false;
        syncBtn.innerText = originalText;
        containers.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('skeleton');
        });
        renderAll();
    }
}

async function fetchChannelData(channel) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel.channelId}&key=${getApiKey()}`;
    const response = await fetch(url);
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Failed to fetch channel data');
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        const subCount = parseInt(data.items[0].statistics.subscriberCount) || 0;
        channel.subscribers = subCount;
        localStorage.setItem(`yt_tracker_subs_${channel.id}`, subCount);

        // Log history
        const today = new Date().toISOString().split('T')[0];
        if (!subsHistory[channel.id]) subsHistory[channel.id] = [];
        const lastEntry = subsHistory[channel.id][subsHistory[channel.id].length - 1];
        if (!lastEntry || lastEntry.date !== today) {
            subsHistory[channel.id].push({ date: today, count: subCount });
            if (subsHistory[channel.id].length > 30) subsHistory[channel.id].shift(); // Keep 30 days
            localStorage.setItem('yt_tracker_subs_history', JSON.stringify(subsHistory));
        }
    }
}

async function fetchChannelVideos(channel) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}&maxResults=20&order=date&type=video&key=${getApiKey()}`;
    const response = await fetch(url);
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Failed to fetch videos');
    }
    const data = await response.json();

    if (data.items) {
        videos = videos.filter(v => v.channelId !== channel.id || !v.isApiData);
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${getApiKey()}`;
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
    } else if (channelKey === 'tj') {
        const duration = item.contentDetails?.duration || '';
        // Heuristics: Shorts are < 60s. YouTube ISO 8601 duration
        if (duration.includes('S') && !duration.includes('M') && !duration.includes('H')) {
            const seconds = parseInt(duration.match(/PT(\d+)S/)?.[1] || 0);
            if (seconds < 60) return 'Short';
        }
        if (title.includes('#shorts') || title.includes('short')) return 'Short';
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

    // Auto-sync every 6 hours instead of every hour to conserve quota
    if (!lastSyncTime || now - parseInt(lastSyncTime) > 21600000) {
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

    // Logo link to dashboard
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const dashTab = document.querySelector('.nav-btn[data-tab="dashboard"]');
            if (dashTab) dashTab.click();
        });
    }
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

    window.onclick = (event) => {
        if (event.target === videoModal) {
            videoModal.classList.remove('active');
            videoForm.reset();
        }
    };
    videoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveVideo();
    });

    // Toggle workflow stages based on status
    document.getElementById('v-status').addEventListener('change', (e) => {
        const workflowGroup = document.getElementById('workflow-group');
        workflowGroup.style.display = e.target.value === 'Planned' ? 'block' : 'none';
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

function openModal(channelId, videoId = null, ideaData = null, isIdeaMode = false, prefillDate = null) {
    const channel = CHANNELS[channelId];
    videoForm.reset();

    let titleText = 'Video Idea';
    if (videoId) titleText = 'Edit Video';
    else if (ideaData) titleText = 'Promote Idea to Video';
    else if (isIdeaMode) titleText = 'New Idea (Bank)';

    document.getElementById('modal-title').innerText = titleText;
    document.getElementById('video-channel').value = channelId;
    document.getElementById('video-id').value = videoId || '';
    document.getElementById('original-idea-id').value = '';

    // Set a hidden flag or class to differentiate Idea vs Video save
    document.getElementById('video-form').dataset.mode = isIdeaMode ? 'idea' : 'video';

    // Date Logic: Prefill > Idea Data > Today
    const dateToSet = prefillDate || (ideaData ? ideaData.date : new Date().toISOString().split('T')[0]);
    document.getElementById('v-date').value = dateToSet;

    document.getElementById('v-type').innerHTML = channel.types.map(t => `<option value="${t}">${t}</option>`).join('');
    document.getElementById('v-notes').value = '';
    document.getElementById('v-hook').value = '';
    document.getElementById('v-value').value = '';
    document.getElementById('v-cta').value = '';

    // Default status to Planned for new planned videos
    if (!videoId && !ideaData && !isIdeaMode) {
        document.getElementById('v-status').value = 'Planned';
        document.getElementById('v-status').dispatchEvent(new Event('change'));
    }

    if (ideaData) {
        document.getElementById('v-title').value = ideaData.title;
        document.getElementById('v-notes').value = ideaData.description;
        document.getElementById('v-status').value = 'Planned';
        document.getElementById('original-idea-id').value = ideaData.id;
        document.getElementById('v-status').dispatchEvent(new Event('change'));
    }

    if (videoId) {
        document.getElementById('video-form').dataset.mode = 'video'; // Editing is always video mode
        const video = videos.find(v => v.id === videoId);
        if (video) {
            document.getElementById('v-title').value = video.title;
            document.getElementById('v-date').value = video.date;
            document.getElementById('v-type').value = video.type;
            document.getElementById('v-views').value = video.views;
            document.getElementById('v-status').value = video.status || 'Live';

            // Trigger change to show/hide workflow
            document.getElementById('v-status').dispatchEvent(new Event('change'));

            if (video.workflowStage) {
                const radio = document.querySelector(`input[name="w-stage"][value="${video.workflowStage}"]`);
                if (radio) radio.checked = true;
            }

            document.getElementById('v-notes').value = video.notes || '';

            if (video.checklist) {
                document.getElementById('check-seo').checked = video.checklist.seo;
                document.getElementById('check-thumb').checked = video.checklist.thumb;
                document.getElementById('check-playlist').checked = video.checklist.playlist;
                document.getElementById('check-desc').checked = video.checklist.desc;
            }
            if (video.strategy) {
                document.getElementById('v-hook').value = video.strategy.hook || '';
                document.getElementById('v-value').value = video.strategy.value || '';
                document.getElementById('v-cta').value = video.strategy.cta || '';
            }
        }
    }
    videoModal.classList.add('active');
}

function saveVideo() {
    const isIdeaMode = document.getElementById('video-form').dataset.mode === 'idea';
    const id = document.getElementById('video-id').value;
    const channelId = document.getElementById('video-channel').value;

    const title = document.getElementById('v-title').value;
    const notes = document.getElementById('v-notes').value;

    if (isIdeaMode) {
        // Saving as Idea
        const newIdea = {
            id: id || Date.now().toString(),
            title: title,
            description: notes,
            channelId: channelId,
            date: new Date().toISOString().split('T')[0],
            // Optional: could save strategy fields here too if we update idea structure
            strategy: {
                hook: document.getElementById('v-hook').value,
                value: document.getElementById('v-value').value,
                cta: document.getElementById('v-cta').value
            }
        };
        ideas.push(newIdea);
        saveToLocal();
        videoModal.classList.remove('active');
        renderAll();
        // Switch to Idea Bank tab to show the new idea
        document.querySelector('.nav-btn[data-tab="idea-bank"]').click();
        return;
    }

    // Saving as Video
    const videoData = {
        id: id || Date.now().toString(),
        channelId: channelId,
        title: title,
        date: document.getElementById('v-date').value,
        type: document.getElementById('v-type').value,
        views: parseInt(document.getElementById('v-views').value) || 0,
        status: document.getElementById('v-status').value,
        workflowStage: document.querySelector('input[name="w-stage"]:checked') ? document.querySelector('input[name="w-stage"]:checked').value : 'Idea',
        notes: notes,
        thumbnail: 'https://via.placeholder.com/120x68?text=Planned',
        checklist: {
            seo: document.getElementById('check-seo').checked,
            thumb: document.getElementById('check-thumb').checked,
            playlist: document.getElementById('check-playlist').checked,
            desc: document.getElementById('check-desc').checked
        },
        strategy: {
            hook: document.getElementById('v-hook').value,
            value: document.getElementById('v-value').value,
            cta: document.getElementById('v-cta').value
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

    // Check if this was promoted from an idea
    const originalIdeaId = document.getElementById('original-idea-id').value;
    if (originalIdeaId) {
        ideas = ideas.filter(i => i.id !== originalIdeaId);
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
    const channelPicker = document.getElementById('channel-picker');

    function showChannelPicker() {
        channelPicker.classList.add('active');
    }

    // Dashboard "New Idea" button
    const dbBtn = document.getElementById('add-idea-btn');
    if (dbBtn) {
        dbBtn.addEventListener('click', showChannelPicker);
    }

    // Full Page "New Idea" button
    const pageBtn = document.getElementById('add-idea-page-btn');
    if (pageBtn) {
        pageBtn.addEventListener('click', showChannelPicker);
    }

    // Channel pick buttons
    document.querySelectorAll('.channel-pick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const channelId = btn.dataset.channel;
            channelPicker.classList.remove('active');
            openModal(channelId, null, null, true);
        });
    });

    // Cancel button
    document.getElementById('cancel-channel-pick').addEventListener('click', () => {
        channelPicker.classList.remove('active');
    });

    // Click outside to close
    channelPicker.addEventListener('click', (e) => {
        if (e.target === channelPicker) {
            channelPicker.classList.remove('active');
        }
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

// View Count Formatter
function formatViews(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
}

// Inspiration Feed Logic
function initInspirationFeed() {
    const fetchBtn = document.getElementById('fetch-fresh-ideas');
    const filter = document.getElementById('inspiration-channel-filter');

    if (filter) {
        populateInspirationFilter();
        filter.addEventListener('change', renderInspirationFeed);
    }
    if (fetchBtn) {
        fetchBtn.addEventListener('click', fetchFreshInspirations);
    }

    renderInspirationFeed();
}

function populateInspirationFilter() {
    const filter = document.getElementById('inspiration-channel-filter');
    if (!filter) return;

    let html = '<option value="all">All Channels</option>';

    for (const [key, channel] of Object.entries(CHANNELS)) {
        html += `<optgroup label="${channel.name}">`;
        html += `<option value="${key}">${channel.name} (All)</option>`;
        if (channel.competitors) {
            channel.competitors.forEach(comp => {
                html += `<option value="comp:${key}:${comp.name}">${comp.name}</option>`;
            });
        }
        html += `</optgroup>`;
    }

    filter.innerHTML = html;
}

function renderInspirationFeed() {
    const feed = document.getElementById('inspiration-feed');
    if (!feed) return;

    const filterVal = document.getElementById('inspiration-channel-filter').value;

    let targets = [];
    if (filterVal === 'all') {
        targets = Object.keys(CHANNELS).map(key => ({ key, compName: null }));
    } else if (filterVal.startsWith('comp:')) {
        const [_, key, compName] = filterVal.split(':');
        targets = [{ key, compName }];
    } else {
        targets = [{ key: filterVal, compName: null }];
    }

    let html = '';
    targets.forEach(({ key, compName }) => {
        const channel = CHANNELS[key];
        const competitors = compName
            ? channel.competitors.filter(c => c.name === compName)
            : channel.competitors;

        competitors.forEach(comp => {
            if (!comp.topContent) return;
            const items = comp.topContent.slice(0, 3);
            items.forEach(item => {
                const videoUrl = item.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`;
                html += `
                    <div class="inspiration-card">
                        <div class="inspiration-card-header">
                            <h4>${item.title}</h4>
                        </div>
                        <div class="inspiration-card-meta">
                            <span class="views-badge">${item.views} views</span>
                            <span class="inspiration-source">${comp.name}</span>
                            <span>→ ${channel.name}</span>
                        </div>
                        <div class="inspiration-card-actions">
                            <button class="btn btn-sm btn-primary" onclick="saveInspirationAsIdea('${key}', '${item.title.replace(/'/g, "\\'")}', '${comp.name.replace(/'/g, "\\'")}')">Save as Idea</button>
                            <a href="${videoUrl}" target="_blank" class="btn btn-sm btn-outline">Watch ↗</a>
                        </div>
                    </div>
                `;
            });
        });
    });

    feed.innerHTML = html || '<p style="color:var(--text-muted); text-align:center; padding:2rem">No inspirations available.</p>';
}

async function fetchFreshInspirations() {
    const btn = document.getElementById('fetch-fresh-ideas');
    const feed = document.getElementById('inspiration-feed');
    const filterVal = document.getElementById('inspiration-channel-filter').value;

    let targets = [];
    if (filterVal === 'all') {
        targets = Object.keys(CHANNELS).map(key => ({ key, compName: null }));
    } else if (filterVal.startsWith('comp:')) {
        const [_, key, compName] = filterVal.split(':');
        targets = [{ key, compName }];
    } else {
        targets = [{ key: filterVal, compName: null }];
    }

    btn.disabled = true;
    btn.textContent = '⏳ Fetching...';
    feed.innerHTML = '<div class="inspiration-loading"><p>Fetching trending videos from competitor channels...</p></div>';

    try {
        let allResults = [];

        for (const { key, compName } of targets) {
            const channel = CHANNELS[key];
            let selectedComps = [];

            if (compName) {
                // If specific competitor selected, ONLY fetch that one (and maybe more results?)
                selectedComps = channel.competitors.filter(c => c.name === compName);
            } else {
                // Pick a random subset of competitors to avoid too many API calls
                selectedComps = channel.competitors
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);
            }

            for (const comp of selectedComps) {
                try {
                    const focus = channel.searchFocus || '';
                    // Use quotes for exact channel name match if possible, or just the name
                    const query = encodeURIComponent(`"${comp.name}" ${focus}`);
                    const res = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&order=viewCount&maxResults=5&key=${getApiKey()}`
                    );
                    const data = await res.json();

                    if (data.items) {
                        data.items.forEach(item => {
                            allResults.push({
                                title: item.snippet.title,
                                channelTitle: item.snippet.channelTitle,
                                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                                videoId: item.id.videoId,
                                publishedAt: item.snippet.publishedAt,
                                forChannel: key,
                                source: comp.name
                            });
                        });
                    }
                } catch (err) {
                    console.warn(`Failed to fetch for ${comp.name}:`, err);
                }
            }
        }

        // Fetch view counts for all results via videos.list
        if (allResults.length > 0) {
            try {
                const videoIds = allResults.map(r => r.videoId).join(',');
                const statsRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${getApiKey()}`
                );
                const statsData = await statsRes.json();
                if (statsData.items) {
                    const statsMap = {};
                    statsData.items.forEach(item => {
                        statsMap[item.id] = parseInt(item.statistics.viewCount) || 0;
                    });
                    allResults.forEach(r => {
                        r.views = statsMap[r.videoId] || 0;
                    });
                    // Sort by views descending
                    allResults.sort((a, b) => b.views - a.views);
                }
            } catch (err) {
                console.warn('Failed to fetch video stats:', err);
            }
        }

        // Render the fresh results
        if (allResults.length > 0) {
            feed.innerHTML = allResults.map(r => {
                const viewsFormatted = r.views ? formatViews(r.views) : 'N/A';
                return `
                <div class="inspiration-card">
                    <div class="inspiration-card-header">
                        <img src="${r.thumbnail}" alt="" style="width:120px; height:68px; border-radius:var(--radius-sm); object-fit:cover; flex-shrink:0">
                        <h4>${r.title}</h4>
                    </div>
                    <div class="inspiration-card-meta">
                        <span class="views-badge">${viewsFormatted} views</span>
                        <span class="inspiration-source">${r.channelTitle}</span>
                        <span>for ${CHANNELS[r.forChannel].name}</span>
                        <span>${new Date(r.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div class="inspiration-card-actions">
                        <button class="btn btn-sm btn-primary" onclick="saveInspirationAsIdea('${r.forChannel}', '${r.title.replace(/'/g, "\\'")}', '${r.channelTitle.replace(/'/g, "\\'")}')">Save as Idea</button>
                        <a href="https://www.youtube.com/watch?v=${r.videoId}" target="_blank" class="btn btn-sm btn-outline">Watch ↗</a>
                    </div>
                </div>
            `}).join('');
        } else {
            feed.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:2rem">No results fetched. Check your API key in Settings.</p>';
        }

    } catch (err) {
        feed.innerHTML = `<p style="color:var(--danger); text-align:center; padding:2rem">Error: ${err.message}. Check your API key.</p>`;
    } finally {
        btn.disabled = false;
        btn.textContent = '🔄 Fetch Fresh Ideas';
    }
}

function saveInspirationAsIdea(channelId, title, source) {
    const newIdea = {
        id: Date.now().toString(),
        title: `[Inspired] ${title}`,
        description: `Inspired by "${source}" — adapt this concept for your channel.`,
        channelId: channelId,
        date: new Date().toISOString().split('T')[0],
        strategy: { hook: '', value: '', cta: '' }
    };
    ideas.push(newIdea);
    saveToLocal();
    renderAll();

    // Quick feedback
    if (event && event.target) {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Saved!';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

function saveToLocal() {
    localStorage.setItem('yt_tracker_videos', JSON.stringify(videos));
    localStorage.setItem('yt_tracker_ideas', JSON.stringify(ideas));
}

// Settings Logic
function initSettings() {
    renderApiKeysList();

    document.getElementById('add-api-key-btn').addEventListener('click', addApiKey);
    document.getElementById('new-api-key').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addApiKey();
    });

    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('import-data-btn').addEventListener('click', () => {
        document.getElementById('import-file-input').click();
    });

    document.getElementById('import-file-input').addEventListener('change', importData);

    renderSettings();
}

function renderApiKeysList() {
    const list = document.getElementById('api-keys-list');
    if (!list) return;

    list.innerHTML = API_KEYS.map((key, index) => `
        <div class="api-key-item ${index === currentKeyIndex ? 'active' : ''}">
            <span>${'*'.repeat(10)}${key.slice(-4)}</span>
            <button class="remove-key-btn" onclick="removeApiKey(${index})" title="Remove Key">&times;</button>
        </div>
    `).join('') || '<p style="color:var(--text-muted); font-size:0.85rem">No API keys added.</p>';
}

function addApiKey() {
    const input = document.getElementById('new-api-key');
    const newKey = input.value.trim();
    if (newKey) {
        if (API_KEYS.includes(newKey)) {
            alert('This API key is already in the list.');
            return;
        }
        API_KEYS.push(newKey);
        localStorage.setItem('yt_tracker_api_keys', JSON.stringify(API_KEYS));
        input.value = '';
        renderApiKeysList();
        alert('API Key added successfully!');
    }
}

function removeApiKey(index) {
    if (API_KEYS.length <= 1) {
        alert('You must have at least one API key.');
        return;
    }
    if (confirm('Are you sure you want to remove this API key?')) {
        API_KEYS.splice(index, 1);
        if (currentKeyIndex >= API_KEYS.length) currentKeyIndex = 0;
        localStorage.setItem('yt_tracker_api_keys', JSON.stringify(API_KEYS));
        renderApiKeysList();
    }
}

// No more demo mode

// Mock data logic removed

function renderSettings() {
    const list = document.getElementById('settings-channels-list');
    if (!list) return;
    list.innerHTML = Object.entries(CHANNELS).map(([key, ch]) => `
        <div class="channel-setting-item">
            <div class="channel-setting-info">
                <strong>${ch.name}</strong>
                <span>ID: ${ch.channelId}</span>
                <a href="https://youtube.com/channel/${ch.channelId}" target="_blank" class="visit-channel-link">Visit Channel ↗</a>
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
// Rendering Logic
function renderAll() {
    renderGlobalStats();
    if (activeTab === 'dashboard') {
        renderDashboard();
    } else if (activeTab === 'idea-bank') {
        renderIdeaBank();
        renderInspirationFeed();
    } else if (activeTab === 'settings') {
        renderSettings();
    } else {
        renderChannelView(activeTab.replace('tab-', ''));
    }
}

function renderGlobalStats() {
    const liveVideos = videos.filter(v => v.status === 'Live');
    const totalVideos = liveVideos.length;
    const totalViews = liveVideos.reduce((sum, v) => sum + parseViews(v.views), 0);
    const avgViews = totalVideos ? Math.round(totalViews / totalVideos) : 0;
    const container = document.getElementById('global-stats-summary');
    container.innerHTML = `
        <div class="stat-item"><span class="stat-value">${totalVideos}</span><span class="stat-label">Videos</span></div>
        <div class="stat-item"><span class="stat-value">${totalViews.toLocaleString()}</span><span class="stat-label">Views</span></div>
        <div class="stat-item"><span class="stat-value">${avgViews.toLocaleString()}</span><span class="stat-label">Avg Views</span></div>
    `;
}

function renderDashboard() {
    Object.keys(CHANNELS).forEach(channelId => {
        renderChannelCard(channelId, videos.filter(v => v.channelId === channelId));
    });

    // Idea Bank
    const ideaList = document.getElementById('idea-list');
    if (ideaList) {
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
    }

    setTimeout(initComparisonChart, 0);
}

function renderIdeaBank() {
    const list = document.getElementById('full-idea-list');
    if (!list) return;

    const lpbzIdeas = ideas.filter(i => i.channelId === 'lpbz');
    const ecqIdeas = ideas.filter(i => i.channelId === 'ecq');

    const renderIdeaCard = (idea) => `
        <div class="idea-item idea-${idea.channelId}">
            <div>
                <div style="display:flex; justify-content:flex-end; margin-bottom:0.5rem">
                    <span style="font-size:0.8rem; color:var(--text-muted)">${new Date(idea.date).toLocaleDateString()}</span>
                </div>
                <h4>${idea.title}</h4>
                <p>${idea.description || 'No description provided.'}</p>
                ${idea.strategy ? `
                    <div style="margin-top:0.5rem; font-size:0.85rem; color:var(--text-muted)">
                        <strong>Hook:</strong> ${idea.strategy.hook || 'N/A'} <br>
                        <strong>Value:</strong> ${idea.strategy.value || 'N/A'}
                    </div>
                ` : ''}
            </div>
            <div class="idea-actions">
                <button class="btn btn-sm btn-outline" onclick="promoteIdea('${idea.id}')">Promote</button>
                <button class="btn btn-sm btn-outline" style="color:var(--danger)" onclick="deleteIdea('${idea.id}')">Delete</button>
            </div>
        </div>
    `;

    list.innerHTML = `
        <div class="idea-bank-grid">
            <div class="idea-column">
                <h3>Lets Pray & Bible Zone (${lpbzIdeas.length})</h3>
                <div class="idea-list-column">
                    ${lpbzIdeas.map(renderIdeaCard).join('') || '<p style="color:var(--text-muted)">No ideas yet. Start brainstorming!</p>'}
                </div>
            </div>
            <div class="idea-column">
                <h3>Epic Cute Quests (${ecqIdeas.length})</h3>
                <div class="idea-list-column">
                    ${ecqIdeas.map(renderIdeaCard).join('') || '<p style="color:var(--text-muted)">No ideas yet. Start brainstorming!</p>'}
                </div>
            </div>
        </div>
    `;
}

function renderChannelCard(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    const card = document.getElementById(`card-${channelId}`);
    const nextUploadText = getNextUploadInfo(channelId);

    card.innerHTML = `
        <h3>${channel.name}</h3>
        <div class="channel-card-stat"><span>Subscribers</span><span>${channel.subscribers.toLocaleString()}</span></div>
        <div class="channel-card-stat"><span>Weekly Goal</span><span>${channel.schedule}</span></div>
        <div class="channel-card-stat"><span>Next Upload</span><span>${nextUploadText}</span></div>
        <div class="countdown-row">
            <span class="countdown-label">⏱ Countdown</span>
            <span class="countdown-timer" id="countdown-${channelId}">--:--:--</span>
        </div>
    `;
    startCountdownTimers();
}

// Status check logic removed

function renderChannelView(channelId) {
    const channel = CHANNELS[channelId];
    const channelVideos = videos.filter(v => v.channelId === channelId).sort((a, b) => new Date(b.date) - new Date(a.date));
    const liveVideos = channelVideos.filter(v => v.status === 'Live');
    const plannedVideos = channelVideos.filter(v => v.status === 'Planned');

    const totalVids = liveVideos.length;
    const totalViews = liveVideos.reduce((sum, v) => sum + parseViews(v.views), 0);
    const avgViewsPerVid = totalVids ? Math.round(totalViews / totalVids) : 0;

    // Calculate Avg Views Per Day
    let avgDailyViews = 0;
    if (liveVideos.length > 0) {
        const lastVideo = liveVideos[liveVideos.length - 1];
        const firstVideoDate = lastVideo.date ? new Date(lastVideo.date) : new Date();
        const now = new Date();
        const daysDiff = Math.max(1, Math.ceil((now - firstVideoDate) / (1000 * 60 * 60 * 24)));
        avgDailyViews = Math.round(totalViews / daysDiff);
    }

    const streak = calculateStreak(channelId);

    document.getElementById(`${channelId}-stats`).innerHTML = `
        <div class="stat-card"><span class="value">${channel.subscribers.toLocaleString()}</span><span class="label">Subscribers</span></div>
        <div class="stat-card"><span class="value">${totalVids}</span><span class="label">Total Videos</span></div>
        <div class="stat-card"><span class="value">${totalViews.toLocaleString()}</span><span class="label">Total Views</span></div>
        <div class="stat-card"><span class="value">${avgDailyViews.toLocaleString()}</span><span class="label">Avg Views/Day</span></div>
        <div class="stat-card"><span class="value">${avgViewsPerVid.toLocaleString()}</span><span class="label">Avg Views/Vid</span></div>
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
                    <div class="workflow-mini-steps">
                        ${getWorkflowSteps(v.workflowStage)}
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="openModal('${channelId}', '${v.id}')">Edit</button>
                </div>
            </div>
        `;
    }).join('') || '<p style="color:var(--text-muted); font-size:0.85rem">No planned videos.</p>';

    renderIntelligence(channelId, liveVideos);
    renderCompetitors(channelId);

    const tbody = document.querySelector(`#${channelId}-history tbody`);
    if (!tbody) return; // Defensive check
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

    const breakdownEl = document.getElementById(`${channelId}-breakdown`);
    if (breakdownEl) renderBreakdown(channelId, liveVideos);
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

    // Milestone Logic
    const currentSubs = channel.subscribers;
    const nextMilestone = currentSubs < 1000 ? 1000 : Math.ceil((currentSubs + 1) / 1000) * 1000;
    const prevMilestone = nextMilestone - 1000;
    const progress = Math.min(100, Math.max(0, ((currentSubs - prevMilestone) / (nextMilestone - prevMilestone)) * 100));
    const toGo = nextMilestone - currentSubs;

    document.getElementById(`${channelId}-intelligence`).innerHTML = `
        <div class="intel-item"><span class="intel-value">${engagementScore}</span><span class="intel-label">Engagement Score</span></div>
        <div class="intel-item"><span class="intel-value" style="font-size: 1.1rem">${bestDay}</span><span class="intel-label">Best Upload Day</span></div>
        <div class="intel-item" style="grid-column: span 2">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem">
                <span class="intel-label">Next Goal: ${nextMilestone.toLocaleString()}</span>
                <span class="intel-label" style="color:var(--accent)">${toGo.toLocaleString()} to go</span>
            </div>
            <div style="height: 8px; background: var(--bg-card); border-radius: 4px; overflow:hidden">
                <div style="height:100%; width: ${progress}%; background: linear-gradient(90deg, var(--accent), var(--secondary)); box-shadow: 0 0 10px var(--accent-muted)"></div>
            </div>
        </div>
    `;
}

function renderBreakdown(channelId, channelVideos) {
    const channel = CHANNELS[channelId];
    if (!channel || !channel.types) return;

    const counts = {};
    channel.types.forEach(t => counts[t] = channelVideos.filter(v => v.type === t).length);
    const total = channelVideos.length;

    const el = document.getElementById(`${channelId}-breakdown`);
    if (!el) return;

    el.innerHTML = Object.entries(counts).map(([type, count]) => `
        <div class="breakdown-item" style="margin-bottom: 1rem">
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.2rem"><span>${type}</span><span>${count}</span></div>
            <div style="height: 8px; background: var(--bg-dark); border-radius: 4px; overflow:hidden">
                <div style="height:100%; width: ${total ? (count / total) * 100 : 0}%; background: var(--tj-primary)"></div>
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



// Helper: get current time in EAT (UTC+3)
function getEATDate() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3 * 3600000); // UTC+3
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

// Returns the Date object for the next 8pm EAT upload deadline
function getNextUploadDeadline(channelId) {
    const ch = CHANNELS[channelId];
    const nowEAT = getEATDate();
    const currentDay = nowEAT.getDay();
    const currentHour = nowEAT.getHours();

    // Check if today is an upload day and 8pm hasn't passed
    if (ch.uploadDays.includes(currentDay) && currentHour < 20) {
        const deadline = new Date(nowEAT);
        deadline.setHours(20, 0, 0, 0);
        return deadline;
    }

    // Find nearest future upload day using Monday-start numbering
    const currentDayMon = currentDay === 0 ? 7 : currentDay;
    const uploadDaysMon = ch.uploadDays.map(d => d === 0 ? 7 : d).sort((a, b) => a - b);

    // Find the next day strictly after today (or today if 8pm passed)
    let nextDayMon = uploadDaysMon.find(d => d > currentDayMon);
    if (nextDayMon === undefined) {
        // Wrap to next week — pick the earliest upload day
        nextDayMon = uploadDaysMon[0];
    }

    // Convert Monday-start day back to JS day for date calculation
    const nextDayJS = nextDayMon === 7 ? 0 : nextDayMon;
    const daysUntil = (nextDayJS + 7 - currentDay) % 7 || 7;

    const deadline = new Date(nowEAT);
    deadline.setDate(deadline.getDate() + daysUntil);
    deadline.setHours(20, 0, 0, 0);
    return deadline;
}

function getNextUploadInfo(channelId) {
    const nowEAT = getEATDate();
    const deadline = getNextUploadDeadline(channelId);
    const diff = deadline - nowEAT;
    const hours = Math.floor(diff / 3600000);

    if (hours < 24) {
        return 'Today @ 8pm EAT';
    }
    const days = Math.round(diff / 86400000);
    return `In ${days} day${days !== 1 ? 's' : ''}`;
}

// Live countdown timer
let countdownInterval = null;
function startCountdownTimers() {
    if (countdownInterval) clearInterval(countdownInterval);

    function updateCountdowns() {
        const nowEAT = getEATDate();
        for (const channelId in CHANNELS) {
            const el = document.getElementById(`countdown-${channelId}`);
            if (!el) continue;

            const deadline = getNextUploadDeadline(channelId);
            let diff = deadline - nowEAT;
            if (diff <= 0) {
                el.textContent = '🔴 NOW!';
                el.classList.add('countdown-urgent');
                continue;
            }

            const h = Math.floor(diff / 3600000);
            diff %= 3600000;
            const m = Math.floor(diff / 60000);
            diff %= 60000;
            const s = Math.floor(diff / 1000);

            el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

            // Add urgency class if under 2 hours
            if (h < 2) {
                el.classList.add('countdown-urgent');
            } else {
                el.classList.remove('countdown-urgent');
            }
        }
    }

    updateCountdowns();
    countdownInterval = setInterval(updateCountdowns, 1000);
}

// Global functions for inline Event Listeners
window.deleteVideo = deleteVideo;
window.openModal = openModal;
window.updateChannelId = updateChannelId;
window.promoteIdea = promoteIdea;
window.deleteIdea = deleteIdea;
window.toggleInspiration = toggleInspiration;
window.studyThumbnail = studyThumbnail;
window.saveHookToIdea = saveHookToIdea;

function getWorkflowSteps(currentStage) {
    const stages = ['Idea', 'Scripting', 'Filming', 'Editing', 'Ready'];
    const currentIndex = stages.indexOf(currentStage) > -1 ? stages.indexOf(currentStage) : 0;

    return stages.map((stage, idx) => `
        <div class="step-dot ${idx <= currentIndex ? 'active' : ''}" title="${stage}"></div>
    `).join('');
}

function renderCompetitors(channelId) {
    const channel = CHANNELS[channelId];
    const grid = document.getElementById(`${channelId}-competitors`);
    if (!grid) return;

    grid.innerHTML = (channel.competitors || []).map(comp => {
        const isInspired = inspirationSources.includes(comp.name);
        const topContentHtml = comp.topContent ? `
            <div class="content-hooks">
                <span class="hook-label">High-Performance Hooks:</span>
                ${comp.topContent.map(hook => {
            const videoUrl = hook.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(hook.title)}`;
            return `
                        <div class="hook-item">
                            <a href="${videoUrl}" target="_blank" class="hook-title" title="Watch on YouTube">${hook.title}</a>
                            <span class="hook-views">${hook.views} views</span>
                            <button class="btn-hook-add" onclick="saveHookToIdea('${channelId}', '${hook.title}')" title="Save hook to Idea Bank">+</button>
                        </div>
                    `;
        }).join('')}
            </div>
        ` : '';

        return `
            <div class="competitor-item ${isInspired ? 'inspired' : ''} ${comp.topContent ? 'has-content' : ''}">
                <div class="comp-main">
                    <div class="comp-info">
                        <h4>${comp.name}</h4>
                        <p>${comp.note}</p>
                    </div>
                    <div class="comp-actions">
                        <button class="btn btn-sm btn-outline study-btn" onclick="studyThumbnail('${comp.name}')">Study Thumbnails</button>
                        <button class="btn-icon" onclick="toggleInspiration('${comp.name}')" title="${isInspired ? 'Remove from Inspiration' : 'Add to Inspiration'}">
                            <svg viewBox="0 0 24 24" fill="${isInspired ? 'var(--accent)' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                ${topContentHtml}
            </div>
        `;
    }).join('');
}





function studyThumbnail(name) {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(name)}+popular+videos`, '_blank');
}

function saveHookToIdea(channelId, title) {
    const newIdea = {
        id: 'idea-' + Date.now(),
        channelId: channelId,
        title: title,
        description: 'Inspired by competitor performance. Adapt for your unique voice.',
        date: new Date().toISOString()
    };
    ideas.unshift(newIdea);
    saveToLocal();
    renderAll();
    alert('Hook saved to Idea Bank!');
}

function toggleInspiration(name) {
    const index = inspirationSources.indexOf(name);
    if (index > -1) {
        inspirationSources.splice(index, 1);
    } else {
        inspirationSources.push(name);
    }
    localStorage.setItem('yt_tracker_inspiration', JSON.stringify(inspirationSources));
    renderAll();
}

function parseViews(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const str = String(val).toUpperCase().replace(/,/g, '').trim();
    if (str.includes('M')) return parseFloat(str) * 1000000;
    if (str.includes('K')) return parseFloat(str) * 1000;
    return parseFloat(str) || 0;
}


