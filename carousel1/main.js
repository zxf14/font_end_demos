(function(){
	// 位移总时间
	const ANIMAT_TIME=300;
	// 位移间隔时间ms
	const ANIMAT_INTERVAL=10;

	var contaniner=document.querySelector('.carouselContainer');
	var carouselContent=contaniner.querySelector('.carouselContent');
	var carouselItems=carouselContent.getElementsByTagName('li');
	var carouselList=contaniner.querySelector('.carouselList');
	var next=contaniner.querySelector('.next');
	var prev=contaniner.querySelector('.prev');

	const imgNum=carouselItems.length;
	var index=0;
	var animated=false;
	var timer;


	(function init(){
		// 添加下面的控制点
		for(var i=0;i<carouselItems.length;i++){
			var span=document.createElement("span");
			let index=i+"";
			span.setAttribute("data-slide-to",index);
			carouselList.appendChild(span);
		}

		// 让控制台的第一个亮起来
		var spans=carouselList.getElementsByTagName('span');
		spans[0].className="active";

		// 添加第一个图和最后一图
		var itemNum=carouselItems.length;
		var lastImg=carouselItems[itemNum-1];
		var firstImg=carouselItems[0];
		var lastCopy=lastImg.cloneNode(true);
		var firstCopy=firstImg.cloneNode(true);
		carouselContent.appendChild(firstCopy);
		carouselContent.insertBefore(lastCopy,firstImg);


	})();

	next.addEventListener('click',toNextImg,false);
	prev.addEventListener('click',toPreImg,false);
	carouselList.addEventListener('click',toggleImg,false);
	contaniner.addEventListener('mouseover',stopPlay,false);
	contaniner.addEventListener('mouseout',play,false);

	function play(){
		console.log("play");
		if(!timer){
			timer=setInterval(function(){
					toNextImg();
				},3000);
		}
	}

	play();

	function stopPlay(){
		console.log("stop play");
		if(timer&&!animated){
			clearInterval(timer);
			timer=null;
		}
	}

	function toggleImg(e){
		e.preventDefault();
		var beforeIndex=index;
		var target=e.target;
		var num=target.getAttribute("data-slide-to");
		num=parseInt(num);
// 首先获得当前的于之前的图片，然后不停的轮
		var slides=num-beforeIndex;
		// 如果正在动画，禁止
		if(animated)return;
		animate(-600*slides,function(){
			indexAdd(slides);
			toggleControll();
		});

	}
// 把下面的控制点设置为当前的图片index
	function toggleControll(){
		var spans=carouselList.getElementsByTagName('span');
		for(var i=0;i<spans.length;i++){
			spans[i].className="";
		}
		spans[index].className="active";
	}

	function toNextImg(e){
		e&&e.preventDefault();
		indexAdd();
		toggleControll();
		// 如果正在动画，禁止
		if(animated)return;
		animate(-600,function(){
			var number=getLeft(carouselContent);
			var maxleft=(-600)*(carouselItems.length-2);
			if(number<maxleft){
				// 最后一张图片的位置
				var left=-600;
				carouselContent.setAttribute("style","left:-600px");
			}
		});
		
		
	}

	function toPreImg(e){
		e&&e.preventDefault();
		indexDec();
		toggleControll();
		// 如果正在动画，禁止
		if(animated)return;
		animate(600,function(){
			var number=getLeft(carouselContent);
			if(number>-600){
				// 最后一张图片的位置
				var left=(-600)*(carouselItems.length-2);
				var style="left:"+left+"px";
				carouselContent.setAttribute("style",style);
			}
		});
		
	}

	function indexAdd(inc){
		inc=inc||1;
		index=index+inc;
		index=index%imgNum;
	}

	function indexDec(dec){
		dec=dec||1;
		index=index-dec+imgNum;
		index=index%imgNum;
		// debugger;
	}
	function animate(offset,callback){
		animated=true;
		// 当前距离
		var left=getLeft(carouselContent);
		// 目标距离
		var newLeft=left+offset;

		var speed=offset/(ANIMAT_TIME/ANIMAT_INTERVAL);

		function go(){
			var nowLeft=getLeft(carouselContent);
			if((offset<0&&nowLeft>newLeft)||(offset>0&&nowLeft<newLeft)){
				var thisOff=nowLeft+speed;
				carouselContent.setAttribute("style","left:"+thisOff+"px");
				setTimeout(go,ANIMAT_INTERVAL);
			}
			// 已到位了或者移过头了
			else{
				carouselContent.setAttribute("style","left:"+newLeft+"px");
				callback&&callback();
				animated=false;
			}
		}
		go();

		
		// var style="left:"+offset+"px";
		// carouselContent.setAttribute("style",style); 
	}

	function getStyle(element, attr) {
		// list.style.left
		if(element.style&&element.style[attr]){
			return element.style[attr];
		}
		if(element.currentStyle) {
			return element.currentStyle[attr];
		} else {
			return getComputedStyle(element, false)[attr];
		}
	}

	function getLeft(node){
		var left=getStyle(node,"left");
		return parseInt(left);
	}

})();
