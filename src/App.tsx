import React, { useState } from "react";
import "./App.css";
// import DiscountCalculator from "./components/DiscountCalculatorOld";
// import Cart from "./components/Cart";
import CartX from "./components/Cart";
import DiscountCalculatorX from "./components/DiscountCalculator";

type Item = {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<Item[]>([]); // Explicitly define the type of cart here


  return (
    <div>
      <CartX cart={cart} setCart={setCart} />
      <DiscountCalculatorX cart={cart} />
    </div>
  );
}

export default App;
