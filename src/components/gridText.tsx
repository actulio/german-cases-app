import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

interface Props {
	isSelected: boolean;
	text: string;
	onPress: any;
}

const GridText = (props: Props) => {

	const { isSelected, text, onPress } = props;

	return (
		<TouchableOpacity 
			onPress={onPress}
			activeOpacity={.3}
			style={[styles.textContainer, 
				isSelected ? styles.selected : {}
			]}
		>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	textContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		padding: 10,
		borderRadius: 15,
		height: 50,
		width: 80,
		borderColor: Colors.opBorder,
		borderWidth: 1,
		borderBottomWidth: 4,
		borderBottomColor: Colors.opBorderBottom
	},
	text: {
		fontSize: 16,
		color: Colors.opTxt,
		fontFamily: 'Roboto_400Regular'
	},
	selected: {
		borderColor: Colors.opSelectedBg,
		borderBottomColor: Colors.opSelectedBgBottom,
		backgroundColor: Colors.opSelectedBg
	}

})

export default GridText;