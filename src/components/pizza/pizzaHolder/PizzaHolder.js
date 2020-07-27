import React, { Component } from 'react';
import axios from 'axios';
import Pizza from '../pizzaContent/Pizza';
import OrderSummary from '../../orderSummary/OrderSummary';
import './PizzaHolder.css';

class PizzaHolder extends Component {
    state = {
        order_items: [],
        name: "test",
        city: "",
        address: "",
        phone: "",
        email: "",
        total: 0,
        pizzas: []
    }

    // code gor adding pizzas to the cart
    addIngredientHandler = (id, max, price, name) => {
        let orderCopy = [
            ...this.state.order_items
        ];
        let orderNew = {
            id: id,
            amount: 1,
            name: name
        }

        price = parseFloat(price);

        let totalPrice = this.state.total;

        if (orderCopy.length > 0) {

            let nadjeno = orderCopy.find(x => x.id === id);

            if (nadjeno) {
                if (max >= nadjeno.amount + 1) {
                    orderCopy.find(x => x.id === id).amount += 1;
                    totalPrice += price;
                }

            } else {
                orderCopy.push(orderNew);
                totalPrice += price;
            }

        } else {
            orderCopy.push(orderNew);
            totalPrice += price;
        }

        this.setState({
            order_items: orderCopy,
            total: totalPrice
        });
    }

    // code for removing pizzas from the cart
    removeIngredientHandler = (id, price) => {
        let orderCopy = [
            ...this.state.order_items
        ];

        price = parseFloat(price);

        let totalPrice = this.state.total;
        let nadjeno = orderCopy.find(x => x.id === id);

        if (nadjeno) {
            if (nadjeno.amount - 1 > 0) {
                orderCopy.find(x => x.id === id).amount -= 1;
                totalPrice -= price;
            } else {
                orderCopy = orderCopy.filter(function (item) {
                    return item.id !== id
                });
                totalPrice -= price;
            }
        }

        if (totalPrice < 0 || isNaN(totalPrice)) {
            totalPrice = 0;
        }

        this.setState({
            order_items: orderCopy,
            total: totalPrice
        });
    }

    // getting values from fields
    myChangeHandler = (event) => {
        //this.setState({username: event.target.value});
        switch (event.target.getAttribute('name')) {
            case 'name':
                this.setState({ name: event.target.value });
                break;
            case 'email':
                this.setState({ email: event.target.value });
                break;
            case 'city':
                this.setState({ city: event.target.value });
                break;
            case 'address':
                this.setState({ address: event.target.value });
                break;
            case 'phone':
                this.setState({ phone: event.target.value });
                break;
            default:
                break;
        }
    }

    // submitting form
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.order_items.length > 0) {
            let data = JSON.stringify(this.state);


            axios.post('http://127.0.0.1:8000/admin/order', data)
                .then(response => {
                    if (response.success === true) {
                        alert(response.message);
                    } else {
                        alert(response.message);
                    }
                }).catch(error => {
                    alert(error);
                });
        } else {
            alert('Pick some pizza from menu :))');
        }


    }

    // getting pizza list
    componentDidMount() {


        axios.get('http://127.0.0.1:8000/getAll')
            .then(response => {
                this.setState({
                    pizzas: response
                });
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true });
            });
    }

    render() {

        let orderSummary = <OrderSummary items={this.state.order_items} price={this.state.total} />;

        let pizzas = Object.keys(this.state.pizzas)
            .map(igKey => {
                return [...Array(this.state.pizzas[igKey])].map((_, i) => {
                    return <Pizza add={this.addIngredientHandler} remove={this.removeIngredientHandler} id={this.state.pizzas[igKey].id} name={this.state.pizzas[igKey].name} max={this.state.pizzas[igKey].amount} price={this.state.pizzas[igKey].price} key={igKey + i} />
                })
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []);
        if (pizzas.length === 0) {
            pizzas = <p>No pizzas currently available</p>
        }

        return (
            <div className="Container">
                <h1>Pizza menu</h1>
                <div>
                    {pizzas}
                </div>

                {orderSummary}

                <div>
                    <form className="OrderForm" onSubmit={this.handleSubmit}>
                        <input type="text" name="name" placeholder="Name" required onChange={this.myChangeHandler} />
                        <input type="email" name="email" placeholder="E-mail" required onChange={this.myChangeHandler} />
                        <input type="text" name="phone" placeholder="Phone" required onChange={this.myChangeHandler} />
                        <input type="text" name="city" placeholder="City" required onChange={this.myChangeHandler} />
                        <input type="text" name="address" placeholder="Address" required onChange={this.myChangeHandler} />
                        <button>Order</button>
                    </form>
                </div >

            </div >
        );
    }
}

export default PizzaHolder;