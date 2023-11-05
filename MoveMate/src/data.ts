export interface FocusHistoryItem {
  date: string;
  duration: number;
}

export interface FocusDataInterface {
  uid: string;
  startDate: string;
  endDate: string;
  focusHistory: FocusHistoryItem[];
}

export const FocusData: FocusDataInterface = {
  uid: "12345",
  startDate: "2023-10-09",
  endDate: "2023-10-15",
  focusHistory: [
      { date: "2023-10-09", duration: 10 },
      { date: "2023-10-10", duration: 20 },
      { date: "2023-10-11", duration: 30 },
      { date: "2023-10-12", duration: 40 },
      { date: "2023-10-13", duration: 50 },
      { date: "2023-10-14", duration: 60 },
      { date: "2023-10-15", duration: 70 }
    ]
};