import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as AsyncStorageHelper from '../constants/asyncStorageHelper';
import { useNavigation } from '@react-navigation/native';

interface countObj {
	curr: number;
	max: number;
}

const Header = ({count = 0}) => {

	const [maximum, setMaximum] = React.useState(0);
	const [current, setCurrent] = React.useState(0);
	const [isReady, setIsReady] = React.useState(false);

	const navigation = useNavigation();

	React.useEffect(() => {
		async function storeData(){
			if(isReady){
				if(count > maximum) setMaximum(count);
				await AsyncStorageHelper.storeData(count, count > maximum ? count : maximum);
			}
		}
		storeData();
		setCurrent(count);
	}, [count]);

	React.useEffect(() => {
		navigation.addListener(
			'focus',
			() => {
				async function getData(){
					const obj: countObj = await AsyncStorageHelper.getData();
					if(obj === undefined || obj === null) {
						await AsyncStorageHelper.storeData(0, 0);
						setMaximum(0);
						setCurrent(0);
					}else{
						setMaximum(obj.max);
						setCurrent(obj.curr);
					}
					setIsReady(true);
				}
				getData();
			}
		);
	}, [])


	return (
		<View style={styles.container}>

			<View style={{
				...styles.counterCard,
				backgroundColor: '#ffff99'
			}}>
				<Text style={styles.number}>{current}</Text>
			</View>

			<Text style={{...styles.number, color: 'black'}}>/</Text>

			<View style={{
				...styles.counterCard,
				backgroundColor: '#ff4d4d'

			}}>
				<Text style={styles.number} >{current > maximum ? current : maximum}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// width: 100,
	},
	counterCard: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 30,
		marginHorizontal: 5,
		borderRadius: 5


	},
	number: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
		color: 'black'
	}
})

export default Header;