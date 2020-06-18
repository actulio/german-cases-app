import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
	isSelected: boolean;
	text: string;
	onPress: any;
}

const GridText = (props: Props) => {

	const { isSelected, text, onPress } = props;

	const [selected, setSelected] = React.useState(false);

	function handleSelectOption() {
		setSelected(!selected);
	}

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
		borderColor: '#E8E8E8',
		borderWidth: 1,
		borderBottomWidth: 4,
		borderBottomColor: '#D3D3D3'
	},
	text: {
		fontSize: 16,
		color: '#454545',
		fontFamily: 'Roboto_400Regular'
	},
	selected: {
		borderColor: '#F0F0F0',
		borderBottomColor: '#C8C8C8',
		backgroundColor: '#F0F0F0'
	}
		// selected: {
	// 	borderColor: '#ccffcc',
	// 	borderBottomColor: '#80ff80',
	// 	backgroundColor: '#ccffcc'
	// }

})

export default GridText;