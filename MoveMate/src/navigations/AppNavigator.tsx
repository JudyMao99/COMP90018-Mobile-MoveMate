import BottomTabNavigator from './BottomTabNavigator';
import useAuth from '../hook/useAuth';
import AuthNavigator from './AuthNavigator';

function AppNavigator() {
  const { user } = useAuth();

  if (user) {
    return (
      <BottomTabNavigator />
    )
  } else {
    return (
      <AuthNavigator />
    );
  }

}

export default AppNavigator;