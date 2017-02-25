import React,{Component} from 'react';

var data=['http://www.imooc.com/static/img/index/banner2.jpg',
  'http://img.mukewang.com/57216d6a0001e14720000600.jpg',
  'http://img.mukewang.com/570668da0001874d20000600.jpg'];

const TIME=300;
const INTERVAL=10;
const PLAYINTERVAL=3000;

class CarouselContent extends Component{

  render() {
    let img=[],sum=data.length;
    img.push(<li key={data.length+1}><a><img src={data[sum-1]}/></a></li>);
    data.forEach((item,index)=>{
      img.push(<li key={index+1}><a><img src={item}/></a></li>)
    });
    img.push(<li key={0}><a><img src={data[0]}/></a></li>)
    return (
      <ul className="carouselContent" style={{left: this.props.left}}>{img}</ul>
    );
  }
}

class ToggleUnit extends Component{
  toPrev=(event)=>{
    event.preventDefault();
    this.props.prev();
  };

  toNext=(event)=>{
    event.preventDefault();
    this.props.next();
  };

  render() {
    return (
      <div><a href='' className='prev arrow' onClick={this.toPrev}>{'<'}</a>
        <a href='' className='next arrow' onClick={this.toNext}>{'>'}</a></div>
    );
  }
}

class ControllerUnit extends Component{
  toggleTo=(event)=>{
    let indexTo=event.target.getAttribute('data-slide-to');
    // 一下子忘记了这里都是string，找了半天bug
    indexTo=parseInt(indexTo);
    this.props.toggleImg(indexTo);
  };

  render() {
    let dots=[];
    data.forEach((item,index)=>{
      dots.push(<span data-slide-to={index} className={index===this.props.index?'active':''} onClick={this.toggleTo} key={index}></span>);
    });
    return (
      <p className="carouselList">{dots}</p>
    );
  }
}

export default class Carousel extends Component{
  constructor(){
    super();
    this.state={
      index:0,
      left:'-600px',
      isMoving:false
    }
    this.sum=data.length;
    this.timer=null;
  }

  play=()=>{
    if(!this.timer){
      this.timer=setInterval(this.next,PLAYINTERVAL);
    }
  };



  stopPlay=()=>{
    if(this.timer){
      clearInterval(this.timer);
      this.timer=null;
    }
  };

  animate=(indexTo,callback)=>{
    let newLeft=this.getLeft(indexTo);
    let left=parseInt(this.state.left);
    let distance=newLeft-left,
        speed=distance/(TIME/INTERVAL);

    var go=(indexTo)=>{
      let newLeft=this.getLeft(indexTo);
      let left=parseInt(this.state.left);
      if((speed<0&&newLeft<left)||(speed>0&&newLeft>left)){
        this.setState({left:(left+speed)+'px'});
        setTimeout(()=>{go(indexTo)},INTERVAL);
      }
      else{
        callback&&callback();

      }
    };
    go(indexTo);

// debugger;

  };

  getLeft=(index)=>{
    let newIndex=parseInt(index)||0;
    return -(newIndex+1)*600;
  };

  prev=()=>{
    let indexTo=(this.state.index-1+this.sum)%this.sum;
    if(indexTo!==this.sum-1){
      this.animate(indexTo,this.changeState(indexTo));
    }else{
      this.animate(-1,this.changeState(indexTo));
    }
  };

  changeState=(indexTo)=>{
    let left=this.getLeft(indexTo);
    return ()=>{this.setState({index:indexTo,left:left+'px'})};
  };

  next=()=>{
    let indexTo=(this.state.index+1)%this.sum;
    if(indexTo===0){
      this.animate(this.sum,this.changeState(indexTo))
    }
    else{
      this.animate(indexTo,this.changeState(indexTo));
    }
  };

  toggleImg=(indexTo)=>{
    this.animate(indexTo,this.changeState(indexTo));
  };

  componentDidMount(){
    this.play();
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer=null;
  }

  render() {
    return (
      <div className="carouselContainer">
        <ToggleUnit prev={this.prev} next={this.next}/>
        <CarouselContent left={this.state.left} index={this.state.index}/>
        <ControllerUnit index={this.state.index} toggleImg={this.toggleImg}/>
      </div>
    );
  }
}
