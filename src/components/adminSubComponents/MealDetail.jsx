import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';

const apiUrl = config.URL;

const MealDetail = ({ meal }) => {
    const [editableMeal, setEditableMeal] = useState(meal);
    const [attributeToEdit, setAttributeToEdit] = useState('');

    const handleChange = (e) => {
        setEditableMeal({ ...editableMeal, [e.target.name]: e.target.value });
        setAttributeToEdit(e.target.name);
    };

    const updateMeal = async () => {
        try {
            const response = await axios.put(`${apiUrl}/admin/host/meal`, editableMeal, {
                params: { attributeName: attributeToEdit }
            });
            console.log('Meal updated:', response.data);
            // Handle post-update logic (e.g., showing a success message)
        } catch (error) {
            console.error('Error updating meal:', error);
            // Handle error
        }
    };

    return (
        <div>
            <input type="text" name="nameItem" value={editableMeal.nameItem} onChange={handleChange} />
            <input type="text" name="mealType" value={editableMeal.mealType} onChange={handleChange} />
            <input type="text" name="dp" value={editableMeal.dp} onChange={handleChange} />
            <select name="status" value={editableMeal.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
            </select>
            <input type="text" name="description" value={editableMeal.description} onChange={handleChange} />
            <select name="vegetarian" value={editableMeal.vegetarian} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input type="text" name="amount" value={editableMeal.amount} onChange={handleChange} />
            <button onClick={updateMeal}>Update</button>
        </div>
    );
};

export default MealDetail;
