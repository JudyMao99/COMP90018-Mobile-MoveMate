import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useAuth from '../../hook/useAuth';
import { db } from '../../config/firebase';
import FocusChart from '../../components/FocusChart';

type FocusSummaryData = {
  date: string;
  totalDuration: number;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [focusSummaryData, setFocusSummaryData] = useState<FocusSummaryData[]>([]);

  useEffect(() => {
    const fetchFocusSummary = async (uid: string): Promise<FocusSummaryData[]> => {
      // Set the start date to 6 days before today
      const start_date = moment().subtract(6, 'days').startOf('day');
      // Set the end date to the end of today
      const end_date = moment().endOf('day');

      // Initialise the date range array
      const dateRange: FocusSummaryData[] = [];
      for (let m = moment(start_date); m.isSameOrBefore(end_date, 'day'); m.add(1, 'days')) {
        dateRange.push({
          date: m.format('MM-DD'),
          totalDuration: 0,
        });
      }

      console.log(`Date range for summary: ${dateRange.map(d => d.date).join(', ')}`);

      const q = query(
        collection(db, 'focus'),
        where('uid', '==', uid),
        where('start_date', '>=', start_date.toDate()),
        where('start_date', '<=', end_date.toDate()),
        orderBy('start_date')
      );

      try {
        const querySnapshot = await getDocs(q);
        console.log(`Documents found: ${querySnapshot.size}`);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date: Date = data.start_date.toDate();
          const duration: number = data.duration;
          // Convert duration from seconds to minutes
          const durationInMinutes: number = data.duration / 60; 
          const dateKey = moment(date).format('MM-DD');

          console.log(`Processing document for date: ${dateKey}, duration: ${duration}`);

          // Find the corresponding date and accumulate the duration
          const day = dateRange.find(d => d.date === dateKey);
          if (day) {
            day.totalDuration += durationInMinutes;
          }
        });

        return dateRange;
      } catch (error) {
        console.error("Error fetching focus summary: ", error);
        return [];
      }
    };

    if (user?.uid) {
      (async () => {
        const summaries = await fetchFocusSummary(user.uid);
        console.log('Summaries received:', summaries);
        setFocusSummaryData(summaries);
      })();
    }
  }, [user?.uid]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Focus Summary (Last 7 Days)</Text>
      {focusSummaryData.length > 0 ? (
        focusSummaryData.map((data) => (
          <Text key={data.date}>
            {data.date}: {data.totalDuration} mins
          </Text>
        ))
      ) : (
        <Text>No focus data available for the last 7 days.</Text>
      )}
      <FocusChart focusSummaryData={focusSummaryData} />
    </View>
  );
};

export default Dashboard;
