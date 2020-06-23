import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as AsyncStorageHelper from '../constants/asyncStorageHelper';
import { useNavigation } from '@react-navigation/native';
import Animated, {Easing, Extrapolate, concat} from 'react-native-reanimated';

import {ThemeContext} from '../themes/theme-context'

interface countObj {
	curr: number;
	max: number;
}

const Header = ({count = 0}) => {

	const [maximum, setMaximum] = React.useState(0);
	const [current, setCurrent] = React.useState(0);
	const [isReady, setIsReady] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const {theme} = React.useContext(ThemeContext);
	const progressAnimation = React.useRef(new Animated.Value(0));

	React.useEffect(() => {
		Animated.timing(progressAnimation.current, {
			toValue: progress*100,
			duration: 1000,
			easing: Easing.in(Easing.bounce)
		}).start();
	}, [progress]);

	const width = progressAnimation.current.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP
	});

	const navigation = useNavigation();

	React.useEffect(() => {
		async function storeData(){
			if(isReady){
				if(count > maximum) setMaximum(count);

				await AsyncStorageHelper.storeData(count, count > maximum ? count : maximum);
				const prog = (count*maximum) === 0 ? 0 : (count)/maximum;
				setProgress(prog > 1 ? 1 : prog);
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
						setIsReady(true);
						const prog = (obj.curr*obj.max) === 0 ? 0 : (obj.curr)/obj.max;
						setProgress(prog > 1 ? 1 : prog);
					}
				}
				getData();
			}
		);
	}, []);

	return (
		<View style={styles.container}>
			
			<View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
				<View style={{...styles.progressBar, backgroundColor: theme.progressBarBg}}>
					<Animated.View style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: theme.progressBarFill,
							width: concat(width, '%'),
							borderRadius: 10,
						}
					]} />
				</View>
			</View>

			<Text style={{
				...styles.number,
				color: current === maximum ? theme.headerCountMax : theme.headerCount,
			}}>
				{current}/{maximum}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
	},
	counterCard: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 30,
		marginHorizontal: 5,
		borderRadius: 5,
	},
	number: {
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
	},
	progressBar: {
    flexDirection: 'row',
    height: 20,
		width: 220,
		borderRadius: 10,
		overflow: 'hidden'
	},
})

export default Header;