import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

const MealDetail = ({ meal }) => {
    const [editableMeal, setEditableMeal] = useState(meal);
    const [attributeToEdit, setAttributeToEdit] = useState('');
// <<<<<<< Updated upstream
    const [isUpdating, setIsUpdating] = useState(false);


    const token = useAuthToken(); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
// >>>>>>> Stashed changes
    const handleChange = (e) => {
        if (!isUpdating) {
            setEditableMeal({ ...editableMeal, [e.target.name]: e.target.value });
            setAttributeToEdit(e.target.name);
        } else {
            alert('Please complete the current update before editing another field.');
        }
    };

    const updateMeal = async () => {
        setIsUpdating(true);
        try {
            const response = await axios.put(`${apiUrl}/admin/host/meal`, editableMeal, {
                headers,
                params: { attributeName: attributeToEdit }
              });
            console.log('Meal updated:', response.data);
            alert(`Meal ${attributeToEdit} updated successfully!`);
        } catch (error) {
            console.error('Error updating meal:', error);
            alert('Error updating meal.');
        }
        setIsUpdating(false);
    };

    return (
        <div>
            <input type="text" name="nameItem" value={editableMeal.nameItem} onChange={handleChange} />
            <input type="text" name="mealType" value={editableMeal.mealType} onChange={handleChange} />
            <input type="text" name="dp" value={editableMeal.dp} onChange={handleChange} />
            <select name="status" value={editableMeal.status.toString()} onChange={handleChange}>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
            </select>
            <input type="text" name="description" value={editableMeal.description} onChange={handleChange} />
            <select name="vegetarian" value={editableMeal.vegetarian} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input type="text" name="amount" value={editableMeal.amount} onChange={handleChange} />
            <button onClick={updateMeal} disabled={isUpdating}>Update</button>
        </div>
    );
};

export default MealDetail;
