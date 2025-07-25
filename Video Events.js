window._wq = window._wq || [];

var wistiaTrackedPercentages = {};

var isClosingVideo = false;
var lastVideoState = 'unknown';

_wq.push({
    id: "_all",
    onReady: function(video) {
        var videoTitle = video.name();
        var videoId = video.hashedId();
        var videoDurationSeconds = video.duration();

        wistiaTrackedPercentages[videoId] = {
            '25': false,
            '50': false,
            '75': false,
            '100': false
        };

        function formatSecondsToMMSS(seconds) {
            if (isNaN(seconds) || seconds < 0) return "00:00";
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = Math.floor(seconds % 60);
            return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
        }

        function formatSecondsToDecimalMinutes(seconds) {
            if (isNaN(seconds) || seconds < 0) return 0;
            return (seconds / 60).toFixed(2);
        }

        function sendTealiumVideoEvent(eventName, currentPercentage, videoState, currentTimeSecs, durationSecs) {
            var displayPercentage = Math.min(100, Math.floor(currentPercentage));

            utag.link({
                'event_name': eventName,
                'type': 'Video',
                'video_platform': 'Wistia',
                'video_title': videoTitle,
                'video_id': videoId,
                'video_current_time_seconds': currentTimeSecs,
                'video_current_time_minutes': formatSecondsToDecimalMinutes(currentTimeSecs),
                'video_current_time': formatSecondsToMMSS(currentTimeSecs),
                'video_duration_seconds': durationSecs,
                'video_duration_minutes': formatSecondsToDecimalMinutes(durationSecs),
                'video_duration': formatSecondsToMMSS(durationSecs),
                'video_percent': displayPercentage,
                'video_state': videoState,
                'page_type': utag_data.page_type || 'unknown'
            });
        }

        video.bind('play', function() {
            var currentPercentage = Math.floor(video.time() / videoDurationSeconds * 100);
            if (video.time() === 0 || wistiaTrackedPercentages[videoId]['100']) {
                wistiaTrackedPercentages[videoId] = {
                    '25': false,
                    '50': false,
                    '75': false,
                    '100': false
                };
                sendTealiumVideoEvent('video_start', currentPercentage, 'playing', video.time(), videoDurationSeconds);
            } else if (lastVideoState === 'paused') {
                sendTealiumVideoEvent('video_resume', currentPercentage, 'playing', video.time(), videoDurationSeconds);
            } else {
                sendTealiumVideoEvent('video_start', currentPercentage, 'playing', video.time(), videoDurationSeconds);
            }
            lastVideoState = 'playing';
        });

        video.bind('pause', function() {
            if (!isClosingVideo) {
                sendTealiumVideoEvent('video_pause', Math.floor(video.time() / videoDurationSeconds * 100), 'paused', video.time(), videoDurationSeconds);
            }
            lastVideoState = 'paused';

            setTimeout(function() {
                isClosingVideo = false;
            }, 100);
        });

        video.bind('end', function() {
            if (!wistiaTrackedPercentages[videoId]['100']) {
                wistiaTrackedPercentages[videoId]['100'] = true;
                sendTealiumVideoEvent('video_complete', 100, 'ended', video.duration(), video.duration());
            }
            isClosingVideo = false;
            lastVideoState = 'ended';
        });

        video.bind('timechange', function(currentTime) {
            var currentPercent = Math.floor((currentTime / videoDurationSeconds) * 100);

            var milestones = [25, 50, 75, 100];

            milestones.forEach(function(threshold) {
                if (currentPercent >= threshold && !wistiaTrackedPercentages[videoId][threshold]) {
                    if (threshold === 100 && video.state() !== 'ended') {
                         wistiaTrackedPercentages[videoId][threshold] = true;
                         sendTealiumVideoEvent('video_%', threshold, 'playing', currentTime, videoDurationSeconds);
                    } else if (threshold < 100) {
                        wistiaTrackedPercentages[videoId][threshold] = true;
                        sendTealiumVideoEvent('video_%', threshold, 'playing', currentTime, videoDurationSeconds);
                    }
                }
            });
        });

        var popoverCloseButton = document.getElementById('wistia-gyhuzoibyx-1_popover_popover_close_button');
        if (popoverCloseButton) {
            popoverCloseButton.addEventListener('click', function() {
                isClosingVideo = true;
                var currentTime = video.time() || 0;
                var currentDuration = videoDurationSeconds || 0;
                var currentCompletion = (currentDuration > 0) ? Math.floor(currentTime / currentDuration * 100) : 0;

                sendTealiumVideoEvent('video_closed', currentCompletion, 'closed', currentTime, currentDuration);

                if (video.state() === 'playing') {
                    video.pause();
                }
                lastVideoState = 'closed';

                setTimeout(function() {
                    isClosingVideo = false;
                }, 200);
            });
        }
    }
});
