import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

type DateRangeItem = {
  date: string;
  totalCount: number;
  totalDuration: number;
  totalDistance: number;
};

export const useSummaryData = (
  uid: string,
  collectionPath: string,
  processDataCallback: (
    doc: QueryDocumentSnapshot,
    dateRange: DateRangeItem[]
  ) => void
) => {
  const [data, setData] = useState<DateRangeItem[]>([]);

  const processData = useCallback(processDataCallback, []);

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      const startDate = moment().subtract(6, 'days').startOf('day');
      const endDate = moment().endOf('day');

      const dateRange: DateRangeItem[] = [];
      for (
        let m = moment(startDate);
        m.diff(endDate, 'days') <= 0;
        m.add(1, 'day')
      ) {
        dateRange.push({
          date: m.format('MM-DD'),
          totalCount: 0,
          totalDuration: 0,
          totalDistance: 0,
        });
      }

      const q = query(
        collection(db, collectionPath),
        where('uid', '==', uid),
        where('start_date', '>=', startDate.toDate()),
        where('start_date', '<=', endDate.toDate()),
        orderBy('start_date')
      );

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(docSnapshot => {
          processData(docSnapshot, dateRange);
        });
        setData(prevData => {
          return JSON.stringify(prevData) === JSON.stringify(dateRange)
            ? prevData
            : dateRange;
        });
      } catch (error) {
        console.error(`Error fetching data from ${collectionPath}: `, error);
      }
    };

    fetchData();
  }, [uid, collectionPath, processData]);

  return data;
};
