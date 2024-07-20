import React from 'react'
import { useState } from 'react';

const Copy = () => {

  const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
  ];

  const [items, setItems] = useState(initialItems)

  const hanldeCheckItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  }

  const Logo = () => {
    return <h1>🌴 Far Away 🧳</h1>;
  };

  const Form = () => {

    const [addOn, setAddOn] = useState({description: '', quantity: 1})

    const handleChange = (e) => {
      e.preventDefault();
      const {name, value} = e.target;
      setAddOn((prevAddOn) => ({
        ...prevAddOn,
        [name] : name === 'quantity' ? parseInt(value, 10) : value,
      }));
    }

    const handleOnSubmit = () => {
      if(!addOn.description) return;
      const currentFinalId = items.length
      let generatedId = currentFinalId + 1;
      const newItem = {
        id: generatedId, description: addOn.description, quantity: addOn.quantity, packed: false
      }
      setItems([...items, newItem]);
    }

    return (
      <>
      <form className='add-form' onSubmit={handleOnSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select name='quantity' onChange={handleChange} value={addOn.quantity}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          name='description'
          placeholder='Item...'
          value={addOn.description}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      </>
    )
  }

  const Item = ({item}) => {
    return (
      <li key={item.id}>
        <input type="checkbox" checked={item.packed} onClick={() => hanldeCheckItem(item.id)}/>
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.description} - {item.quantity}
        </span>
        <button onClick={()=> handleRemoveItem(item.id)}>❌</button>
      </li>
    )
  }

  const PackagingList = () => {
    return (
      <div className='list'>
        <ul>
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      </div>
    );
  };

  const Status = () => {
    const totalItems = items.length;
    const packedItems = items.filter(item => item.packed).length
    const packedPercentage = packedItems / totalItems * 100
    return (
      <footer className='stats'>
        <em>You have {totalItems} items on your list, and you already packed {packedItems} ({packedPercentage > 0 ? parseInt(packedPercentage) : 0})%</em>
      </footer>
    );
  }

  return (
   <>
     <Logo />
     <Form />
     <PackagingList />
     <Status />
   </>
  )
}

export default Copy