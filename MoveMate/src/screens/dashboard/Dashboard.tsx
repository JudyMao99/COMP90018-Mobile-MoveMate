import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import useAuth from '../../hook/useAuth';
import FocusChart from '../../components/FocusChart';
import WalkingChart from '../../components/WalkingChart';
import CyclingChart from '../../components/CyclingChart';
import { useSummaryData } from '../../hook/useSummaryData';
import moment from 'moment';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

type SummaryDataItem = {
  date: string;
  totalDuration?: number;
  totalDistance?: number;
  totalCount?: number;
};

const Dashboard = () => {
  const { user } = useAuth();

  const processFocusData = (
    docSnapshot: QueryDocumentSnapshot,
    dateRange: SummaryDataItem[]
  ) => {
    const data = docSnapshot.data();
    const date = moment(data.start_date.toDate()).format('MM-DD');
    const durationInMinutes = Math.floor(data.duration / 60);
    const day = dateRange.find(d => d.date === date);
    if (day) {
      day.totalDuration = (day.totalDuration || 0) + durationInMinutes;
    }
  };

  const processCyclingData = (
    docSnapshot: QueryDocumentSnapshot,
    dateRange: SummaryDataItem[]
  ) => {
    const data = docSnapshot.data();
    const date = moment(data.start_date.toDate()).format('MM-DD');
    const distance = parseFloat(data.distance.toFixed(2));
    const day = dateRange.find(d => d.date === date);
    if (day) {
      day.totalDistance = (day.totalDistance || 0) + distance;
    }
  };

  const processWalkingData = (
    docSnapshot: QueryDocumentSnapshot,
    dateRange: SummaryDataItem[]
  ) => {
    const data = docSnapshot.data();
    const date = moment(data.start_date.toDate()).format('MM-DD');
    const stepCount = data.step_count;
    const day = dateRange.find(d => d.date === date);
    if (day) {
      day.totalCount = (day.totalCount || 0) + stepCount;
    }
  };

  const focusSummaryData = useSummaryData(
    user?.uid || '',
    'focus',
    processFocusData
  );
  const cyclingSummaryData = useSummaryData(
    user?.uid || '',
    'exercise_cycling',
    processCyclingData
  );
  const walkingSummaryData = useSummaryData(
    user?.uid || '',
    'exercise_walking',
    processWalkingData
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.header}>Focus Summary (Last 7 Days)</Text>
        <FocusChart focusSummaryData={focusSummaryData} />

        <Text style={styles.header}>Walking Summary (Last 7 Days)</Text>
        <WalkingChart walkingSummaryData={walkingSummaryData} />  
        
        <Text style={styles.header}>Cycling Summary (Last 7 Days)</Text>
        <CyclingChart cyclingSummaryData={cyclingSummaryData} />
        
      </ScrollView>
    </>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
});

export default Dashboard;