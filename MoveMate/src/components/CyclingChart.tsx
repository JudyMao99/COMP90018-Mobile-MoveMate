import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { formatDate } from '../utils';

type CyclingChartProps = {
  cyclingSummaryData: {
    date: string;
    totalDistance: number;
  }[];
};

const CyclingChart: React.FC<CyclingChartProps> = ({ cyclingSummaryData }) => {
  const chartData = {
    labels: cyclingSummaryData.map(item => formatDate(item.date)),
    datasets: [
      {
        data: cyclingSummaryData.map(item => item.totalDistance || 0),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    decimalPlaces: 2,
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
    <BarChart
      data={chartData}
      width={screenWidth}
      height={256}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      fromZero={true}
      showBarTops={true}
      showValuesOnTopOfBars={true}
    />
  );
};

export default CyclingChart;