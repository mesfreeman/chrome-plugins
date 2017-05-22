chrome.notifications.create('123', {
    type: 'basic',
    iconUrl: '../images/remind.png',
    title: '小贺',
    message: '该休息一下了',
    contextMessage: '脖子扭扭，屁股扭扭，我们开始做运动',
}, function() {
    // 其它操作
});