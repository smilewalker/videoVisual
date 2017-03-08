var _video = document.getElementById('my-video'),
    btn_play = document.getElementById('btn-play'),
    btn_stop = document.getElementById('btn-stop'),
    video_duration = document.getElementById('video-duration'),
    video_current = document.getElementById('video-current');


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
    console.log(_video.duration);
    video_duration.innerHTML = changeTime(parseInt(_video.duration))
}, true);

btn_stop.addEventListener("click", function() { 
    _video.pause(); 
    btn_play.className = 'btn-video';
    btn_stop.className = 'hide';
}, true);

//  display the current time
_video.addEventListener("timeupdate", function () { 
  var vTime = _video.currentTime;
  video_current.innerHTML = changeTime(parseInt(vTime))
}, false);

