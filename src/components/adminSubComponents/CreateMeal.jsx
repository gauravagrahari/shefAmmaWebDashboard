import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

const CreateMeal = ({ hostId, onMealCreated }) => {
    const [mealEntity, setmealEntity] = useState({
        uuidMeal: hostId, // assuming the hostId should be used as the uuidMeal
        nameItem: '',
        mealType: '',
        dp: '',
        status: '',
        description: '',
        vegetarian: '',
        amount: ''
    });
    const token = useAuthToken(); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const handleChange = (e) => {
        setmealEntity({ ...mealEntity, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/admin/meal`, mealEntity, { headers });
            console.log('Meal Created:', response.data);
            alert('Meal created successfully!');
            onMealCreated(); // Callback to update the meal list in parent component
        } catch (error) {
            console.error('Error creating meal:', error);
            alert('Error creating meal.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nameItem" value={mealEntity.nameItem} onChange={handleChange} placeholder="Name" />
            <input type="text" name="mealType" value={mealEntity.mealType} onChange={handleChange} placeholder="Meal Type" />
            <input type="text" name="dp" value={mealEntity.dp} onChange={handleChange} placeholder="DP" />
            <select name="status" value={mealEntity.status} onChange={handleChange}>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
            </select>
            <textarea name="description" value={mealEntity.description} onChange={handleChange} placeholder="Description" />
            <select name="vegetarian" value={mealEntity.vegetarian} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input type="text" name="amount" value={mealEntity.amount} onChange={handleChange} placeholder="Amount" />
            <button type="submit">Create Meal</button>
        </form>
    );
};

export default CreateMeal;
