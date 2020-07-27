import React from 'react';
import Order from '../Order/Order';
import './OrderSummary.css';



const orderSummary = (props) => {
    let orderAll = Object.keys(props.items)
        .map(igKey => {
            return [...Array(props.items[igKey])].map((_, i) => {
                return <Order name={props.items[igKey].name} amount={props.items[igKey].amount} key={igKey + i} type={igKey} />
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (orderAll.length === 0) {
        orderAll = <p>Cart is empty</p>
    }
    return (
        <div className="OrderSummary">
            {orderAll}
            <span>{(props.price > 0) ? props.price.toFixed(2) : 0}€</span>
        </div>
    );
};

export default orderSummary;