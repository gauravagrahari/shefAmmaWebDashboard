import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MealDetail from '../adminSubComponents/MealDetail';
import MealHeader from '../adminSubComponents/MealHeader';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';
import CreateMeal from '../adminSubComponents/CreateMeal';

const apiUrl = config.URL;

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const location = useLocation();
    const { hostId } = location.state;
    const token = useAuthToken(); 
    const [showCreateMeal, setShowCreateMeal] = useState(false);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/host/mealItems`, {
          headers: { ...headers, id: hostId }
        });
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    useEffect(() => { 
  
        fetchMeals();
      }, [hostId]);   

 const handleCreateMealClick = () => {
        setShowCreateMeal(true);
    };
    const handleMealCreated = () => {
      setShowCreateMeal(false);
      // Refresh the meal list. You might need to call the API again or use another method to update the list.
      fetchMeals();
    };
   return (
        <div>
            <MealHeader />
            <button onClick={handleCreateMealClick}>Create Meal</button>
            {showCreateMeal && (
                <CreateMeal hostId={hostId} onMealCreated={handleMealCreated} />
            )}
            {meals.map(meal => <MealDetail key={meal.uuidMeal} meal={meal} />)}
        </div>
    );
};
export default MealsList;
