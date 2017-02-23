import React, {
	Component
} from 'react';

export default class ControlledForm extends Component {
	constructor() {
		super();
		this.state={
			value:""
		}

	}

	handleClick = () => {
		alert("input is "+this.state.value);
	};

	handleChange=(event)=>{
		this.setState({value:event.target.value});
	};

	render( ){
		return (<div>
					<label>控制组件</label>
					<input value={this.state.value} onChange={this.handleChange}/>
					<button onClick={this.handleClick}> submit </button> 
				</div>);
	}
}