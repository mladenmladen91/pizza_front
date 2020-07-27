import React from 'react';
import './Order.css';


const order = (props) => (
    <div className="Order">
        <span>Name: {props.name} </span>
        <span>Amount: {props.amount} </span>
    </div>
);

export default order;