import './App.css';
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';



const App = () => {
  const [items, setItems] = useState([
    { i: '1', x: 0, y: 0, w: 2, h: 2, text: '' },
    { i: '2', x: 0, y: 1, w: 2, h: 2, text: '' , value: 4 },
  ]);
  // console.log(items.sort((x, y) => (x.y - y.y)));

  const addItem = () => {
    const newItem = {
      i: (items.length + 1).toString(),
      x: 0,
      y: Infinity, // places it at the bottom
      w: 2,
      h: 2,
      text: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.i !== id));
  };

  const logStructure = () => {
    console.log(items
      .sort((x, y) => (x.y - y.y))
      .map((item) => ([item.i, item.text]))
    );
  }

  const handleInputChange = (id, event) => {
    setItems(items.map(item => item.i === id ? { ...item, text: event.target.value } : item));
  };

  const handleLayoutChange = (newLayout) => {
    const updatedItems = items.map(item => {
      const layoutItem = newLayout.find(l => l.i === item.i);
      return layoutItem ? { ...item, ...layoutItem } : item;
    });
    setItems(updatedItems);  // Update the layout but keep the text intact
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <button onClick={logStructure}>Log Structire</button>
      <GridLayout
        className="layout"
        layout={items}
        cols={12}
        rowHeight={30}
        width={2200}
        onLayoutChange={handleLayoutChange}
      >
        {items.map((item) => (
          <div key={item.i}>
            <span>Item {item.i}: {item.text}</span>
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleInputChange(item.i, e)}
              placeholder="Enter text..."
              // style={styles.inputField}
            />
            <button onClick={() => removeItem(item.i)}>Remove</button>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default App;
