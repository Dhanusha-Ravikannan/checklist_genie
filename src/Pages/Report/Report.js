
import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { PieChart } from '@mui/x-charts/PieChart';
import '../Report/Report.css';

export const desktopOS = [
  { label: 'Daily ClockIn', value: 50, date: '2024-01-01' },
  { label: 'Monday Meeting', value: 20, date: '2024-01-01' },
  { label: 'Workdone email', value: 5, date: '2024-01-01' },
  { label: 'Daily ClockOut', value: 25, date: '2024-01-01' },

];

export const valueFormatter = (item) => `${item.value}%`;

const getWeekNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
};

const filterByMonth = (data, month, year) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === month && itemDate.getFullYear() === year;
  });
};

const filterByDay = (data, day, month, year) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getDate() === day && itemDate.getMonth() === month && itemDate.getFullYear() === year;
  });
};

const filterByWeek = (data, week, year) => {
  const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7);
  const endOfWeek = new Date(year, 0, startOfWeek.getDate() + 6);
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startOfWeek && itemDate <= endOfWeek;
  });
};

export default function Report() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(0); // January
  const [selectedDay, setSelectedDay] = useState(1); // Day 1
  const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date(selectedYear, selectedMonth, selectedDay))); // Week number based on Jan 1

  const monthlyData = filterByMonth(desktopOS, selectedMonth, selectedYear);
  const dailyData = filterByDay(desktopOS, selectedDay, selectedMonth, selectedYear);
  const weeklyData = filterByWeek(desktopOS, selectedWeek, selectedYear);

  return (
    <div className='dashboard-container'>
      <Navbar />
      <div className='progress-container'>
        <div className='row'>
          <div className='cut'>
            <div style={{ textAlign: 'center' }}>Daily Progress</div>
            <select onChange={e => setSelectedDay(Number(e.target.value))}>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>Day {i + 1}</option>
              ))}
            </select>
            <select onChange={e => setSelectedMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select onChange={e => setSelectedYear(Number(e.target.value))}>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <PieChart
                series={[{
                  data: dailyData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter,
                }]}
                height={200}
              />
            </div>
          </div>

          <div className='cutth'>
            <div style={{ textAlign: 'center' }}>Weekly Progress</div>
            <select onChange={e => setSelectedWeek(Number(e.target.value))}>
              {Array.from({ length: 52 }, (_, i) => (
                <option key={i} value={i + 1}>Week {i + 1}</option>
              ))}
            </select>
            <select onChange={e => setSelectedYear(Number(e.target.value))}>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <PieChart
                series={[{
                  data: weeklyData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter,
                }]}
                height={200}
              />
            </div>
          </div>
        </div>

        <div className='cuth'>
          <div style={{ textAlign: 'center' }}>Monthly Progress</div>
          <select onChange={e => setSelectedMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select onChange={e => setSelectedYear(Number(e.target.value))}>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={2024 - i}>{2024 - i}</option>
            ))}
          </select>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <PieChart
              series={[{
                data: monthlyData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                valueFormatter,
              }]}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
