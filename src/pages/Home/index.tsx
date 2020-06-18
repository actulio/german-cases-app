import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import runTiming from '../../constants/runTiming';
import Animated, {Extrapolate} from 'react-native-reanimated';

const {
	Value,
	block,
	cond,
	eq,
	set,
	Clock,
	startClock,
	stopClock,
	clockRunning,
	timing,
	debug,
	interpolate,
	concat
} = Animated;

import { cases } from '../../constants/cases';
import GridText from '../../components/gridText';

const Home: React.FC = () => {

	const [caseArticles, setCaseArticles] = React.useState<string[]>([
		'der', 'die', 'das', 'den', 'dem', 'des'
	]);
	const [isSelected, setIsSelected] = React.useState<boolean[]>([
		false, false, false, false, false, false
	]);
	const [rndCaseGender, setRndCaseGender] = React.useState<string[]>([]);
	const [selectedAnswer, setSelectedAnswer] = React.useState('');
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const viewRef = React.useRef(null);

	const caseNames = ['nominative', 'accusative', 'dative', 'genitive'];
	const caseGenders = ['masculine', 'feminine', 'neuter'];
	
	const buttonOpacity = new Value(1);

	const inputContainerZindex = interpolate(buttonOpacity, {
		inputRange: [0, 1],
		outputRange: [1, -1],
		extrapolate: Extrapolate.CLAMP
	});
	const inputContainerY = interpolate(buttonOpacity, {
		inputRange: [0, 1],
		outputRange: [0, 100],
		extrapolate: Extrapolate.CLAMP
	});
	const inputContainerOpacity = interpolate(buttonOpacity, {
		inputRange: [0, 1],
		outputRange: [1, 0],
		extrapolate: Extrapolate.CLAMP
	});


	const transition = (
		<Transition.Together>
			<Transition.In
				type="fade"
				durationMs={1000}
				interpolation="easeInOut"
			/>
			<Transition.Change />
			<Transition.Out type="fade" durationMs={1000} />
		</Transition.Together>
	);

	React.useEffect(() => {
		viewRef.current.animateNextTransition();
		getRandomCaseAndGender();
	}, []);

	function getRandomCaseAndGender() {
		const rnd1 = Math.floor(Math.random() * 4) + 0;
		const rnd2 = Math.floor(Math.random() * 3) + 0;
		setRndCaseGender([caseNames[rnd1], caseGenders[rnd2]]);
	}

	function randomizeOptions() {
		const shuffledOptions = [...caseArticles].sort(() => 0.5 - Math.random());
		setCaseArticles(shuffledOptions);

		viewRef.current.animateNextTransition();

		getRandomCaseAndGender();
	}

	function handleOnPress(value: string, index: number) {
		const arr = isSelected.map((val, idx) => {
			return idx === index ? !val : false;
		});
		const text = arr.findIndex(val => val === true) !== - 1 ? value : '';

		setIsSelected(arr);
		setSelectedAnswer(text);
	}

	function resetSelected(){
		const arr = isSelected.map(() => false);
		setIsSelected(arr);
		setSelectedAnswer('');
	}

	function handleSubmitAnswer(){

		if(!selectedAnswer) return;

		const correctAnswer = cases[rndCaseGender[0]][rndCaseGender[1]];
		if(selectedAnswer === correctAnswer){
			Alert.alert('Correto!');
			console.log("correto");
		}else {
			Alert.alert('Errado!', `A resposta correta é ${correctAnswer}!`);
			console.log("errado " + correctAnswer);
		}
		setIsSubmitted(!isSubmitted);
		randomizeOptions();
		resetSelected();
	}


	return (
		<>
			<Transitioning.View
				style={{ flex: 1 }}
				ref={viewRef}
				transition={transition}
			>
				<View style={styles.container}>
					<View style={styles.card} >
						<Text style={styles.case} >
							{rndCaseGender[0]}
						</Text>
						<Text style={styles.gender}>
							{rndCaseGender[1]}
						</Text>
						<View style={[
							styles.selectedTextContainer,
							{backgroundColor: selectedAnswer === '' ? '#c9e9e5': 'transparent'}
							]}>
							<Text style={styles.selectedAnswer} >
								{selectedAnswer}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.optionsContainer}>
						{caseArticles.map((value, index) => {
							return (
								<GridText 
									key={value}
									onPress={handleOnPress.bind(this, value, index)}
									isSelected={isSelected[index]} 
									text={value} />
							)
						})}
					</View>

				</View>
			</Transitioning.View>
			
			<TouchableWithoutFeedback disabled={!selectedAnswer ? true : false} style={{ flex: 1 }} onPress={handleSubmitAnswer}>
				<View style={[
					styles.buttonContainer,
					{ backgroundColor: selectedAnswer !== '' ? '#81cbc4' : '#F0F0F0' }
				]}>
					<Text style={[
						styles.buttonText,
						{ color: selectedAnswer !== '' ? 'white' : '#A9A9A9' }
					]}>
						ANSWER
						{/* {isSubmitted ? 'NEXT' : 'ANSWER'} */}
				</Text>
				</View>
			</TouchableWithoutFeedback>
		</>
	
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	optionsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		top: 20,
		width: 300,
		height: 100,
	},
	card: {
		width: 200,
		height: 150,
		bottom: 10,
		backgroundColor: '#81cbc4',
		borderRadius: 20,
		elevation: 10,
		padding: 20,
		alignItems: 'center'
	},
	case: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 26,
		color: 'white',
		textTransform: 'capitalize'
	},
	gender: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 20,
		color: '#3b9187',
		textTransform: 'capitalize'
	},
	selectedTextContainer: {
		backgroundColor: '#c9e9e5',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		height: 30,
		width: 70
	},
	selectedAnswer: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 18,
		color: 'white'
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		margin: 20,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#F0F0F0',
		overflow: 'hidden'
	},
	buttonText: {
		fontFamily: 'Roboto_400Regular',
		fontSize: 16,
		color: '#A9A9A9',
		fontWeight: 'bold'
	}
});

export default Home;