import React from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";

import Colors from '..//constants/colors';
import runTiming from '../constants/runTiming';

const {
  set,
  Value,
	Clock,
	block,
	cond,
	eq,
	interpolate,
	Extrapolate
} = Animated;

interface Props {
	isVisible: boolean,
	isCorrect: boolean,
	text: string,
}

const {width, height} = Dimensions.get('window');

const BottomSheet:React.FC<Props> = ({isVisible, isCorrect, text }) => {

  const { animation, clock } = useMemoOne(
    () => ({
      animation: new Value(isVisible ? 0 : 1),
      clock: new Clock()
    }),
    [isVisible]
	);

  // useCode(
  //   set(
  //     animation,
  //     // runTiming is a helper from react-native-redash
  //     runTiming(clock, animation, {
  //       toValue: selected ? 1 : 0,
  //       duration: 250,
  //       easing: Easing.inOut(Easing.ease)
  //     })
  //   ),
  //   [animation]
	// );
	
	Animated.useCode(() =>
		block([
			cond(
				eq(animation, 0),
				set(
					animation,
					runTiming(clock, 1000, 0, 1)
				),
			)
		]), [animation]
	)
	
	const transY = interpolate(animation, {
		inputRange: [0, 1],
		outputRange: [0, height/6],
		extrapolate: Extrapolate.CLAMP
	});

	const zIndex = interpolate(animation, {
		inputRange: [0, 1],
		outputRange: [0, -1],
		extrapolate: Extrapolate.CLAMP
	});

  return (
			<Animated.View
			// @ts-ignore 
				style={{
					...styles.bottomSheet,
					zIndex: zIndex,
					transform: [{
						translateY: transY
					}],
					backgroundColor: isCorrect ? Colors.bsBgCorrect : Colors.bsBgWrong ,
				}}
			>

			{isCorrect ? (
				<Text style={{ ...styles.text, color: Colors.bsTxtCorrect }}>Correct!</Text>
			) :(
				<Text style={{ ...styles.text, color: Colors.bsTxtWrong }}>
					The correct answer is: {text.charAt(0).toUpperCase().concat(text.slice(1))}
				</Text>
			)}
			</Animated.View>
  );
}

const styles = StyleSheet.create({
	bottomSheet: {
		position: 'absolute',
		bottom: 0,
		width: width,
		height: height/6,
		backgroundColor: 'blue',
		paddingLeft: 20,
		paddingVertical: 10
	},
	text: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 20,
		marginBottom: 5
	}
})

export default BottomSheet;