// Configuration & Constants
let API_KEY = localStorage.getItem('yt_tracker_api_key') || 'AIzaSyDioQzo_L1ntXG43T4ADLUkslRhcmccf-A';
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
        searchFocus: 'real life christian stories testimony',
        competitors: [
            {
                name: "Delafé Testimonies",
                note: "Real-life Jesus stories, Powerful transformations",
                topContent: [
                    { title: "I Didn't Understand Why I Needed to Love JESUS...", views: "225K", url: "https://www.youtube.com/watch?v=Kz69kC5x4_A" },
                    { title: "I Grew Up in Islam, Hated GOD, Until THIS Happened...", views: "191K", url: "https://www.youtube.com/watch?v=uK1X7L2k7cM" },
                    { title: "I Had MONEY and FAME, But No PEACE Until JESUS...", views: "162K", url: "https://www.youtube.com/watch?v=F0f8h9m5GfE" },
                    { title: "This Google Search About the DEVIL Led Me to JESUS!", views: "162K", url: "https://www.youtube.com/watch?v=r_v2D6VvS0I" },
                    { title: "I Worshipped Rules Until JESUS Showed Me THIS...", views: "147K", url: "https://www.youtube.com/watch?v=yY19B2rE4uM" }
                ]
            },
            {
                name: "I Am Second",
                note: "High-production personal faith stories",
                topContent: [
                    { title: "Ryan Ries - White Chair Film - I Am Second®", views: "405K", url: "https://www.youtube.com/watch?v=Xn78yqj5d28" },
                    { title: "Kathy Ireland - Relying on Myself", views: "387K", url: "https://www.youtube.com/watch?v=2TzT3w7pXkY" },
                    { title: "Alex Kendrick - White Chair Film - I Am Second®", views: "251K", url: "https://www.youtube.com/watch?v=8X0uQk7lX7I" },
                    { title: "Jase Robertson - Answering the Call", views: "203K", url: "https://www.youtube.com/watch?v=y3nL49m-mY4" },
                    { title: "RA Dickey - Less Than Human", views: "193K", url: "https://www.youtube.com/watch?v=E7y8810Kq6c" }
                ]
            },
            {
                name: "700 Club Interactive",
                note: "Daily faith testimonies & stories",
                topContent: [
                    { title: "Miracles Still Happen - August 12, 2013", views: "105K" },
                    { title: "Angels All Around - October 13, 2014", views: "99K" },
                    { title: "Angels Are Real - August 13, 2013", views: "88K" },
                    { title: "Healed & Whole | Full Episode", views: "25K" },
                    { title: "God the Healer - June 27, 2013", views: "22K" }
                ]
            },
            {
                name: "Allen Parr",
                note: "Real-talk Christian life & apologetics",
                topContent: [
                    { title: "If You're Doing this ONE Thing, You May Not Be Saved", views: "2.9M" },
                    { title: "10 Signs Someone Isn't Really Christian", views: "530K" },
                    { title: "How to Renew Your Mind (Philippians 4:8 Explained)", views: "543K" },
                    { title: "Many Christians Won't Accept This Teaching on Tithing", views: "551K" },
                    { title: "5 Bible Prophecies on Jesus' Second Coming", views: "622K" }
                ]
            },
            {
                name: "Ordinary People (Podcast)",
                note: "Intimate looks into transformed lives",
                topContent: [
                    { title: "Beliefs Over Baseball (January 13th, 2026)", views: "320K" },
                    { title: "G-d Chose Me to be Shot by a Terrorist", views: "115K" },
                    { title: "Bringing Light to Alaska's Darkest Days", views: "95K" },
                    { title: "I Was Barely 20, But the Rebbe Believed in Me.", views: "50K" },
                    { title: "The Power Woman Behind 21 New Jewish Day Schools.", views: "27K" }
                ]
            },
            {
                name: "100 Huntley Street",
                note: "Inspiring life encounters",
                topContent: [
                    { title: "My incredible journey to faith in Jesus", views: "34K" },
                    { title: "Life-changing encounter with God (Testimony)", views: "20K" },
                    { title: "Healing and Restoration Stories (Compilation)", views: "15K" },
                    { title: "Overcoming Addiction through Faith", views: "12K" },
                    { title: "The Power of Prayer (Personal Story)", views: "10K" }
                ]
            },
            {
                name: "Stories of Faith",
                note: "Narrative-driven journeys",
                topContent: [
                    { title: "Miracles in Times of Need", views: "5.7K" },
                    { title: "Six Stories about Faith, Love, Humanity", views: "1.8K" },
                    { title: "Faith Through Crisis (Testimony)", views: "1K" },
                    { title: "Journey of Grace (Personal Story)", views: "500" },
                    { title: "Finding Peace in the Storm", views: "400" }
                ]
            },
            {
                name: "My Journey to Faith",
                note: "Personal storytelling",
                topContent: [
                    { title: "My Personal Faith Journey", views: "10K" },
                    { title: "My Christian Testimony (My Journey to Faith)", views: "8K" },
                    { title: "This Is My Testimony - My Spiritual Journey", views: "1.9K" },
                    { title: "From Darkness to Light (Testimony)", views: "1.5K" },
                    { title: "A Choice Amidst Crisis (Story)", views: "1K" }
                ]
            },
            {
                name: "The Normal Christian Life",
                note: "Everyday faith narratives",
                topContent: [
                    { title: "50 Countries Sing Amazing Grace", views: "4.4M" },
                    { title: "Man Was Dying of COVID 19, Then God Sent a Cleaner", views: "3.5M" },
                    { title: "3 Circles In 3 Minutes That Could Change Your Life", views: "183K" },
                    { title: "Could the World's Darkest Hour Become the Church?", views: "52K" },
                    { title: "Fires Causing Non-Believers to Pray", views: "44K" }
                ]
            },
            {
                name: "Living Waters",
                note: "Evangelism & Gospel encounters",
                topContent: [
                    { title: "Christians, You MUST Know This About Trump and Biden", views: "2.2M" },
                    { title: "Watch the Holy Spirit Work in Her Heart", views: "2.2M" },
                    { title: "THIS Opens the Door to the Demonic World", views: "2.2M" },
                    { title: "Christian stumps Jehovah's Witness with one question", views: "1M" },
                    { title: "He's Been Seeking Jesus...Then Cries After This", views: "1M" }
                ]
            }
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
                name: "The Dodo",
                note: "World-class heartwarming animal stories",
                topContent: [
                    { title: "Good Dogs Wait For Their Names To Be Called", views: "37M", url: "https://www.youtube.com/results?search_query=The+Dodo+Good+Dogs" },
                    { title: "30 Minutes Of Our Littlest, Fiercest Friends", views: "4.2M", url: "https://www.youtube.com/results?search_query=The+Dodo+30+minutes+littlest+friends" },
                    { title: "30+ Minutes Of The Oddest Couples You've Ever Seen", views: "3M", url: "https://www.youtube.com/results?search_query=The+Dodo+30+minutes+oddest+couples" },
                    { title: "30 Minutes Of Our Favorite Feel-Good Animal Stories", views: "1.4M", url: "https://www.youtube.com/results?search_query=The+Dodo+30+minutes+feel+good+stories" },
                    { title: "Marathon of The Happiest Dodo Stories EVER", views: "999K", url: "https://www.youtube.com/results?search_query=The+Dodo+Marathon+happiest+stories" }
                ]
            },
            {
                name: "Tucker Budzyn",
                note: "Famous Golden Retriever adventures",
                topContent: [
                    { title: "My Dog Rents a Swimming Pool", views: "59M", url: "https://www.youtube.com/watch?v=4x9tF1c944U" },
                    { title: "Hugging Another Dog Too Long | Jealous Dog Reaction", views: "53M", url: "https://www.youtube.com/watch?v=VlS-F2y_0M0" },
                    { title: "My Dog Has a Beach House Vacation", views: "50M", url: "https://www.youtube.com/watch?v=VlS-F2y_0M0" },
                    { title: "My Dog Becomes a Father | Part 1", views: "13M", url: "https://www.youtube.com/results?search_query=Tucker+Budzyn+Becomes+a+Father+Part+1" },
                    { title: "Dog Reviews Food With Puppy | Tucker Taste Test 15", views: "13M", url: "https://www.youtube.com/watch?v=o0h82c5f_0Q" }
                ]
            },
            {
                name: "Hammy and Olivia",
                note: "Talking pet skits & adventures",
                topContent: [
                    { title: "Try Not to Laugh - Funniest Talking Dog Videos!", views: "9M", url: "https://www.youtube.com/results?search_query=Hammy+and+Olivia+Try+Not+to+Laugh" },
                    { title: "Talking Corgi Compilation | Dogs talking like humans!", views: "5.5M", url: "https://www.youtube.com/results?search_query=Hammy+and+Olivia+Talking+Corgi+Compilation" },
                    { title: "SUPER HERO DOG SAVES THE DAY", views: "5.2M", url: "https://www.youtube.com/watch?v=H_I_J_K_L" },
                    { title: "Best of Hammy Being a Potato Compilation", views: "5M", url: "https://www.youtube.com/watch?v=CqYQ5l3g_jM" },
                    { title: "Talking Dogs Take on the EVIL Vacuum", views: "1.2M", url: "https://www.youtube.com/watch?v=YwVd_o_g7vE" }
                ]
            },
            {
                name: "Hope For Paws",
                note: "High-stakes animal rescue stories",
                topContent: [
                    { title: "Saving five orphaned puppies", views: "13M" },
                    { title: "Extremely matted homeless dog", views: "8.3M" },
                    { title: "Pit Bull rescue like you have never seen before!", views: "6.4M" },
                    { title: "Stray dog rescue - step by step", views: "2.6M" },
                    { title: "Something EXTREME had to be done to save this dog", views: "1.9M" }
                ]
            },
            {
                name: "That Little Puff",
                note: "Pet-led viral adventures & cooking",
                topContent: [
                    { title: "Puff joins the Squid Game craze!", views: "127M", url: "https://www.youtube.com/watch?v=R0_qIeM8k94" },
                    { title: "Puff joins the Squid Game craze! (Alt)", views: "108M", url: "https://www.youtube.com/results?search_query=That+Little+Puff+Squid+Game" },
                    { title: "Introducing the Puff Pillow", views: "2.6M", url: "https://www.youtube.com/results?search_query=That+Little+Puff+Puff+Pillow" },
                    { title: "New 30min Ultimate Cat Compilation!", views: "1.2M", url: "https://www.youtube.com/results?search_query=That+Little+Puff+Ultimate+Cat+Compilation" },
                    { title: "Cat Cooking Challenge (Epic)", views: "1M", url: "https://www.youtube.com/results?search_query=That+Little+Puff+Cooking+Challenge" }
                ]
            },
            {
                name: "Wonder (Pet Heroes)",
                note: "Extraordinary animal heroism",
                topContent: [
                    { title: "Great Danes Rescue Drowning Baby", views: "475K" },
                    { title: "Hero Dog Warns Family Of Deadly Threat", views: "272K" },
                    { title: "Boy Survived Extreme Cold Because Of His Dogs", views: "241K" },
                    { title: "Man's Life Was In Danger Until His Dog Saved Him", views: "200K" },
                    { title: "Good Boye Saved A Man From Drowning", views: "169K" }
                ]
            },
            {
                name: "That Good News Girl",
                note: "Feel-good pet narratives",
                topContent: [
                    { title: "Cat rejected for being 'too cuddly'", views: "1.6M" },
                    { title: "Husky saves ENTIRE neighborhood!", views: "1.4M" },
                    { title: "Stray dog tries to steal toy 5 TIMES", views: "1.1M" },
                    { title: "Adorable or DANGEROUS Animal Encounters", views: "27K" },
                    { title: "Something was trapped in this storm drain", views: "16K" }
                ]
            },
            {
                name: "Crusoe the Dachshund",
                note: "Themed pet journeys",
                topContent: [
                    { title: "Ep 8: Crusoe Saves Someone at the Beach!", views: "13M" },
                    { title: "Ep 47: QUARANTINE LIFE", views: "10M" },
                    { title: "Ep 44: Daphne Hosts a CRAZY TEA PARTY", views: "6.3M" },
                    { title: "Ep 46: Daphne Gets a HAIRCUT!", views: "5.6M" },
                    { title: "Ep 45: Daphne Has Surgery..", views: "5.4M" }
                ]
            },
            {
                name: "Maymo",
                note: "Cute pet life stories",
                topContent: [
                    { title: "Dogs vs Meowing Cat Skeleton Prank", views: "15M" },
                    { title: "Dogs Battle Evil Minions In Real Life!", views: "5.2M" },
                    { title: "Chef Dog Makes Canned Food Casserole", views: "4.7M" },
                    { title: "Dogs Murder Among Us Crewmates", views: "3.4M" },
                    { title: "Dog Chases Laser, Finds Pot of Treats", views: "1.6M" }
                ]
            },
            {
                name: "Apollo and Frens",
                note: "Daily pet antics & series",
                topContent: [
                    { title: "Talking Parrot's Learning Colors", views: "2M" },
                    { title: "The Second Animal to EVER Ask a Question", views: "1M" },
                    { title: "Apollo's 2022 Recap", views: "945K" },
                    { title: "Apollo's 2024 Recap", views: "203K" },
                    { title: "Apollo World Record Bird", views: "166K" }
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
let subsHistory = safeJSONParse('yt_tracker_subs_history', { lpbz: [], ecq: [] });
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
async function syncWithYouTube() {
    syncBtn.disabled = true;
    const originalText = syncBtn.innerText;
    syncBtn.innerHTML = `<span class="syncing-icon">↻</span> Syncing...`;

    // Optional: Add skeleton class to containers during sync
    const containers = ['global-stats-summary', 'dashboard-banner', 'card-lpbz', 'card-ecq', 'idea-list'];
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
        updateSyncStatusDisplay();
    } catch (error) {
        console.error('Sync failed:', error);
        alert('YouTube Sync failed. Please check your API key or connection.');
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

function openModal(channelId, videoId = null, ideaData = null, isIdeaMode = false) {
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

    // If it's just an idea, we might want to hide some fields, but for now let's keep it simple
    // and just save the relevant parts.

    document.getElementById('v-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('v-type').innerHTML = channel.types.map(t => `<option value="${t}">${t}</option>`).join('');
    document.getElementById('v-notes').value = '';
    document.getElementById('v-hook').value = '';
    document.getElementById('v-value').value = '';
    document.getElementById('v-cta').value = '';

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

    if (fetchBtn) {
        fetchBtn.addEventListener('click', fetchFreshInspirations);
    }
    if (filter) {
        filter.addEventListener('change', renderInspirationFeed);
    }

    renderInspirationFeed();
}

function renderInspirationFeed() {
    const feed = document.getElementById('inspiration-feed');
    if (!feed) return;

    const channelFilter = document.getElementById('inspiration-channel-filter').value;
    const channelKeys = channelFilter === 'all' ? ['lpbz', 'ecq'] : [channelFilter];

    let html = '';
    channelKeys.forEach(key => {
        const channel = CHANNELS[key];
        channel.competitors.forEach(comp => {
            const items = comp.topContent.slice(0, 3); // Show top 3 per competitor
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
    const channelFilter = document.getElementById('inspiration-channel-filter').value;
    const channelKeys = channelFilter === 'all' ? ['lpbz', 'ecq'] : [channelFilter];

    btn.disabled = true;
    btn.textContent = '⏳ Fetching...';
    feed.innerHTML = '<div class="inspiration-loading"><p>Fetching trending videos from competitor channels...</p></div>';

    try {
        let allResults = [];

        for (const key of channelKeys) {
            const channel = CHANNELS[key];
            // Pick a random subset of competitors to avoid too many API calls
            const selectedComps = channel.competitors
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            for (const comp of selectedComps) {
                try {
                    const focus = channel.searchFocus || '';
                    const query = encodeURIComponent(`${comp.name} ${focus}`);
                    const res = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&order=viewCount&maxResults=5&key=${API_KEY}`
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
                    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
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
    const totalViews = liveVideos.reduce((sum, v) => sum + v.views, 0);
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
    const nextUpload = getNextUploadInfo(channelId);
    const schedStatus = isOnSchedule(channelId, channelVideos);
    card.innerHTML = `
        <h3>${channel.name}</h3>
        <div class="channel-card-stat"><span>Subscribers</span><span>${channel.subscribers.toLocaleString()}</span></div>
        <div class="channel-card-stat"><span>Weekly Goal</span><span>${channel.schedule}</span></div>
        <div class="channel-card-stat"><span>Status</span><span class="${schedStatus ? 'on-schedule' : 'off-schedule'}">${schedStatus ? '✓ On Schedule' : '○ Behind Schedule'}</span></div>
        <div class="channel-card-stat"><span>Next Upload</span><span>${nextUpload}</span></div>
        <div class="countdown-row">
            <span class="countdown-label">⏱ Countdown</span>
            <span class="countdown-timer" id="countdown-${channelId}">--:--:--</span>
        </div>
    `;
    startCountdownTimers();
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

// Helper: get current time in EAT (UTC+3)
function getEATDate() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3 * 3600000); // UTC+3
}

function isOnSchedule(channelId, channelVideos) {
    const nowEAT = getEATDate();
    const startOfWeek = new Date(nowEAT);
    startOfWeek.setDate(nowEAT.getDate() - (nowEAT.getDay() === 0 ? 6 : nowEAT.getDay() - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // Count upload days whose 8pm EAT deadline has already passed this week
    // Convert JS day (Sun=0) to Monday-start numbering (Mon=1..Sun=7) for proper ordering
    const ch = CHANNELS[channelId];
    const currentDayMon = nowEAT.getDay() === 0 ? 7 : nowEAT.getDay();
    const currentHour = nowEAT.getHours();

    const passedDeadlines = ch.uploadDays.filter(d => {
        const dMon = d === 0 ? 7 : d; // Convert Sunday
        if (dMon > currentDayMon) return false;       // Future day this week
        if (dMon === currentDayMon) return currentHour >= 20; // Today, but only if 8pm passed
        return true;                                   // Past day this week
    }).length;

    if (passedDeadlines === 0) return true; // No deadlines passed yet — can't be behind

    const uploadsThisWeek = channelVideos.filter(v => new Date(v.date) >= startOfWeek).length;
    return uploadsThisWeek >= passedDeadlines;
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
    const days = Math.ceil(diff / 86400000);
    return `In ${days} day${days > 1 ? 's' : ''}`;
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

// Initial Render handled by DOMContentLoaded listener at top of file.


