import { Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const APPID = 'com.actulio.german-cases';
const APPTHEMEID = 'com.actulio.german-cases-theme';

function handleError(title: string, error: any, exit = false){
	Alert.alert( title, error );
	if(exit){
		BackHandler.exitApp();
	}
}

const storeData = async (curr: number, max: number) => {
	try {
		await AsyncStorage.setItem(
			APPID, JSON.stringify({
				curr,
				max
			})
		);
	} catch (error) {
		handleError('Error saving new value', error, true);
	}
}

const getData = async () => {
	let data;
	try {
		data = await AsyncStorage.getItem(APPID);
	} catch (error) {
		handleError('Error getting value', error, true);
	}
	return data ? JSON.parse(data) : { curr: 0, max: 0 };
}

const getTheme = async () => {
	let theme;
	try {
		theme = await AsyncStorage.getItem(APPTHEMEID);
		if(!theme) {
			await AsyncStorage.setItem(APPTHEMEID, JSON.stringify({theme: 'light'}));
		}
	} catch (error) {
		handleError('Could not get saved theme.', error);
	}
	return theme ? JSON.parse(theme) : {theme: 'light'};
}

const toggleTheme = async (theme: string) => {
	try {
		await AsyncStorage.setItem(APPTHEMEID, JSON.stringify({theme}));
	} catch (error) {
		handleError('Could not save theme.', error);
	}
}

const debugRemove = async () => {
  try {
    await AsyncStorage.removeItem(APPTHEMEID);
    await AsyncStorage.removeItem(APPID);
  } catch(e) {
    handleError('Could not remove IDS', e);
  }
}


export {
	storeData,
	getData,
	getTheme,
	toggleTheme,
	debugRemove
}