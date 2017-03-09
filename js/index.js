var _video = document.getElementById('my-video'),
    btn_play = document.getElementById('btn-play'),
    btn_stop = document.getElementById('btn-stop'),
    slipper = document.getElementById('slipper'),
    video_wrap = document.getElementById('video-wrap'),
    video_progress = document.getElementById('video-progress'),
    video_duration = document.getElementById('video-duration'),
    video_current = document.getElementById('video-current');

var body_w = document.body.clientWidth,
    body_h = document.body.clientHeight;

var y0, y1;

var pro_left = (btn_play.offsetWidth) * 2

video_wrap.style.width = body_h + 'px';
video_wrap.style.height = body_w + 'px';

var pro_w = video_progress.offsetWidth;

console.log(pro_w)

var changeTime = function (timer) {
    var _h = parseInt(timer / 3600),
        _h2 = timer % 3600,
        _m = parseInt((timer - _h * 3600) / 60),
        _s = timer - _h * 3600 - _m * 60;

    var _res = '';
    // if (_h2 == 0) { _res = (_h < 10?'0' + _h:_h) + ':00:00'; }
    _res = (_h < 10?'0' + _h:_h) + ':' + (_m < 10?'0' + _m:_m) + ':' + (_s < 10?'0' + _s:_s) ;
    console.log(_res)
    return _res;
};

console.log(_video)

btn_play.addEventListener("click", function() { 
    _video.play(); 
    btn_play.className = 'hide';
    btn_stop.className = 'btn-video';
    
}, true);

btn_stop.addEventListener("click", function() { 
    _video.pause();
    btn_play.className = 'btn-video';
    btn_stop.className = 'hide';
}, true);

_video.addEventListener('pause',function(){
    btn_play.className = 'btn-video';
    btn_stop.className = 'hide';
});
_video.addEventListener('playing',function(){
    btn_play.className = 'hide';
    btn_stop.className = 'btn-video';
});
_video.onended = function () {
    console.log('over')
    btn_play.className = 'btn-video';
    btn_stop.className = 'hide';
};

// 获取总时间
_video.addEventListener('loadedmetadata',function(){
  console.log(_video.duration);
  video_duration.innerHTML = changeTime(parseInt(_video.duration))
});

//  display the current time
_video.addEventListener("timeupdate", function () { 
  var vTime = _video.currentTime;
  var vDur = _video.duration;
  video_current.innerHTML = changeTime(parseInt(vTime))
  video_progress.value = (vTime / vDur) * 100;
  slipper.style.left = (vTime / vDur * pro_w - 3) + 'px';
}, false);

slipper.addEventListener('touchstart',function (e) {
  // var touches = e.changedTouches[0];
  // y0 = touches.clientY;
  console.log(e)
});

slipper.addEventListener('touchmove',function (e) {
  e.preventDefault()
  var touches = e.changedTouches[0];
  y1 = touches.clientY;
  console.log(y1)
  var differ = (y1 - pro_left);
  slipper.style.left = differ + 'px';
  video_progress.value = parseInt(differ / pro_w) * 100;
  // console.log(video_progress.value)
  _video.currentTime = (differ / pro_w) * _video.duration
});

slipper.addEventListener('touchend', function (e) {

});



// webView.allowsInlineMediaPlayback = YES;

