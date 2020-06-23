import React from 'react';

export const themes = {
	light: {

		bodyBg: '#FFFFFF',
		headerBg: '#FFFFFF',
		cardBg: '#66c2ff',
		cardCase: '#FFFFFF',
		cardGender: '#007acc',
		caseSelection: '#b3e0ff',

		btnBgClear: '#F0F0F0',
		btnBgSelected: '#81cbc4',
		btnBgCorrect: '#81cbc4',
		btnBgWrong: '#ed4337',
		btnTxt: '#A9A9A9',
		btnTxtSelected: '#FFFFFF',
		btnTxtCorrect: '#FFFFFF',
		btnTxtWrong: '#FFFFFF',

		bsTxtCorrect: '#3b9187',
		bsTxtWrong: '#ed4337',
		bsBgCorrect: '#81cbc4',
		bsBgWrong: '#ffcccc',

		opBg: '#FFFFFF',
		opSelectedBg: '#F0F0F0',
		opSelectedBgBottom: '#C8C8C8',
		opTxt: '#454545',
		opBorder: '#E8E8E8',
		opBorderBottom: '#D3D3D3',

		menuText: '#454545',
		menuBg: '#FFFFFF',

		headerCount: '#C8C8C8',
		headerCountMax : '#81cbc4',
		progressBarBg: '#E8E8E8',
		progressBarFill: '#a4dab2',
		progressBarInner: '#dbf0e0',
	},
	dark: {
		bodyBg: '#121212',
		headerBg: '#121212',
		cardBg: '#303030',
		cardCase: '#FFFFFF',
		cardGender: '#ff4d4d',
		caseSelection: '#ffb3b3',

		btnBgClear: '#303030',
		btnBgSelected: '#ffff99',
		btnBgCorrect: '#121212',
		btnBgWrong: '#121212',
		btnTxt: '#FFFFFF',
		btnTxtSelected: '#303030',
		btnTxtCorrect: '#3b9187',
		btnTxtWrong: '#ed4337',

		bsTxtCorrect: '#3b9187',
		bsTxtWrong: '#ed4337',
		bsBgCorrect: '#303030',
		bsBgWrong: '#303030',

		opBg: '#303030',
		opSelectedBg: '#ff4d4d',
		opSelectedBgBottom: '#cc0000',
		opTxt: '#FFFFFF',
		opBorder: '#404040',
		opBorderBottom: '#595959',

		menuText: '#FFFFFF',
		menuBg: '#303030',
		headerCount: '#C8C8C8',
		headerCountMax : '#ff4d4d',
		progressBarBg: '#E8E8E8',
		progressBarFill: '#ff4d4d',
		progressBarInner: '#dbf0e0',
	}
}
// #ff4d4d , #ffff99

export const ThemeContext = React.createContext({
	theme: themes.light,
	toggleTheme: () => {}
})