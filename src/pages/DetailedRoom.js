import React from "react";
import './DetailedRoom.css';
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

const ChecklistItem = ({ text, checked, onToggle }) => {

    const checkboxId = `checkbox-${text.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className={`ChecklistItem ${checked ? 'checked' : ''}`}>
            <input type="checkbox" checked={checked} onChange={onToggle} id={checkboxId} />
            <label htmlFor={checkboxId} onClick={() => onToggle}>
                <span>{text}</span>
            </label>
        </div>
    );
};

const Checklist = ({ items, setItems }) => {

    const handleToggle = (itemName) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.name === itemName) {
                    return { ...item, checked: !item.checked };
                }
                return item;
            });
        });
        console.log(items);
    };

    return (
        <div className="ChecklistContainer">
            {items.map((item) => (
                <ChecklistItem
                    key={item.name}
                    text={item.name}
                    checked={item.checked}
                    onToggle={() => handleToggle(item.name)}
                />
            ))}
        </div>
    );
};

const DetailedRoom = () => {
    const [items, setItems] = useState([
        { name: "Dishes", checked: false, price: 5 },
        { name: "Pots and Pans", checked: false, price: 5 },
        { name: "Utensils", checked: false, price: 5 },
        { name: "Cups", checked: false, price: 5 },
        { name: "Knife Set", checked: true, price: 5 },
        { name: "Blender", checked: true, price: 5 },
        { name: "Toaster", checked: true, price: 5 },
        { name: "Oven Mitts", checked: true, price: 5 },
    ]);

    // State for controlling the visibility of the add item pop-up
    const [isAddItemPopupOpen, setAddItemPopupOpen] = useState(false);

    // State for capturing the input values of the new item
    const [newItemName, setNewItemName] = useState('');

    // Function to handle adding a new item
    const handleAddItem = () => {
        if (newItemName.trim() !== '') {
          setItems((prevItems) => [
            { name: newItemName, checked: false, price: 0 },
            ...prevItems,
          ]);
          setNewItemName('');
          setAddItemPopupOpen(false);
        }
    };

    

    return (
        <div className="screen-container">
            <div className="DetailedRoom">
                <h2 className="checklist-name">Kitchen</h2>

                <button onClick={() => setAddItemPopupOpen(true)}>Add New Item</button>

                {/* Pop-up for adding a new item */}
                {isAddItemPopupOpen && (
                    <div className="AddItemPopup">
                        <h3>Add New Item</h3>
                        <label>
                            Item Name:
                            <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </label>
                        <button onClick={handleAddItem}>Add Item</button>
                        <button onClick={() => setAddItemPopupOpen(false)}>Cancel</button>
                    </div>
                )}

                <Checklist items={items} setItems={setItems} />
            </div>
            <NavigationBar />
        </div>

    );
}

export default DetailedRoom;