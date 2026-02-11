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
        subscribers: 0,
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
        schedule: '2 shorts per week',
        color: '#f472b6',
        uploadDays: [1, 3],
        subscribers: 0,
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
            }
        ]
    }
};

// State Management
let videos = JSON.parse(localStorage.getItem('yt_tracker_videos')) || [];
let ideas = JSON.parse(localStorage.getItem('yt_tracker_ideas')) || [];
let subsHistory = JSON.parse(localStorage.getItem('yt_tracker_subs_history')) || { lpbz: [], ecq: [] };
let activeTab = 'dashboard';
let lastSync = localStorage.getItem('yt_tracker_last_sync') || 'Never';
let inspirationSources = JSON.parse(localStorage.getItem('yt_tracker_inspiration')) || [];
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
// Rendering Logic
function renderAll() {
    renderGlobalStats();
    if (activeTab === 'dashboard') {
        renderDashboard();
    } else if (activeTab === 'idea-bank') {
        renderIdeaBank();
    } else if (activeTab === 'settings') {
        renderSettings();
    } else {
        renderChannelView(activeTab.replace('tab-', ''));
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
window.toggleInspiration = toggleInspiration;
window.studyThumbnail = studyThumbnail;
window.saveHookToIdea = saveHookToIdea;

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

// Initial Render
renderAll();
