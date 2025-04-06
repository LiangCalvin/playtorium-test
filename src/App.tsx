import React, { useState } from "react";
import "./App.css";
import CartX from "./components/Cart/Cart";
import DiscountCalculatorX from "./components/DiscountCalculator/DiscountCalculator";

type Item = {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<Item[]>([]);

  return (
    <div>
      <CartX cart={cart} setCart={setCart} />
      <DiscountCalculatorX cart={cart} />
    </div>
  );
}

export default App;
