import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import {ThemeContext} from '../themes/theme-context'

interface Props {
	isSelected: boolean;
	text: string;
	onPress: any;
}

const GridText = (props: Props) => {

	const { isSelected, text, onPress } = props;
	const {theme} = React.useContext(ThemeContext);

	return (
		<TouchableOpacity 
			onPress={onPress}
			activeOpacity={.3}
			style={[styles.textContainer,
				isSelected ? {
					borderColor: theme.opSelectedBg,
					borderBottomColor: theme.opSelectedBgBottom,
					backgroundColor: theme.opSelectedBg
				} : {
					borderColor: theme.opBorder,
					borderBottomColor: theme.opBorderBottom,
					backgroundColor: theme.opBg
				},
			]}
		>
			<Text style={{...styles.text, color: theme.opTxt,}}>{text}</Text>
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
		borderWidth: 1,
		borderBottomWidth: 4,
	},
	text: {
		fontSize: 16,
		fontFamily: 'Roboto_400Regular'
	},

})

export default GridText;