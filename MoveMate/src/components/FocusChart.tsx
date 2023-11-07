import React from 'react';
import { Dimensions, View, StyleSheet,Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatDate } from '../utils';

type FocusChartProps = {
  focusSummaryData: {
    date: string;
    totalDuration: number;
  }[];
};

const FocusChart: React.FC<FocusChartProps> = ({ focusSummaryData }) => {
  if (focusSummaryData?.length === 0) {
    return (
      <View className="flex-1 flex-col items-center">
        <Text>No chart data to display!</Text>
      </View>
    );
  }
  const chartData = {
    labels: focusSummaryData.map(item => formatDate(item.date)),
    datasets: [
      {
        data: focusSummaryData.map(item => item.totalDuration || 0),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      yAxisLabel=""
      yAxisSuffix=" mins"
      yAxisInterval={1}
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default FocusChart;
