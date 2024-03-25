import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Favorite from '../Dashboard/Favorite';
import LiChart from '../Dashboard/LiChart';
import IncomeChart from '../Dashboard/IncomeChart'
import Incomecard from '../Dashboard/Incomecard';

import './css/Home.css';

function Home() {

  const isLoggedIn = localStorage.getItem('loggedInUsername');

  return (
    <div className="home-container justify-content-between">
      {isLoggedIn ? (
        <>

          <div className="column">
            <h1>DashBoard</h1>
            <div className="dash">
              <div className="row">
                
                  <Favorite />
                
                <div className="income-card">
                  <Incomecard />
                </div>
              </div>
            </div>

            <div className="lower">
              <div className="row">
                <div className="LiChart">
                  <LiChart />
                </div>
                <div className="IncomeChart ">
                  <IncomeChart />
                </div>
              </div>
            </div>
          </div>



        </>
      ) : (
        <>
          <h2>รายละเอียด</h2>
          <p>นี่เป็น project เกี่ยวกับการจัดการการ์ตูนบนเว็บไชต์</p>
          <p>เชื่อมต่อกับ Firebase เพื่อเก็บข้อมูลโดยใช้ React ในการเขียน</p>
          <p>โดยสามารถดูรายละเอียด เพิ่ม ลบ แก้ไข ข้อมูลต่างๆ ของการ์ตูนได้</p>
        </>
      )}
    </div>
  );
}

export default Home;
