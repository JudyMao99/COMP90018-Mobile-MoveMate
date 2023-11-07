import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { FAB, ButtonGroup, Chip, CheckBox } from '@rneui/themed';
import { Button } from 'react-native-paper';
import routes from '../../constants/routes';

const exercises = ['walking', 'pushup', 'situp', 'free'];

const WorkingFinish = () => {
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedExerciseMode, setSelectedExerciseMode] = React.useState(0);
    return (
        <View className="flex flex-1 items-center w-screen h-screen">
            <View className="bg-sky-500 h-1/4 w-full flex items-center justify-center rounded-xl">
                <Text className='text-5xl font-bold text-white'>congratuations</Text>
            </View>
            <View className='top-20'>
                <Text className='text-3xl font-bold'>It's Time To Do Some Exercise!</Text>
            </View>
            
            <View className='w-full top-40 grid grid-cols-2 grid-rows-2 bg-grey-400'>
                {/* <View>
                </View> 
                <View>
                    <Button title='PushUp' />
                </View>
                <View>
                    <Button title='SitUp' />
                </View>
                <View>
                    <Button title='Free' />
                </View> */}
                <ButtonGroup
                    buttons={['Walking','Cycling']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                        switch(value){
                          case 0:
                            navigation.navigate(ROUTES.WALKING_MODE);
                            break;
                          case 1:
                            navigation.navigate(ROUTES.MAP); 
                            break;
                        }
                        
                      }}
                    buttonStyle={{
                        borderRadius: 20,
                        backgroundColor: '#C2C2C2',
                      }}
                      containerStyle={{
                        borderWidth:0,
                        gap:5,
                        backgroundColor: 'transparent',
                      }}
                      textStyle={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                      innerBorderStyle={{
                        width: 0
                      }}
                />
                {/* <ButtonGroup
                    buttons={['SitUp', 'Free']}
                    buttonStyle={{
                        borderRadius: 20,
                        backgroundColor: '#C2C2C2',
                      }}
                      containerStyle={{
                        borderWidth:0,
                        gap:5,
                        backgroundColor: 'transparent'
                      }}
                      textStyle={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                      innerBorderStyle={{
                        width: 0
                      }}
                /> */}
            </View>
            <View className='w-full top-40 '>
                <Button 
                    onPress={() => navigation.navigate(ROUTES.HOME_MAIN)}>Back to Home</Button>
            </View>
            
        </View>
    )
}

export default WorkingFinish;