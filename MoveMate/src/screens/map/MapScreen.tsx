import React,{ useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, Circle, Polyline, UserLocationChangeEvent } from 'react-native-maps';
import * as Location from 'expo-location';




const MapScreen = () => {
  const [pin, setPin] = React.useState({
    latitude: -37.7993,
    longitude: 144.9629,
  });

  const [path, setPath] = React.useState<{ latitude: number; longitude: number; }[]>([]);

  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(0);

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
      console.log(location);

      const initialCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPin(initialCoordinate);
      setPath([initialCoordinate]);
      setInitialRegion({
        ...initialRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

    })();
  }, []);

  const onUserLocationChange = (e: UserLocationChangeEvent) => {
    const { latitude, longitude, accuracy } = e.nativeEvent.coordinate as { latitude: number; longitude: number; accuracy: number };
    const newCoordinate = { latitude, longitude };
  
    if (accuracy < 20) {
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
  


  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // initialRegion={{
        //   latitude: -37.7993,
        //   longitude: 144.9629,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        showsUserLocation={true}
        
        onUserLocationChange={onUserLocationChange}
      >
        <Marker
          coordinate={pin}
          image={{
            uri: "",
            width: 3,
            height: 3,
          }}

          pinColor='blue'
          draggable={true}
          onDragStart={(e)=> {
            console.log('Drag start',e.nativeEvent.coordinate);
          }}
          onDragEnd={(e)=> {
            console.log('Drag end',e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
        >
          <Callout>
            <Text>My Current Place</Text>
          </Callout>
        </Marker>
        <Polyline
            coordinates={path}
            strokeWidth={5}
            strokeColor="black"
        />
        <Circle 
          center={pin}
          radius={100}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(170,170,255,0.3)"} 
        />
      </MapView>
      
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
    bottom: 10,
    left: 0,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent', // 背景颜色透明
  },
  bottomText: {
    fontSize: 16,
  },
});


export default MapScreen;

function setErrorMsg(arg0: string) {
  throw new Error('Function not implemented.');
}
