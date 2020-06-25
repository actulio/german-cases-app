import 'react-native-gesture-handler';
import {Image, View} from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Table from './pages/Table';
import HeaderButton from './components/HeaderButton';
import Header from './components/HeaderProgress';
import {ThemeContext} from './themes/theme-context';

const AppStack = createStackNavigator();

const Routes = () => {

	const {theme} = React.useContext(ThemeContext);

	const GermanFlag = () => {
		return (
			<View style={{paddingHorizontal: 10}}>
				<Image
					style={{ 
						width: 25,
						height: 25,
						borderRadius: 14,
						borderWidth: 1,
						borderColor: 'white',
						overflow: 'hidden'}}
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
				},
				headerStyle: {
					backgroundColor: theme.headerBg,
				},
				headerTintColor: theme.opTxt
			}}>
				<AppStack.Screen
					name="Home"
					component={Home}
					options={{
						headerStyle: {
							elevation: 0,
							shadowColor: 'transparent',
							backgroundColor: theme.headerBg,
						},
						headerLeft: () => <GermanFlag/>,
						headerTitle: () => <Header/>,
						headerTitleAlign: 'center',
						headerRight: () => <HeaderButton/>
					}}
				/>
				<AppStack.Screen options={{title: 'Articles Table'}} name="Table" component={Table} />
			</AppStack.Navigator>
		</NavigationContainer>
	)
}

export default Routes;