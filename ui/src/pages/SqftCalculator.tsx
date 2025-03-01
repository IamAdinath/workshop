import React, { useState } from "react";
import { Trash, Plus } from "lucide-react";
import "../styles/sqftcalculator.css";

interface Item {
  id: number;
  name: string;
  customName: string;
  length: string;
  width: string;
  quantity: string;
  total: number;
}

const furnitureOptions = ["Cupboard", "Sofa", "Dining Table", "Bed", "Chair", "Other"];

const SqftCalculator: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), name: "", customName: "", length: "", width: "", quantity: "1", total: 0 },
  ]);
  const [sqftPrice, setSqftPrice] = useState(40);

  const calculateTotal = (updatedItems: Item[]) => {
    return updatedItems.map((item) => {
      const length = parseFloat(item.length) || 0;
      const width = parseFloat(item.width) || 0;
      const quantity = parseInt(item.quantity) || 1;

      if (length > 0 && width > 0) {
        const sqft = (length * width) / 144;
        item.total = parseFloat((sqft * quantity * sqftPrice).toFixed(2));
      } else {
        item.total = 0;
      }
      return item;
    });
  };

  const handleChange = (id: number, field: keyof Item, value: string) => {
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
      { id: Date.now(), name: "", customName: "", length: "", width: "", quantity: "1", total: 0 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="sqft-container prime-theme">
      <h1>Billing Calculator</h1>
      <div className="sqft-price-container">
        <label className="sqft-label">Sqft Price:</label>
        <input className="sqft-input" type="number" value={sqftPrice} onChange={(e) => handleSqftPriceChange(Number(e.target.value))} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Length (in)</th>
            <th>Breadth (in)</th>
            <th>Units</th>
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
              <td><input type="number" inputMode="numeric" value={item.length} placeholder="0" onChange={(e) => handleChange(item.id, "length", e.target.value)} /></td>
              <td><input type="number" inputMode="numeric" value={item.width} placeholder="0" onChange={(e) => handleChange(item.id, "width", e.target.value)} /></td>
              <td><input type="number" inputMode="numeric" value={item.quantity} min="1" placeholder="1" onChange={(e) => handleChange(item.id, "quantity", e.target.value)} /></td>
              <td>₹{item.total.toFixed(2)}</td>
              <td>
                <button className="remove-btn">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={addItem}>
        <Plus size={16} /> Add Item
      </button>
      <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
    </div>
  );
};

export default SqftCalculator;
