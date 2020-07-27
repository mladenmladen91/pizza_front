import React, { Component } from 'react';
import './Pizza.css';

class Pizza extends Component {
    render() {
        return (
            <div className="Pizza">
                <span className="title">{this.props.name}</span>
                <span onClick={() => this.props.add(this.props.id, this.props.max, this.props.price, this.props.name)}>+</span>
                <span onClick={() => this.props.remove(this.props.id, this.props.price)}>-</span>
            </div>
        )
    }
}

export default Pizza;