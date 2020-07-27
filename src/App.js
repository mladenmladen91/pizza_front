import React from 'react';
import Layout from './components/Layout'
import PizzaHolder from './components/pizza/pizzaHolder/PizzaHolder'


function App() {
  return (
    <div>
      <Layout>
        <PizzaHolder />
      </Layout>
    </div>
  );
}

export default App;
