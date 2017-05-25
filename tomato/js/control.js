// 获取当前窗口
var current_window = chrome.app.window.current();

var focusing = document.createElement('audio');
focusing.setAttribute('loop', 'loop');
focusing.setAttribute('src', '/audio/ocean.m4a');

var completed = document.createElement('audio');
completed.setAttribute('src', '/audio/completenotification.m4a');

var time = document.getElementById('time');
var audioTitle = document.getElementById('audioTitle');
var title = document.getElementById('title');
var audioFileArray = new Array('ocean.m4a', 'rain.m4a', 'forest.m4a', 'meditation.m4a', 'coffee.m4a','');
var audioNameArray = new Array('海浪', '雨天', '森林', '冥想', '咖啡', '无声');
var audioTag = 0;          // 音频标识
var maxtime = 25 * 60 - 1; // 专注时间
var timerIsOn = 1;         // 计时标识
var focusIsOn = 1;         // 专注标识
var st;                    // 定时标识

// 声音控制
time.onclick = function() {
    if (focusIsOn) {
        // 声音是否暂停
        var isPaused = focusing.paused

        audioTag = audioTag == 5 ? 0 : audioTag + 1;
        if (audioTag != 5) {
            focusing.setAttribute('src', '/audio/' + audioFileArray[audioTag]);
            audioTitle.innerHTML = audioNameArray[audioTag];
            if (! isPaused || audioTag == 0) {
                focusing.play();
            }
        } else {
            focusing.pause();
            audioTitle.innerHTML = audioNameArray[audioTag];
        }
    }
    // console.log(isPaused);
}

/* 倒计时控制 */
function showTime(el) {
    // 每隔一秒执行一次
    st = setTimeout(function(){showTime(el)}, 1000);

    if(maxtime >= 0){
        m = Math.floor(maxtime / 60);
        s = Math.floor(maxtime % 60);

        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        -- maxtime;

        // 写入页面
        el.innerHTML = m + ':' + s;
    } else {
        // 暂停播放音
        focusing.pause();

        // 播放专注完成音乐
        completed.play();

        // 重置界面
        startAndPause.setAttribute('class', 'fa fa-play-circle');
        if (focusIsOn) {
            time.innerHTML = '<span style="font-size: 37px;">喝杯水</span>';
            maxtime = 5 * 60;
            focusIsOn = 0;
        } else {
            time.innerHTML = '<span style="font-size: 37px;">专注吧</span>';
            maxtime = 25 * 60;
            focusIsOn = 1;
        }

        // 清除计时
        timerIsOn = 1;
        clearTimeout(st);
    }
};

// 开始倒计时
function startTimer(){
    if (timerIsOn){
        timerIsOn = 0;
        showTime(time)
        // 播放白噪音
        if (focusIsOn) {
            title.innerHTML = '蕃茄钟 - 专注';
            audioTitle.innerHTML = audioNameArray[audioTag];
            focusing.play();
        } else {
            title.innerHTML = '蕃茄钟 - 休息';
            audioTitle.innerHTML = '无声';
        }
    }
}

// 暂停倒计时
function pauseTimer(){
    // 清除计时
    timerIsOn = 1;
    clearTimeout(st);
    // 暂时音乐
    focusing.pause();
}

/* 播放控制 */

// 放弃
var restart = document.getElementById('restart');
// 开始与暂停
var startAndPause = document.getElementById('startAndPause');
// 休息
var rest = document.getElementById('rest');

// 放弃处理逻辑
restart.onclick = function() {
    // 数据重置
    maxtime = 25 * 60 - 1;
    focusIsOn = 1;
    // 清除计时
    timerIsOn = 1;
    clearTimeout(st);
    // 暂时音乐
    focusing.pause();

    // console.log(audioTag);

    // 重置界面
    title.innerHTML = '蕃茄钟 - 专注提升自我';
    time.innerHTML = '25:00';
    focusing.setAttribute('src', '/audio/' + audioFileArray[audioTag]);
    audioTitle.innerHTML = audioNameArray[audioTag];
    startAndPause.setAttribute('class', 'fa fa-play-circle');
}

// 开始与暂停处理逻辑
startAndPause.onclick = function() {
    var startAndPauseClassName = startAndPause.getAttribute('class');
    if (startAndPauseClassName == 'fa fa-play-circle') {
        startAndPause.setAttribute('class', 'fa fa-pause-circle');
        // 专注逻辑处理
        startTimer();
    } else {
        startAndPause.setAttribute('class', 'fa fa-play-circle');
        // 暂停逻辑处理
        pauseTimer();
    }
}

// 休息处理逻辑
rest.onclick = function() {
    // 数据重置
    maxtime = 5 * 60 - 1;
    focusIsOn = 0;
    // 清除计时
    timerIsOn = 1;
    clearTimeout(st);
    // 暂时音乐
    focusing.pause();

    // 重置界面
    time.innerHTML = '05:00';
    title.innerHTML = '蕃茄钟 - 休息';
    audioTitle.innerHTML = '休息';
    startAndPause.setAttribute('class', 'fa fa-play-circle');
}