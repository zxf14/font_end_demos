'use strict';

(function(){
	var $_=(selec,obj=document)=>obj.querySelectorAll(selec);
	var aTags=$_('a');
	var bodys=$_('.panel-collapse');

	aTags.forEach((item,index)=>{
		item.addEventListener('click',handleClick(index));
	});

	function handleClick(index){
		return function(e){
			e.preventDefault();
			var target=e.target;
			var cbody=bodys[index];
			if(cbody.className.indexOf('fade')!==-1){
				cbody.className='panel-collapse collapse';

			}
			else{
				cbody.className='panel-collapse collapse fade';

			}
			
		}
	}

})();