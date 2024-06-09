import { FaHome, FaDumbbell, FaAppleAlt, FaUser,FaShoppingCart } from 'react-icons/fa';
import StrengthTraining from '../assets/images/Strength Training.jpg';
import Yoga from '../assets/images/Yoga and mediation.jpg';
import Cardio from '../assets/images/Cardiovascular.jpg';
import Functional from '../assets/images/Functional training.jpg';
import Intensity from '../assets/images/High Intensity Training.jpg';
import Breakfast from '../assets/images/Breakfast.jpg';
import Lunch from '../assets/images/Lunch.jpg';
import Snacks from '../assets/images/Snacks.jpg';
import Dinner from '../assets/images/Dinner.jpg'

export const SidebarData = [
  {
    icon: FaHome,
    heading: "Home",
    path: ""
  },
  {
    icon: FaDumbbell,
    heading: "Workouts",
    path: "/workouts"
  },
  {
    icon: FaShoppingCart,
    heading: "Commerce",
    path: "/commerce"
  },
  {
    icon: FaAppleAlt,
    heading: "Foods",
    path: "/foods"
  },
  {
    icon: FaUser,
    heading: "Profile",
    path: "/profile"
  }
];

export const WorkoutCategories = [
  {
    image: StrengthTraining,
    title: 'Strength Training',
    borderColor: 'red'
  },
  {
    image: Yoga,
    title: 'Yoga and Meditation',
    borderColor: 'red'
  },
  {
    image: Cardio,
    title: 'Cardiovascular',
    borderColor: 'red'
  },
  {
    image: Functional,
    title: 'Functional Training',
    borderColor: 'red'
  },
  {
    image: Intensity,
    title: 'High Intensity Training',
    borderColor: 'red'
  }
];

export const FoodCategories = [
  {
    image: Breakfast,
    title: 'Breakfast',
    borderColor: 'red'
  },
  {
    image: Lunch,
    title: 'Lunch',
    borderColor: 'red'
  },
  {
    image: Snacks,
    title: 'Snacks',
    borderColor: 'red'
  },
  {
    image: Dinner,
    title: 'Dinner',
    borderColor: 'red'
  }
]
