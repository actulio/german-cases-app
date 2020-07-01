import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import Animated, { Transition, Transitioning } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler';
import {useMemoOne} from 'use-memo-one';
import { useNavigation } from '@react-navigation/native'
import * as AsyncStorageHelper from '../../constants/asyncStorageHelper';

import runTiming from '../../constants/runTiming';
import BottomSheet from '../../components/BottomSheet';
import {ThemeContext} from '../../themes/theme-context';

const {
	Value,
	block,
	cond,
	eq,
	set,
	Clock,
} = Animated;

import { cases } from '../../constants/cases';
import GridText from '../../components/GridText';
import Header from '../../components/HeaderProgress';

const Home: React.FC = () => {

	const caseNames = ['nominative', 'accusative', 'dative', 'genitive'];
	const genderNames = ['masculine', 'feminine', 'neuter'];

	const [caseArticles, setCaseArticles] = React.useState<string[]>([
		'der', 'die', 'das', 'den', 'dem', 'des'
	]);
	const [isSelected, setIsSelected] = React.useState<boolean[]>([
		false, false, false, false, false, false
	]);

	const [current, setCurrent] = React.useState(0);
	const [maximum, setMaximum] = React.useState(0);
	const [isReady, setIsReady] = React.useState(false);
	const [randomCase, setRandomCase] = React.useState('');
	const [randomGender, setRandomGender] = React.useState('');
	const [selectedAnswer, setSelectedAnswer] = React.useState('');
	const [isCorrect, setIsCorrect] = React.useState(false);
	const [answerStatus, setAnswerStatus] = React.useState(0);
	const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);

	const viewRef = React.useRef(null);
	const navigation = useNavigation();

	const {theme} = React.useContext(ThemeContext);

	React.useLayoutEffect(() => {
		const listener = navigation.addListener(
			'focus',
			() => {
				async function getData(){
					const obj = await AsyncStorageHelper.getData();		
					setCurrent(obj.curr);
					setMaximum(obj.max);
					setIsReady(true);
				}
				getData();
			}
			);
		// return navigation.removeListener("focus", listener);
	}, []);

	React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
				<Header current={current} maximum={maximum} isReady={isReady}/>
      ),
		});
		if(isReady){
			AsyncStorageHelper.storeData(current, current > maximum ? current : maximum);
		}

	}, [current, maximum, isReady]);

	const { bottomSheetAnimation, clock, state  } = useMemoOne(
    () => ({
      bottomSheetAnimation: new Value(0),
			clock: new Clock(),
			state: new Value(State.UNDETERMINED)
		}),
    []
	);
	
	Animated.useCode(() => 
		block([
			cond(eq(state, State.END),
				set(
					bottomSheetAnimation, 
					runTiming(clock, 1000, isBottomSheetVisible ? 0 : 1, (isBottomSheetVisible ) ? 1 : 0)
					))
		]), [isBottomSheetVisible]
	)

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
		setCurrent(0);
		viewRef.current.animateNextTransition();
		getRandomCaseAndGender();
	}, []);

	function getRandomCaseAndGender() {
		const rnd1 = Math.floor(Math.random() * 4) + 0;
		const rnd2 = Math.floor(Math.random() * 3) + 0;
		setRandomCase(caseNames[rnd1])
		setRandomGender(genderNames[rnd2]);
	}

	function randomizeOptions() {
		const shuffledOptions = [...caseArticles].sort(() => 0.5 - Math.random());
		setCaseArticles(shuffledOptions);
		
		viewRef.current.animateNextTransition();
		getRandomCaseAndGender();
		
		const arr = isSelected.map(() => false);
		setIsSelected(arr);
		setSelectedAnswer('');
	}

	function handleOnPress(value: string, index: number) {
		const arr = isSelected.map((val, idx) => {
			return idx === index ? !val : false;
		});
		const text = arr.findIndex(val => val === true) !== - 1 ? value : '';

		setIsSelected(arr);
		setSelectedAnswer(text);
	}

	function handleSubmitAnswer(){

		if(answerStatus === 0){
			if(!selectedAnswer) return;
			const correctAnswer = cases[randomCase][randomGender];
			
			if(selectedAnswer === correctAnswer){
				if(current + 1 > maximum) {
					setMaximum(current + 1)
				}
				setCurrent(current + 1);
				
				setIsCorrect(true);
			}else {
				setIsCorrect(false);
				setCurrent(0);
			}

			setAnswerStatus(1);
			setIsBottomSheetVisible(!isBottomSheetVisible);
		}else {
			setIsBottomSheetVisible(!isBottomSheetVisible);
			randomizeOptions();
			setAnswerStatus(0);
		}
	}


	return (

		<View style={{flex: 1}}>

			<Transitioning.View
				style={{ flex: 1, backgroundColor: theme.bodyBg }}
				ref={viewRef}
				transition={transition}
			>
				<View style={{...styles.container}}>

					<View style={{...styles.card, backgroundColor: theme.cardBg}} >
						<Text style={{...styles.case, color: theme.cardCase,}} >
							{randomCase}
						</Text>
						<Text style={{...styles.gender, color: theme.cardGender}}>
							{randomGender}
						</Text>
						<View style={[
							styles.selectedTextContainer,
							{backgroundColor: selectedAnswer === '' ? theme.caseSelection: 'transparent'}
							]}>
							<Text style={styles.selectedAnswer} >
								{selectedAnswer}
							</Text>
						</View>
					</View>

				</View>
				
				<View style={styles.container}>
					<View style={styles.optionsContainer}  pointerEvents={answerStatus === 1 ? 'none' : 'auto'}>
						{caseArticles.map((value, index) => {
							return (
								<GridText 
									key={value}
									onPress={() => handleOnPress(value,index)}
									isSelected={isSelected[index]} 
									text={value} />
							)
						})}
					</View>

				</View>
			</Transitioning.View>


			<TouchableWithoutFeedback
				style={{ flex: 1, zIndex: 1 }}
				disabled={!selectedAnswer ? true : false}
				onPress={handleSubmitAnswer}>
						<Animated.View style={{
							...styles.buttonContainer,
							zIndex: 1 ,
							backgroundColor: selectedAnswer === '' ?
								theme.btnBgClear : (
									answerStatus === 0 ? theme.btnBgSelected :
										(isCorrect === true) ? theme.btnBgCorrect : theme.btnBgWrong ),
						}}>
						<Text style={{
							...styles.buttonText,
							color: selectedAnswer === '' ?
								theme.btnTxt : (
									answerStatus === 0 ? theme.btnTxtSelected :
										(isCorrect === true) ? theme.btnTxtCorrect : theme.btnTxtWrong ),
						}}>
							{isBottomSheetVisible ? 'NEXT' : 'ANSWER'}
						</Text>
					</Animated.View>
			</TouchableWithoutFeedback>

			<BottomSheet
				isVisible={isBottomSheetVisible}
				isCorrect={isCorrect}
				text={isBottomSheetVisible ? cases[randomCase][randomGender] : ''}
			/>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	optionsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		top: 0,
		width: 300,
		height: 100,
	},
	card: {
		width: 250,
		height: 200,
		bottom: 10,
		borderRadius: 20,
		padding: 20,
		paddingTop: 40,
		alignItems: 'center',
		elevation: 10,
		shadowColor: '#D3D3D3',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

	},
	case: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 30,
		textTransform: 'capitalize'
	},
	gender: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 24,
		textTransform: 'capitalize'
	},
	selectedTextContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		height: 40,
		width: 80
	},
	selectedAnswer: {
		fontFamily: 'Roboto_500Medium',
		fontSize: 22,
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

		shadowColor: '#D3D3D3',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 2,
		// overflow: 'hidden'
	},
	buttonText: {
		fontFamily: 'Roboto_400Regular',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default Home;