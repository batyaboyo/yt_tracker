// Schedule & Channel Management Functions
function detectScheduleConflicts() {
    const conflicts = [];
    const scheduleMap = {};

    for (const [key, channel] of Object.entries(CHANNELS)) {
        for (const day of channel.uploadDays) {
            const hour = channel.scheduleDetails[day];
            const timeKey = `${day}:${hour}`;

            if (scheduleMap[timeKey]) {
                conflicts.push({
                    channels: [scheduleMap[timeKey], key],
                    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day],
                    time: `${hour}:00 EAT`
                });
            } else {
                scheduleMap[timeKey] = key;
            }
        }
    }

    return conflicts;
}

function renderScheduleHeatmap() {
    const container = document.getElementById('schedule-grid');
    if (!container) return;

    const conflicts = detectScheduleConflicts();
    const alertsContainer = document.getElementById('schedule-alerts');

    // Display conflict alerts
    if (alertsContainer) {
        if (conflicts.length > 0) {
            alertsContainer.innerHTML = conflicts.map(conflict => {
                const ch1 = CHANNELS[conflict.channels[0]].name;
                const ch2 = CHANNELS[conflict.channels[1]].name;
                return `<div class="schedule-alert conflict"><span class="schedule-alert-icon">⚠️</span><span><strong>${ch1}</strong> and <strong>${ch2}</strong> both upload on <strong>${conflict.day} at ${conflict.time}</strong>. Consider staggering uploads.</span></div>`;
            }).join('');
        } else {
            alertsContainer.innerHTML = '<div class="schedule-alert info"><span class="schedule-alert-icon">✅</span><span>Great! No upload schedule conflicts detected. Your channels have good time spread.</span></div>';
        }
    }

    // Render heatmap grid
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = '';

    // Header row
    html += '<div class="schedule-cell header">Time</div>';
    days.forEach(day => {
        html += `<div class="schedule-cell header">${day}</div>`;
    });

    // Time rows (sample key times: 7am, 12pm, 8pm, 12am)
    [0, 7, 12, 20].forEach(hour => {
        const timeLabel = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour-12}pm`;
        html += `<div class="schedule-cell time-label">${timeLabel}</div>`;

        days.forEach((_, dayIdx) => {
            let hasActivity = false;
            let channelKey = '';
            let isConflict = false;

            for (const [key, channel] of Object.entries(CHANNELS)) {
                if (channel.uploadDays.includes(dayIdx)) {
                    const uploadHour = channel.scheduleDetails[dayIdx];
                    if (uploadHour === hour) {
                        hasActivity = true;
                        channelKey = key;
                        
                        // Check if conflict
                        for (const [otherKey, other] of Object.entries(CHANNELS)) {
                            if (otherKey !== key && other.uploadDays.includes(dayIdx)) {
                                if (other.scheduleDetails[dayIdx] === hour) {
                                    isConflict = true;
                                }
                            }
                        }
                    }
                }
            }

            const activityClass = hasActivity ? isConflict ? 'activity-high conflict' : 'activity-high' : 'activity-low';
            const channelClass = channelKey ? ` ${channelKey}` : '';
            const cellContent = hasActivity ? CHANNELS[channelKey].name.substring(0, 3) : '';
            html += `<div class="schedule-cell activity ${activityClass}${channelClass}">${cellContent}</div>`;
        });
    });

    container.innerHTML = html;
}

function renderChannelScheduleDetails() {
    const container = document.getElementById('channel-schedule-details');
    if (!container) return;

    let html = '';

    for (const [key, channel] of Object.entries(CHANNELS)) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const uploads = channel.uploadDays.map(day => {
            const hour = channel.scheduleDetails[day];
            const timeLabel = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour-12}pm`;
            return `${dayNames[day]} ${timeLabel}`;
        });

        const shortCount = channel.types.filter(t => t.includes('Short')).length;
        const longCount = channel.types.filter(t => !t.includes('Short')).length;
        const shortPercent = longCount === 0 ? 100 : (shortCount / channel.types.length * 100).toFixed(0);
        const longPercent = 100 - parseInt(shortPercent);

        const uploadList = uploads.map(time => `<div class="schedule-time-item"><strong>📅 ${time}</strong></div>`).join('');
        const progress = Math.min((channel.subscribers / channel.targetSubscribers * 100), 100);
        const subPercent = Math.round(channel.subscribers / channel.targetSubscribers * 100);

        html += `
            <div class="channel-schedule-item ${key}">
                <div class="channel-schedule-header">
                    <div>
                        <h4>${channel.name}</h4>
                        <span class="niche-badge">${channel.niche || 'Niche undefined'}</span>
                    </div>
                </div>
                <div class="schedule-times">
                    ${uploadList}
                </div>
                <div class="growth-target">
                    <strong>Growth Target:</strong> ${channel.targetSubscribers.toLocaleString()} subscribers
                    <div class="growth-progress">
                        <div class="growth-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <small>${channel.subscribers.toLocaleString()} / ${channel.targetSubscribers.toLocaleString()} (${subPercent}%)</small>
                </div>
                <div class="content-mix">
                    <span>Content Mix:</span>
                    <div class="mix-bar">
                        <div class="mix-segment shorts" style="width: ${shortPercent}%"></div>
                        <div class="mix-segment longform" style="width: ${longPercent}%"></div>
                    </div>
                    <span>${shortPercent}% Shorts • ${longPercent}% Long-form</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function initTimezoneSelector() {
    const selector = document.getElementById('timezone-select');
    if (!selector) return;

    const savedTz = localStorage.getItem('yt_tracker_timezone') || 'EAT';
    selector.value = savedTz;

    selector.addEventListener('change', (e) => {
        localStorage.setItem('yt_tracker_timezone', e.target.value);
        console.log(`⏰ Timezone changed to ${e.target.value}`);
    });
}

// Hook into existing tab initialization
function initScheduleTab() {
    const oldRenderAll = window.renderAll;
    window.renderAll = function() {
        oldRenderAll.apply(this, arguments);
        if (activeTab === 'schedule') {
            renderScheduleHeatmap();
            renderChannelScheduleDetails();
            initTimezoneSelector();
        }
    };
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScheduleTab);
} else {
    initScheduleTab();
}
