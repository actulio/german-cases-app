import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import {ThemeContext} from '../../themes/theme-context';

import * as AsyncStorageHelper from '../../constants/asyncStorageHelper';

interface countObj {
	curr: number;
	max: number;
}

const Table = () => {

	const {theme} = React.useContext(ThemeContext);
	
	React.useEffect(() => {
		async function resetCurrent(){
			const oldValues : countObj = await AsyncStorageHelper.getData();
			await AsyncStorageHelper.storeData(0, oldValues.max);
		}
		resetCurrent();
	}, []);

	return (
		<View style={{...styles.container,backgroundColor: theme.bodyBg}}>
			{/* <Image style={{flex: 1}}  source={require('../../assets/table.png')} /> */}
			<DataTable style={{...styles.table, backgroundColor: 'lightgrey'}}>
				<DataTable.Header>
					<DataTable.Title ></DataTable.Title>
					<DataTable.Title numeric>Masc.</DataTable.Title>
					<DataTable.Title numeric>Fem.</DataTable.Title>
					<DataTable.Title numeric>Neut.</DataTable.Title>
					<DataTable.Title numeric>Plu.</DataTable.Title>
				</DataTable.Header>

				<DataTable.Row>
					<DataTable.Cell>Nominative</DataTable.Cell>
					<DataTable.Cell numeric>Der</DataTable.Cell>
					<DataTable.Cell numeric>Die</DataTable.Cell>
					<DataTable.Cell numeric>Das</DataTable.Cell>
					<DataTable.Cell numeric>Die</DataTable.Cell>
				</DataTable.Row>

				<DataTable.Row>
					<DataTable.Cell>Acusative</DataTable.Cell>
					<DataTable.Cell numeric>Den</DataTable.Cell>
					<DataTable.Cell numeric>Die</DataTable.Cell>
					<DataTable.Cell numeric>Das</DataTable.Cell>
					<DataTable.Cell numeric>Die</DataTable.Cell>
				</DataTable.Row>

				<DataTable.Row>
					<DataTable.Cell>Dative</DataTable.Cell>
					<DataTable.Cell numeric>Dem</DataTable.Cell>
					<DataTable.Cell numeric>Der</DataTable.Cell>
					<DataTable.Cell numeric>Dem</DataTable.Cell>
					<DataTable.Cell numeric>Den</DataTable.Cell>
				</DataTable.Row>


				<DataTable.Row>
					<DataTable.Cell >Genitive</DataTable.Cell>
					<DataTable.Cell numeric>Des</DataTable.Cell>
					<DataTable.Cell numeric>Der</DataTable.Cell>
					<DataTable.Cell numeric>Des</DataTable.Cell>
					<DataTable.Cell numeric>Der</DataTable.Cell>
				</DataTable.Row>

			</DataTable>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		top: -100,
	},
	table: {
		borderWidth: 1,  
		borderColor: '#D3D3D3',
		borderRadius: 10,
		padding: 10,
		paddingBottom: 20
	}
})

export default Table;