import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import "../Dashboard/CSS/Incomecard.css";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const incomeCollectionRef = collection(db, 'Income');
                const snapshot = await getDocs(incomeCollectionRef);

                const dataArr = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    dataArr.push(data);
                });
                setIncomeData(dataArr);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        fetchIncomeData();

    }, []);

    // Calculate income totals for each storyId
    const incomeTotals = incomeData.reduce((acc, curr) => {
        if (acc[curr.storyId]) {
            acc[curr.storyId].totalIncome += curr.amount;
            acc[curr.storyId].coin = curr.coin;
            acc[curr.storyId].title = curr.title;
        } else {
            acc[curr.storyId] = {
                totalIncome: curr.amount,
                coin: curr.coin,
                title: curr.title
            };
        }
        return acc;
    }, {});
    console.log('income', incomeTotals);

    // หาเรื่องที่มี coin มากที่สุด
    let maxCoinStory = null;
    let maxCoin = -Infinity;


    for (const storyId in incomeTotals) {
        if (incomeTotals[storyId].coin > maxCoin) {
            maxCoin = incomeTotals[storyId].coin;
            // maxCoinStory = incomeTotals[storyId];
            maxCoinStory = { ...incomeTotals[storyId], storyId: storyId };
        }
    }

    console.log("Story with the highest coin:", maxCoinStory);

    // หาเรื่องที่มี coin น้อยที่สุด
    let minCoinStory = null;
    let minCoin = Infinity;

    for (const storyId in incomeTotals) {
        if (incomeTotals[storyId].coin < minCoin) {
            minCoin = incomeTotals[storyId].coin;
            // minCoinStory = incomeTotals[storyId];
            minCoinStory = { ...incomeTotals[storyId], storyId: storyId };
        }
    }

    console.log("minCoinStory :", minCoinStory);
    console.log("maxCoinStory :", maxCoinStory);



    // Convert incomeTotals to an array
    const sortedIncome = Object.entries(incomeTotals).sort((a, b) => b[1].totalIncome - a[1].totalIncome);

    return (
        <div className="income-container">

            <div className="row">
                <table className="main-container-incomecard">
                    <div className="row">
                        <div className="color-card-incomecard">
                            <ul className="head-incomecard">
                                <h1>Income Data</h1>
                            </ul>
                            <table className="table-incomecard">

                                <thead>
                                    <tr>
                                        <th>Story ID</th>
                                        <th>Title</th>
                                        <th>Coin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {sortedIncome.map(([storyId, { coin, title }], index) => (
                                        <tr key={index}>
                                            <td>{storyId}</td>
                                            <td>{title}</td>
                                            <td>{coin}</td>
                                        </tr>
                                    ))} */}
                                    {sortedIncome
                                        .sort(([, { coin: coinA }], [, { coin: coinB }]) => coinB - coinA)
                                        .map(([storyId, { coin, title }], index) => (
                                            <tr key={index}>
                                                <td>{storyId}</td>
                                                <td>{title}</td>
                                                <td>{coin}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Card for maximum coin story */}
                        <div className="color-card-max">
                            <ul className="head">
                                <h1> Max Coin </h1>
                            </ul>
                            <table className='maxtable'>
                                {maxCoinStory && (
                                    <div>
                                        <p>Story ID: {maxCoinStory.storyId}</p>
                                        <p>Title: {maxCoinStory.title}</p>
                                        <p>Coin: {maxCoinStory.coin}</p>
                                    </div>
                                )}
                            </table>

                        </div>
                        {/* Card for minimum coin story */}
                        <div className="color-card-Min">
                            <ul className="head">
                                <h1> Min Coin</h1>
                            </ul>
                            <table className='Mintable'>
                                {minCoinStory && (
                                    <div>
                                        <p>Story ID: {minCoinStory.storyId}</p>
                                        <p>Title: {minCoinStory.title}</p>
                                        <p>Coin: {minCoinStory.coin}</p>
                                    </div>
                                )}
                            </table>
                        </div>
                    </div>
                </table>
            </div>
        </div>

    );
};

export default Income;
