import {useEffect, useState } from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import { Permission } from 'react-native-health-connect/lib/typescript/types';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';



// const useHealthData = () => {
//     const [androidPermissions, setAndroidPermissions] = useState<Permission[]>([]);
//     const [steps, setSteps] = useState(0);
//     const [flights, setFlights] = useState(0);
//     const [distance, setDistance] = useState(0);

//     useEffect(() => {
//       const init = async () => {
//       // initialize the client
//       console.log("Check before init")
//       const isInitialized = await initialize();
//       if (!isInitialized) {
//         console.log('Failed to initialize Health Connect');
//         return;
//       }
//       console.log("Success!");
//       // request permissions
//       const grantedPermissions = await requestPermission([
//         { accessType: 'read', recordType: 'Steps' },
//         { accessType: 'read', recordType: 'Distance' },
//         { accessType: 'read', recordType: 'FloorsClimbed' },
//       ]);

//       setAndroidPermissions(grantedPermissions);
//     };
//     init();
//     }, [])

//     return {steps, flights, distance}
// }

//export default useHealthData;

