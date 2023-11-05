export const formatDate = (input: string): string => {
  const [month, day] = input.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}`;
};