import React, { useState } from 'react';

const Main = () => {
  const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
  ];

  const [items, setItems] = useState(initialItems);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const togglePacked = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const Logo = () => {
    return <h1>🌴 Far Away 🧳</h1>;
  };

  const Form = () => {
    const [addOn, setAddOn] = useState({ description: '', quantity: 1 });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!addOn.description) return;
      const newItem = {
        id: Date.now(),
        description: addOn.description,
        quantity: addOn.quantity,
        packed: false,
      };
      addItem(newItem);
      setAddOn({ description: '', quantity: 1 });
    };

    const handleOptionChange = (e) => {
      setAddOn((prevAddOn) => ({
        ...prevAddOn,
        quantity: parseInt(e.target.value, 10),
      }));
    };

    const handleItemChange = (e) => {
      setAddOn((prevAddOn) => ({
        ...prevAddOn,
        description: e.target.value,
      }));
    };

    return (
      <form className='add-form' onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip</h3>
        <select onChange={handleOptionChange} value={addOn.quantity}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder='Item...'
          value={addOn.description}
          onChange={handleItemChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  };

  const Item = ({ item, togglePacked, removeItem }) => {
    return (
      <li key={item.id}>
        <input type="checkbox" checked={item.packed} onChange={() => togglePacked(item.id)} />
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.description} - {item.quantity}
        </span>
        <button onClick={() => removeItem(item.id)}>❌</button>
      </li>
    );
  };

  const PackagingList = ({ items, togglePacked, removeItem }) => {
    return (
      <div className='list'>
        <ul>
          {items.map((item) => (
            <Item item={item} key={item.id} togglePacked={togglePacked} removeItem={removeItem} />
          ))}
        </ul>
      </div>
    );
  };

  const Status = ({ items }) => {
    const packedItems = items.filter(item => item.packed).length;
    const totalItems = items.length;
    const percentagePacked = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;
    return (
      <footer className='stats'>
        <em>You have {totalItems} items on your list, and you already packed {packedItems} ({percentagePacked}%)</em>
      </footer>
    );
  };

  return (
    <>
      <Logo />
      <Form addItem={addItem} />
      <PackagingList items={items} togglePacked={togglePacked} removeItem={removeItem} />
      <Status items={items} />
    </>
  );
};

export default Main;
