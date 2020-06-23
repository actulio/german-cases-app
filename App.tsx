import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto';
import { Provider as PaperProvider } from 'react-native-paper';

import {ThemeContext, themes } from './src/themes/theme-context'

import Routes from './src/routes';

export default function App() {

	const [theme, setTheme] = React.useState(themes.light);

	const toggleTheme = () => {
		const newTheme = theme === themes.light ? themes.dark : themes.light;
		setTheme(newTheme);
	}

	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium
	});

	if(!fontsLoaded){
		return <AppLoading/>
	}

  return (
		<ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
			<PaperProvider>
				<StatusBar
					barStyle={theme === themes.light ? "dark-content" : "light-content"}
					backgroundColor="transparent"
					translucent/>
				<Routes/>
			</PaperProvider>
		</ThemeContext.Provider>
  );
}

