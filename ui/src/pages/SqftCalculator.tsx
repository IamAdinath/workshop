import React, { useState } from "react";
import "../styles/sqftcalculator.css";

const SqftCalculator: React.FC = () => {
  const [length, setLength] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("1");
  const [result, setResult] = useState<number | null>(null);

  const calculateSqft = () => {
    if (length && width && quantity) {
      setResult((Number(length) * Number(width) * Number(quantity)) / 144);
    }
  };

  return (
    <div className="sqft-container">
      <h1>Square Feet Calculator</h1>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter Length (inches)"
          value={length}
          onChange={(e) => setLength(e.target.value ? Number(e.target.value) : "")}
        />
        <input
          type="number"
          placeholder="Enter Width (inches)"
          value={width}
          onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : "")}
        />
        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : "1")}
          min="1"
        />
        <button onClick={calculateSqft}>Calculate</button>
      </div>
      {result !== null && <p className="result">Total Area: {result.toFixed(2)} ft²</p>}
    </div>
  );
};

export default SqftCalculator;
