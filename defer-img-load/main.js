(function(){
	//获取的是nodeList的实例对象，所以不能用map,但是有forEach这个方法在原型链上
	let imgs=document.querySelectorAll('img');
	// 获取的是HTMLCollection的实例对象，没有什么方法，只能for循环
	// let imgs2=document.getElementsByTagName('img');

	const INTERVAL=1000;
	const DISTANCE=100;
	let wait=false;

	let getElementTop=node=>{
		let actualTop=node.offsetTop;
		let current=node.offsetParent;
		while(current!==null){
			actualTop+=current.offsetTop;
			current=current.offsetParent;
		}
		return actualTop;
	}

	let getHeightFromHorizon=(node)=>{
		let offsetHeight=window.pageYOffset;
		const screenHeight=screen.availHeight;
		let elementTop=getElementTop(node);
		let result=screenHeight-elementTop+offsetHeight;
		return result;
	}

	let loadImg=(node)=>{
		node.src=node.dataset.src;
		node.className='loaded'
	}

	handleScroll=(callback)=>{
		let previousCall=new Date().getTime();
		return (e=>{
			let diff=new Date().getTime()-previousCall
			if(diff>INTERVAL){
				callback.apply(null,arguments);
				previousCall=new Date().getTime();
			}
		})
	}

	let checkImgs=()=>{
		let allLoaded=true;
		imgs.forEach((node)=>{
			if(getHeightFromHorizon(node)>DISTANCE&&node.className.length===0){
				allLoaded=false;
				loadImg(node);
			}
			return node;
		});	
		if(allLoaded){
			// debugger;
			window.removeEventListener('scroll',ontimeLoad);
		}
	}
	
	checkImgs();

	

	ontimeLoad=(e)=>{
	    if(!wait){
	      wait=true;
	      setTimeout(function(){
	        wait=false;
	        checkImgs();
	      },10);
	    }
	}

	// window.addEventListener('scroll',handleScroll(checkImgs));
	window.addEventListener('scroll',ontimeLoad);

	
})();