import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatDate } from '../utils';

type WalkingChartProps = {
  walkingSummaryData: {
    date: string;
    totalCount: number;
  }[];
};

const WalkingChart: React.FC<WalkingChartProps> = ({ walkingSummaryData }) => {
  const chartData = {
    labels: walkingSummaryData.map(item => formatDate(item.date)),
    datasets: [
      {
        data: walkingSummaryData.map(item => item.totalCount || 0)
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    decimalPlaces: 0,
    color: (opacity = 0.7) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={chartConfig}
      bezier
    />
  );
};

export default WalkingChart;
