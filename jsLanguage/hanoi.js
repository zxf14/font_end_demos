// 汉诺塔


// 把n-1个塔移到中间的柱子上，

// 把最后一个盘子移到目标柱子上

// 现在n-1个盘子在中间柱子上，它就变成开始的柱子，目标还是目标柱子

var hanoi=function(disc,src,aux,dst){
	if(disc>0){
		hanoi(disc-1,src,dst,aux);
		console.log('move disc '+disc+' from '+src+' to '+dst);
		hanoi(disc-1,aux,src,dst);
	}
}