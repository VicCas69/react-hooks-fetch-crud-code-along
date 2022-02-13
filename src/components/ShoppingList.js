import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(res=>res.json())
    .then((item) => setItems(item))
  }, [])

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = itemsToDisplay.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item
    })
    setItems(updatedItems)
  }

  function handleDeleteItem(itemToDelete){
      const arrDeletedItem = itemsToDisplay.filter((item) => {
        return item.id !== itemToDelete.id 
      })
      setItems(arrDeletedItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdatedItem={handleUpdatedItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
