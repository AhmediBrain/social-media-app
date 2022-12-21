import * as React from 'react'
import { ScrollView, Text, Button } from 'react-native'
import axios from 'axios'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Post from './Post';
import Account from './Account';
import { StyleSheet } from 'react-native';


interface IFeedProps {
  navigate?: any,
  route?: any
}

const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()


const Feed:React.FunctionComponent<IFeedProps> = ({navigate}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Main'}>
        {() => 
        <Tab.Navigator>
          <Tab.Screen name={'Home'} component={} />
          <Tab.Screen name={'Popular'} />
        </Tab.Navigator>}
      </Stack.Screen>
      <Stack.Screen name={'Post Info'} component={Post} />
      <Stack.Screen name={'Account'} component={Account} />
    </Stack.Navigator>
      
  )
}

const styles = StyleSheet.create({})
