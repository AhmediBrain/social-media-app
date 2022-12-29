import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed'
//import Login from './screens/Login.tsx'
import * as React from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import { bindActionsCreators } from 'redux'
import { verifyUser } from './redux/actions/userActions';
import { RootState } from './redux/store';
import Feed from './screens/Feed';
import Account from './screens/Account';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
export default function App() {
  const user = useSelector((state: RootState) => state.user)

  React.useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name={'Login'} component={Login} /> */}
            <Stack.Screen name={'Homepage'} >
              {
                ({navigation}) =>
                <Tab.Navigator
                screenOptions = {{headerTitle:'Home', headerShown: false}}
                >
                  <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={() => ({
                      tabBarIcon: () => <Icon name='home' type='material-icons' />
                    })}
                  />
                  <Tab.Screen
                    name="Account"
                    component={Account}
                  />
                </Tab.Navigator>
              }
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Text>My Apppppppp</Text>
        <StatusBar style="auto" /> */}
      </SafeAreaProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});