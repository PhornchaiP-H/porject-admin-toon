import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';

import './CSS/favorite.css'

function Favorite() {

    const [valuesWithCounts, setValuesWithCounts] = useState([]);

    useEffect(() => {
        const fetchArrayValues = async () => {
            const collectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(collectionRef);

            const countByValue = {};
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const valuesArray = data['favorite']; // Replace 'your_array_field' with your actual array field name

                // Count occurrences of each value in the array
                valuesArray.forEach(value => {
                    countByValue[value] = (countByValue[value] || 0) + 1;
                });
            });

            // Convert countByValue object to an array of objects with value and count properties
            const valuesWithCountsArray = Object.keys(countByValue).map(value => ({
                value,
                count: countByValue[value],
            }));

            setValuesWithCounts(valuesWithCountsArray);
        };

        fetchArrayValues();
    }, []);

    return (

        <div className="main-container">
            <ul className='color-card-favorite'>
                <ul className='head-favorite'>
                    <h1>Favorite</h1>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>Story ID</th>
                            <th>Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valuesWithCounts.map(item => (
                            <tr key={item.value}>
                                <td>{item.value}</td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>

    );

}

export default Favorite;



