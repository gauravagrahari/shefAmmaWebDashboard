import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MealDetail from '../adminSubComponents/MealDetail';
import MealHeader from '../adminSubComponents/MealHeader';
import config from '../context/constants';

const apiUrl = config.URL;

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const location = useLocation();
    const { hostId } = location.state;

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/host/mealItems`, {
                    headers: { id: hostId }
                });
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, [hostId]);

    return (
        <div>
            <MealHeader />
            {meals.map(meal => <MealDetail key={meal.uuidMeal} meal={meal} />)}
        </div>
    );
};

export default MealsList;
