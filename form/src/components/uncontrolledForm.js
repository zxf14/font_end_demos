import React,{Component} from 'react';

export default class Uncontrolled extends Component{
	constructor(){
		super();

	}

	handleClick = () => {
		const _value = this._words.value;
		alert("input is "+_value);
	};

	handleChange=()=>{

	};

	render(){
		return (<div>
				<label>非控制组件</label>
				<input ref={(input)=>this._words=input}/ >
				<button onClick={this.handleClick}> submit </button> 
			</div>);
	}
}