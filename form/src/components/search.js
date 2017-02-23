import React, {
	Component
} from 'react';

var data=[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


class SearchBar extends Component {
	constructor(){
		super();
		this.state={
			value:""
		}
	}

	handleClick=(event)=>{

	};

	handleChange=(event)=>{
		let _value=event.target.value;
		// this.setState({value:_value});
		this.props.filter(_value);
	};

	render(){
		return <div>
		<input value={this.props.value} onChange={this.handleChange}/>
		<div><input onClick={this.handleClick} type="checkbox"/>only show products in stock</div>
		</div>
	}

}

class ProductTable extends Component {
	render(){
		let row=[],cat=[],product=[];
		let filterValue=this.props.filterValue||""; 

		data.map((item,i)=>{
			if(item.name.indexOf(filterValue)===-1){
				return item;
			}
			let index=row.length,
				catIn=cat.indexOf(item.category);
			if(catIn===-1){
				cat.push(item.category);
				row[index]=[];
				row[index].push(item);
			}
			else{
				row[catIn].push(item);
			}
			return item;
		});
		cat.forEach((item,index)=>{
			product.push(<ProductCategoryRow key={index} cat={item}/>);
			row[index].forEach((item,i)=>product.push(<ProductRow key={item.name} data={item}/>));
		});
		return <table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Price</th>
				</tr>
			</thead>
			<tbody>{product}</tbody>
		</table>
	}

}

class ProductCategoryRow extends Component {

	render(){
		return <tr>
			<td style={{color:"red"}}>{this.props.cat}</td>
			</tr>
	}

}

class ProductRow extends Component {
	render(){
		let product=this.props.data;
		return <tr><td>{product.name}</td><td>{product.price}</td></tr>
	}

}

export default class FilterableProductTable extends Component {
	constructor() {
		super();
		this.state={
			value:"",
			inStock:false
		}
	}

	handleChange=(event)=>{
		this.setState({value:event.target.value});
	};

	filter=(value)=>{
		this.setState({value:value});

	};

	render( ){
		return (<div className="filterTable">
					<SearchBar value={this.state.value} filter={this.filter}/> 
					<ProductTable filterValue={this.state.value}/>
				</div>);
	}
}