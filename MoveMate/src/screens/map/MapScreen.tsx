import React,{ useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, Circle, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';




const MapScreen = () => {
  const [pin, setPin] = React.useState({
    latitude: -37.7993,
    longitude: 144.9629,
  });

  const [path, setPath] = React.useState<{ latitude: number; longitude: number; }[]>([]);

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);



  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ distanceInterval: 2 });
      console.log(location);

      const initialCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPin(initialCoordinate);
      setPath([initialCoordinate]);

    })();
  }, []);


  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.7993,
          longitude: 144.9629,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          if (e.nativeEvent.coordinate) {
              const newCoordinate = {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
              };
              
              setPath((prevPath) => [...prevPath, newCoordinate]);
              setPin(newCoordinate);
          }
        }}
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
});

export default MapScreen;

function setErrorMsg(arg0: string) {
  throw new Error('Function not implemented.');
}
