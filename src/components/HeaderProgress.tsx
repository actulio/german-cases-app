import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Animated, {Easing, Extrapolate, concat} from 'react-native-reanimated';

import {ThemeContext} from '../themes/theme-context'

interface Props {
	current: number;
	maximum: number;
	isReady: boolean;
}

const Header = ({current = 0, maximum = 0, isReady = false} : Props) => {

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

	React.useLayoutEffect(() => {
		const prog = (current*maximum) === 0 ? 0 : (current)/maximum;
		setProgress(prog > 1 ? 1 : prog);
	}, [current, maximum]);


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

			{isReady ? (
				<Text style={{
					...styles.number,
					color: current === maximum ? (maximum === 0 ? theme.headerCount : theme.headerCountMax) : theme.headerCount,
				}}>
					{`${current}/${maximum}`}
				</Text>
			) : (
					<ActivityIndicator color={theme.progressBarFill} />
				)
			}

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