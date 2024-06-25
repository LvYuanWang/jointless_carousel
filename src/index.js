(function () {
    function $(select) {
        return document.querySelector(select);
    }
    var imgData = ['../img/Wallpaper1.jpg', '../img/Wallpaper2.jpg', '../img/Wallpaper3.jpg', '../img/Wallpaper4.jpg', '../img/Wallpaper5.jpg'];
    var container = $('.container'), container_img = $('.container-img'), bottom_click = $('.bottom-click'), previous_on = $('.click-left'), next_on = $('.click-right');
    var index = 0, timers = 500, isPlay = false, containerWidth = container.offsetWidth, Interval = null;
    // 程序主入口函数
    var init = function () {
        // 初始化
        dataCreate_Element();
        // 初始化底部导航条样式
        setBottomClick();
        // 事件入口函数
        initEvent();
    }
    var dataCreate_Element = function () {
        container_img.style.width = container.offsetWidth * (imgData.length + 1) + 'px';
        function createLi(index) {
            var li = document.createElement('li');
            li.innerHTML = '<img src=' + imgData[index] + '>';
            container_img.appendChild(li);
        }
        for (let i = 0; i < imgData.length; i++) {
            // 生成图片
            createLi(i);
            // 生成span元素
            var span = document.createElement('span');
            span.setAttribute('class', 'bt-click');
            span.setAttribute('item', i);
            bottom_click.appendChild(span);
        }
        // 将图片的第一张生成在元素最后
        createLi(0);
    }
    var setBottomClick = function () {
        var curIndex = index;
        if (curIndex > imgData.length - 1) {
            curIndex = 0;
        }
        var active = $('.bt-click.active');
        if (active) {
            active.setAttribute('class', 'bt-click');
        }
        bottom_click.children[curIndex].setAttribute('class', 'bt-click active');
    }
    function moveTo(newIndex, onend) {
        if (isPlay || newIndex === index) {
            return;
        }
        isPlay = true;
        var from = container_img.offsetLeft;
        var to = -newIndex * containerWidth;
        Animate({
            from: from,
            to: to,
            timers: timers,
            onmove: function (lft) {
                container_img.style.left = lft + 'px';
            },
            onend: function () {
                isPlay = false;
                onend && onend();
            }
        })
        index = newIndex;
        setBottomClick();
    }
    var initEvent = function () {
        bottom_click.addEventListener('click', onBtclick);
        previous_on.addEventListener('click', prev);
        next_on.addEventListener('click', next);
        container.addEventListener('mousemove', clearAutoNext);
        container.addEventListener('mouseleave', autoNext)
    }
    function onBtclick(e) {
        if (e.target.nodeName !== 'SPAN') {
            return;
        }
        var numberIndex = parseFloat(e.target.getAttribute('item'));
        moveTo(numberIndex);
    }
    function next() {
        var Item = index + 1;
        var onend;
        if (Item === container_img.children.length - 1) {
            onend = function () {
                container_img.style.left = '0px';
                index = 0;
            }
        }
        moveTo(Item, onend);
    }
    function prev() {
        var Itemindex = index - 1;
        if (Itemindex < 0) {
            var maxIndex = container_img.children.length - 1;
            container_img.style.left = -maxIndex * containerWidth + "px";
            Itemindex = maxIndex - 1;
        }
        moveTo(Itemindex);
    }
    function autoNext() {
        if (Interval) {
            return;
        }
        Interval = setInterval(() => {
            next();
        }, 2000);
    }
    function clearAutoNext() {
        clearInterval(Interval);
        Interval = null;
    }
    autoNext();
    init();
})()