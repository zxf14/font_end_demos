$(function() {
        var current = 1, //当前页指针（从1开始）
            slideNum = $(".carouselContent li").length; //图片个数
        // 每隔4秒自动轮换
        var auto = setInterval(function() {
            $(".carouselNext").trigger("click");
        }, 4000);
        // 加上小圆点导航
        for (i = 0; i < $(".carouselContent li").length; i++) {
            $(".carouselList").append("<span></span>")
        }
        $(".carouselList span:eq(0)").addClass("checked"); // 第一个小圆点导航加上选中状态
        $(".carouselContent li:eq(0)").show().siblings().hide(); // 第一张图片出现，其他图片隐藏
        //鼠标移入移出轮播图区域，上一页下一页按钮显现/消失，启动/停止轮播
        $(".carouselWrap").hover(function() {
            $(".carouselPrev,.carouselNext").stop(true, true).fadeIn(300);
            clearInterval(auto);
        }, function() {
            $(".carouselPrev,.carouselNext").stop(true, true).fadeOut(300);
            auto = setInterval(function() {
                $(".carouselNext").trigger("click");
            }, 4000);
        });
        // 下一页按钮点击事件
        $('.carouselNext').click(function(e) {
            e.preventDefault();
            //判断是否是最后一页
            if (current === slideNum) {
                $('.carouselContent li').eq(0).fadeIn(400).siblings().fadeOut(400);
                $(".carouselList span").eq(0).addClass("checked").siblings().removeClass();
                current = 1;
            } else {
                $('.carouselContent li').eq(current).fadeIn(400).siblings().fadeOut(400);
                $(".carouselList span").eq(current).addClass("checked").siblings().removeClass();
                current++;
            }
        });
        // 上一页按钮点击事件
        $('.carouselPrev').click(function(e) {
            e.preventDefault();
            // 判断是否是第一页
            if (current === 1) {
                $('.carouselContent li').eq(slideNum - 1).fadeIn(400).siblings().fadeOut(400);
                $(".carouselList span").eq(slideNum - 1).addClass("checked").siblings().removeClass();
                current = slideNum;
            } else {
                $('.carouselContent li').eq(current - 2).fadeIn(400).siblings().fadeOut(400);
                $(".carouselList span").eq(current - 2).addClass("checked").siblings().removeClass();
                current--;
            }
        });
        // 小圆点导航按钮点击切换图片
        $(".carouselList span").click(function() {
            current = $(this).index() + 1;
            $(this).addClass("checked").siblings().removeClass();
            $('.carouselContent li').eq(current - 1).fadeIn(300).siblings().fadeOut(600);
        });
    });