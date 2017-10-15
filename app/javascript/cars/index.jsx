import React from 'react';
import ReactDOM from 'react-dom';
import CarList from './components/CarList';

const cars = document.querySelector('#cars')

ReactDOM.render(<CarList />, cars)
