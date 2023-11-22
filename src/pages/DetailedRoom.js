import React, { useEffect } from "react";
import './DetailedRoom.css';
import { useState, useCallback} from "react";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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

    const navigate = useNavigate();
    const onBackArrowClick = useCallback(() => {
        navigate("/prototype-purchase-screen");
      }, [navigate]);

    const [items, setItems] = useState([]);

    // State for controlling the visibility of the add item pop-up
    const [isAddItemPopupOpen, setAddItemPopupOpen] = useState(false);

    // State for capturing the input values of the new item
    const [newItemName, setNewItemName] = useState('');

    // Function to handle adding a new item
    const handleAddItem = async () => {
        if (newItemName.trim() !== '') {
          setItems((prevItems) => [
            { name: newItemName, checked: false, price: 0 },
            ...prevItems,
          ]);

          try {
            const updatedItem = { id: uuidv4(), name: newItemName, checked: false, price: 20}

            const response = await fetch(`http://localhost:3000/purchaseList/1/items/${updatedItem.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedItem),
            });
      
            if (response.ok) {
              console.log('Item updated successfully');
              // You can perform additional actions after a successful PUT request
            } else {
              console.error('Failed to update item');
            }
          } catch (error) {
            console.error('Error making PUT request:', error);
          }

          setNewItemName('');
          setAddItemPopupOpen(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/purchaseList/1');
                const data = await response.json();
                console.log(data.items);
                setItems(data.items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []); // The empty dependency array ensures the effect runs only once on mount

    

    return (
        <div className="screen-container">
            <div className="DetailedRoom">
                <div className="BackArrow" onClick={onBackArrowClick}>
                    {"<"}
                </div>
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