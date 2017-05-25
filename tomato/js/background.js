chrome.app.runtime.onLaunched.addListener(function() {
    // 创建窗口
    chrome.app.window.create('../main.html', {
        'id': '',
        'bounds': {
            'width': 300,
            'height': 300
        },
        'resizable': false,
        'frame': 'none'
    });
});
