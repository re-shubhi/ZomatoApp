import DeliveryScreen from '@features/delivery/DeliveryScreen';
import DiningScreen from '@features/delivery/DeliveryScreen';
import LiveScreen from '@features/live/LiveScreen';
import ReorderScreen from '@features/reorder/ReorderScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const UserBottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="DeliveryScreen">
      <Tab.Screen name="DiningScreen" component={DiningScreen} />
      <Tab.Screen name="LiveScreen" component={LiveScreen} />
      <Tab.Screen name="ReorderScreen" component={ReorderScreen} />
      <Tab.Screen name="DeliveryScreen" component={DeliveryScreen} />
    </Tab.Navigator>
  );
};

export default UserBottomTab;
