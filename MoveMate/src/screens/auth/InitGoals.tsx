import React from 'react'
import MyGoals from '../profile/MyGoals'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const InitGoals = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyGoals nextStep={() => navigation.navigate(ROUTES.APP)}/>
    </>
  )
}

export default InitGoals