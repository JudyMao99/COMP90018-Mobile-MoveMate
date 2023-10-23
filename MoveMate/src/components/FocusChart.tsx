import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FocusData, FocusHistoryItem } from '../data';

function formatDate(input: string): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const date = new Date(input);
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
}

const FocusChart = () => {
  return (
    <LineChart
      data={{
        labels: FocusData.focusHistory.map(item => formatDate(item.date)),
        datasets: [{
          data: FocusData.focusHistory.map(item => item.duration)
        }]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel=""
      yAxisSuffix=" min"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, 
        color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 10,
        borderRadius: 16
      }}
    />
  );
};

export default FocusChart;