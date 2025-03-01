import React, { useState } from "react";
import { Trash, Plus } from "lucide-react";
import "../styles/estimator.css";

interface Item {
  id: number;
  name: string;
  customName: string;
  length: number;
  width: number;
  quantity: number;
  total: number;
}

const furnitureOptions = ["Cupboard", "Sofa", "Dining Table", "Bed", "Chair", "Other"];

const Estimator: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), name: "", customName: "", length: 0, width: 0, quantity: 1, total: 0 },
  ]);
  const [sqftPrice, setSqftPrice] = useState(40);

  const calculateTotal = (updatedItems: Item[]) => {
    return updatedItems.map((item) => {
      if (item.length > 0 && item.width > 0) {
        const sqft = (item.length * item.width) / 144;
        item.total = parseFloat((sqft * item.quantity * sqftPrice).toFixed(2));
      } else {
        item.total = 0;
      }
      return item;
    });
  };

  const handleChange = (id: number, field: keyof Item, value: string | number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );
      return calculateTotal(updatedItems);
    });
  };

  const handleSqftPriceChange = (value: number) => {
    setSqftPrice(value);
    setItems((prevItems) => calculateTotal(prevItems));
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), name: "", customName: "", length: 0, width: 0, quantity: 1, total: 0 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="sqft-container">
      <h1>Billing Calculator</h1>
      <div className="sqft-price-container">
        <label className="sqft-label">Sqft Price </label>
        <input className="sqft-input" type="number" value={sqftPrice} onChange={(e) => handleSqftPriceChange(Number(e.target.value))} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>L (in)</th>
            <th>B (in)</th>
            <th>Qty</th>
            <th>Total (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <select value={item.name} onChange={(e) => handleChange(item.id, "name", e.target.value)}>
                  <option value="">Select Item</option>
                  {furnitureOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {item.name === "Other" && (
                  <input 
                    type="text" 
                    placeholder="Enter other name" 
                    value={item.customName} 
                    onChange={(e) => handleChange(item.id, "customName", e.target.value)} 
                  />
                )}
              </td>
              <td><input type="number" inputMode="numeric" value={item.length} onChange={(e) => handleChange(item.id, "length", Number(e.target.value))} /></td>
              <td><input type="number" inputMode="numeric" value={item.width} onChange={(e) => handleChange(item.id, "width", Number(e.target.value))} /></td>
              <td><input type="number" inputMode="numeric" value={item.quantity} min="1" onChange={(e) => handleChange(item.id, "quantity", Number(e.target.value))} /></td>
              <td>₹{item.total.toFixed(2)}</td>
              <td>
                <button className="remove-btn transparent-btn" onClick={() => removeItem(item.id)}>
                  <Trash size={16} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn transparent-btn" onClick={addItem}>
        <Plus size={16} /> Add Item
      </button>
      <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
    </div>
  );
};

export default Estimator;
