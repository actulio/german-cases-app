import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';

import {ThemeContext, themes} from '../themes/theme-context';

const HeaderButton: React.FC = () => {

	const [isVisible, setIsVisible] = React.useState(false);
	const {theme, toggleTheme} = React.useContext(ThemeContext);

	const navigation = useNavigation();

	function handleGoToArticles() {
		setIsVisible(!isVisible);
		Alert.alert(
      "Warning!",
      "Seeing the articles table means you lose your current answer streak!",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
				{
					text: "OK", onPress: () => navigation.navigate('Table')
				}
      ],
      { cancelable: false }
    );
		;
	}

	function toggleDarkMode(){
		setIsVisible(!isVisible);
		toggleTheme();
	}

	return (
			<View style={{flexDirection: 'row', marginRight: 10}}>
				<Menu
					visible={isVisible}
					onDismiss={() => setIsVisible(!isVisible)}
					anchor={
						<View style={styles.menu}>
							<TouchableOpacity style={styles.menu} onPress={() => setIsVisible(!isVisible)}>
								<Ionicons name="md-more" size={30} color={theme.btnTxt} />
							</TouchableOpacity>
						</View>
					}
					contentStyle={{backgroundColor: theme.menuBg}}
				>
					<Menu.Item
						onPress={toggleDarkMode}
						theme={{ colors: { text: theme.menuText}}}
						title={theme === themes.light ? 'Dark Mode' : 'Light Mode'} />
					<Menu.Item
						onPress={handleGoToArticles}
						theme={{ colors: { text: theme.menuText } }}
						title="Articles" />
				</Menu>
	
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		overflow: 'visible'
	},
	menu: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
	}
})

export default HeaderButton;