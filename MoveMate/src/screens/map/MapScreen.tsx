import React,{ useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image,TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout, Circle, Polyline, UserLocationChangeEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Magnetometer } from 'expo-sensors';
import { db } from '../../config/firebase';
import useAuth from '../../hook/useAuth';
import { collection, addDoc,Timestamp} from "firebase/firestore";
import { ROUTES } from '../../constants';
import { Button } from '@rneui/themed';

const compassNeedle = require('../../assets/needle.png');

const MapScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState<{ latitude: number; longitude: number; } | null>(null);

  const [heading, setHeading] = useState(null);
  const { user } = useAuth();
  

  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [directionAngle, setDirectionAngle] = useState(0); // angle in direction

  const [path, setPath] = React.useState<{ latitude: number; longitude: number; }[]>([]);

  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    Magnetometer.setUpdateInterval(300); // in milliseconds update interval
    const subscription = Magnetometer.addListener(data => {
      setMagnetometerData(data);
    });

    return () => subscription.remove();
  }, []);

    // Function to calculate distance between two coordinates
    const cosineDistanceBetweenPoints = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3; // metres
      const p1 = lat1 * Math.PI / 180;
      const p2 = lat2 * Math.PI / 180;
      const deltaP = p2 - p1;
      const deltaLon = lon2 - lon1;
      const deltaLambda = (deltaLon * Math.PI) / 180;
      const a = Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
                Math.cos(p1) * Math.cos(p2) *
                Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
      const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
      return d;
    };

      // Function to format duration
    const formatDuration = (duration: number) => {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes} min ${seconds} sec`;
    };


    React.useEffect(() => {
      // Set an interval to update the duration every second
      const interval = setInterval(() => {
        const now = new Date();
        const newDuration = (now.getTime() - startTime.getTime()) / 1000;
        setDuration(Math.floor(newDuration)); // Keep updating the total duration in seconds
      }, 1000);
    
      // Clean up the interval
      return () => clearInterval(interval);
    }, [startTime]);

    const [initialRegion, setInitialRegion] = useState({
      latitude: -37.7993,
      longitude: 144.9629,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });




  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ distanceInterval: 10 });

      const newCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPin(newCoordinate);
      setPath([newCoordinate]);
      const { latitude, longitude } = newCoordinate;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    })();
  }, []);

  const onUserLocationChange = (e: UserLocationChangeEvent) => {
    const { latitude, longitude, accuracy } = e.nativeEvent.coordinate as { latitude: number; longitude: number; accuracy: number };
    const newCoordinate = { latitude, longitude };

    const angle = calculateAngle(magnetometerData);
    setDirectionAngle(angle);
  
    if (accuracy < 10) {
      setPath((prevPath) => {
        let newDistance = 0;
        if (prevPath.length > 0) {
          const lastCoordinate = prevPath[prevPath.length - 1];
          newDistance = cosineDistanceBetweenPoints(
            lastCoordinate.latitude,
            lastCoordinate.longitude,
            newCoordinate.latitude,
            newCoordinate.longitude
          );
          
          if (newDistance < 10) {
            return prevPath; 
          }
          
          // Update the total distance
          setDistance((currentDistance) => currentDistance + (newDistance / 1000));
        }
        
        return [...prevPath, newCoordinate];
      });
  
      setPin(newCoordinate);
    }
  };

    // Function to calculate the angle of the compass
    const calculateAngle = (magnetometer: { x: any; y: any; z?: number; }) => {
      let angle = Math.atan2(magnetometer.y, magnetometer.x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360;
      }
      return Math.round(angle);
    };

    // Update the map data to the firebase
    async function writeCyclingRecord() {
      if (user && user.uid){
        const cyclingData = {
          distance: distance, // Use the actual distance calculated
          duration: duration, // Use the actual duration calculated
          start_date: Timestamp.fromDate(new Date()),
          uid: user.uid,  
        };
        const newDoc = await addDoc(collection(db, "exercise_cycling"), cyclingData);
      }
    };

    const handleEndCycling = async () => {
      await writeCyclingRecord();
  
      // return to home page
      navigation.navigate(ROUTES.HOME_MAIN);
    };


  

  


  

  return (
    
    <View style={styles.container}>

      <TouchableOpacity className = "absolute bottom-32 p-2.5 justify-center items-center bg-emerald-300 w-28 rounded z-50 text-center " onPress={handleEndCycling}>
        <Text>End</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsCompass={false} 
        showsScale = {true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        compassOffset={{ x: -10, y: 10 }}
        onUserLocationChange={onUserLocationChange}
        
      >
        
        <Marker
          coordinate={pin ? pin : { latitude: 0, longitude: 0 }}
          image={{
            uri: "", // URL of the image
            height: 3,
          }}

          pinColor='blue'
          draggable={true}
          onDragStart={(e)=> {
          }}
          onDragEnd={(e)=> {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
        >
        <Callout>
          <View>
            <Text className='w-18 text-l text-center font-semibold'>{user?.displayName ?? "Unknown User"}</Text>
          </View>
        </Callout>
        </Marker>
        <Polyline
            coordinates={path}
            strokeWidth={5}
            strokeColor="black"
        />
        <Circle 
          center={pin!}
          radius={100}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(170,170,255,0.3)"} 
        />
      </MapView>
      {/* Compass Needle Image */}
      <View style={styles.compassContainer}>
        <Image
          source={compassNeedle}
          style={{
            ...styles.compassNeedle,
            transform: [{ rotate: `${directionAngle}deg` }],
            borderRadius: 50, // Add this line
            opacity: 0.85,
          }}
        />
      </View>

      
      
      <View style={styles.bottomPanel}>
        <Text className="font-bold " style={styles.bottomText}>Distance: {distance.toFixed(2)} Km</Text>
        <Text className="font-bold " style={styles.bottomText}>Duration: {formatDuration(duration)}</Text>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    
    // backgroundColor: 'transparent', // transparent background
  },
  bottomText: {
    fontSize: 16
  },
  compassContainer: {
    position: 'absolute',
    top: 56,
    right: 32,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassNeedle: {
    width: 40,
    height: 40,
  },
});


export default MapScreen;

function setErrorMsg(arg0: string) {
  throw new Error('Function not implemented.');
}
