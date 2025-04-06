import React from 'react'

type Item = {
    id: string;
    name: string;
    price: number;
    category: string;  
    quantity: number;
  };
  interface CartProps {
    cart: Item[];
    setCart: React.Dispatch<React.SetStateAction<Item[]>>;
  }
const availableItems: Item[] = [
    { id: "1", name: "Shirt", price: 350, category: "Clothing", quantity: 0 },
    { id: "2", name: "Hoodie", price: 700, category: "Clothing", quantity: 0 },
    { id: "3", name: "Watch", price: 850, category: "Accessories", quantity: 0 },
    { id: "4", name: "Bag", price: 640, category: "Accessories", quantity: 0 },
    { id: "5", name: "Hat", price: 250, category: "Accessories", quantity: 0 },
    { id: "6", name: "Belt", price: 230, category: "Accessories", quantity: 0 },
  ];
export default function CartX(props: CartProps) {
    // const { cart, setCart } = props;
    const cart = props.cart;
    const setCart = props.setCart;

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addToCart = (item: Item) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    
          if (existingItem) {
            return prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
    
          return [...prevCart, { ...item, quantity: 1 }];
        });
      };

  return (
    <div>
    <h2>Shopping Cart</h2>

    <h3>Available Items</h3>
    <ul>
      {availableItems.map((item) => (
        <li key={item.id}>
          {item.name} - {item.price} THB
          <button onClick={() => addToCart(item)} style={{ marginLeft: '10px' }}>
            Add to Cart
          </button>
        </li>
      ))}
    </ul>

    <h3>Your Cart</h3>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = {item.price * item.quantity} THB
          </li>
        ))}
      </ul>
    )}

    <h3>Total Price: {totalPrice} THB</h3>
  </div>  )
}
