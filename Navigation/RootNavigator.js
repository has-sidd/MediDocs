import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Dashboard from '../Screens/Main-Screens/Dashboard';
import Notes from '../Screens/Main-Screens/Notes';
import Prescription from '../Screens/Main-Screens/Prescription';
import Readings from '../Screens/Main-Screens/Readings';
import Reports from '../Screens/Main-Screens/Reports';
import Initial from '../Screens/Pre-Screens/Initial';
import Login from '../Screens/Pre-Screens/Login';
import Signup from '../Screens/Pre-Screens/Signup';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitleStyle: styles.headerTitle,
        }}>
        <Stack.Screen
          name="Initial"
          component={Initial}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Prescription"
          component={Prescription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Readings"
          component={Readings}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#BC43C6DB',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#dfdf',
  },
});

export default RootNavigator;
