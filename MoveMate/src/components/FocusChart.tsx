// import React from 'react';
// import { Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { FocusData, FocusHistoryItem } from '../data';

// function formatDate(input: string): string {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

//   const date = new Date(input);
//   const month = months[date.getMonth()];
//   const day = date.getDate();

//   return `${month} ${day}`;
// }

// const FocusChart = () => {
//   return (
//     <LineChart
//       data={{
//         labels: FocusData.focusHistory.map(item => formatDate(item.date)),
//         datasets: [{
//           data: FocusData.focusHistory.map(item => item.duration)
//         }]
//       }}
//       width={Dimensions.get("window").width} 
//       height={220}
//       yAxisLabel=""
//       yAxisSuffix=" min"
//       yAxisInterval={1}
//       chartConfig={{
//         backgroundColor: "#e26a00",
//         backgroundGradientFrom: "#fb8c00",
//         backgroundGradientTo: "#ffa726",
//         decimalPlaces: 0, 
//         color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
//         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         style: {
//           borderRadius: 16
//         },
//         propsForDots: {
//           r: "6",
//           strokeWidth: "2",
//           stroke: "#ffa726"
//         }
//       }}
//       bezier
//       style={{
//         marginVertical: 10,
//         borderRadius: 16
//       }}
//     />
//   );
// };

// export default FocusChart;

import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Define the props type to include the focus summary data
type FocusChartProps = {
  focusSummaryData: {
    date: string;
    totalDuration: number;
  }[];
};

// Update the formatDate function to handle the MM-DD format
function formatDate(input: string): string {
  const [month, day] = input.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Convert month from MM format to month name
  const monthName = months[parseInt(month, 10) - 1];

  return `${monthName} ${parseInt(day, 10)}`;
}

const FocusChart: React.FC<FocusChartProps> = ({ focusSummaryData }) => {
  return (
    <LineChart
      data={{
        labels: focusSummaryData.map(item => formatDate(item.date)),
        datasets: [{
          data: focusSummaryData.map(item => item.totalDuration)
        }]
      }}
      width={Dimensions.get("window").width} 
      height={220}
      yAxisLabel=""
      yAxisSuffix=" min"
      yAxisInterval={1}
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
