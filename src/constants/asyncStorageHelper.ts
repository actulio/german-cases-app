import { AsyncStorage, Alert } from 'react-native';

const APPID = 'german-cases-app';

const storeData = async (curr,max) => {
	try {
		await AsyncStorage.setItem(
			APPID, JSON.stringify({
				curr,
				max
			})
		);
	} catch (error) {
		Alert.alert(
      'Error saving new value',
      error
    );
	}
}

const getData = async () => {
	return JSON.parse(await AsyncStorage.getItem(APPID));
}

export {
	storeData,
	getData
}