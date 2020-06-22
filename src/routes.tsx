import 'react-native-gesture-handler';
import {Image, Button, Text, View} from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Table from './pages/Table';
import HeaderButton from './components/HeaderButton';
import Header from './components/Header';

const AppStack = createStackNavigator();

const Routes = () => {

	const GermanFlag = () => {
		return (
			<View style={{paddingHorizontal: 10}}>
				<Image
					style={{ width: 25, height: 25}}
					source={require('./assets/german_flag.png')}
				/>
			</View>
		);
	}

	return (
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{
        headerTitleStyle: {
					fontFamily: 'Roboto_400Regular',
        }
			}}>
				<AppStack.Screen
					name="Home"
					component={Home}
					options={{
						headerLeft: () => <GermanFlag/>,
						headerTitle: () => <Header/>,
						headerTitleAlign: 'center',
						headerRight: () => <HeaderButton/>
					}}
				/>
				<AppStack.Screen name="Table" component={Table} />
			</AppStack.Navigator>
		</NavigationContainer>
	)
}

export default Routes;