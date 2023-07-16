import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	html,body {
		overflow-x: hidden;
	}
	body {
		font-family: 'Open Sans Condensed';
		padding: 20px 40px;
		
		@media screen and (max-width: 800px) {
			padding: 10px;
		}

		@media screen and (max-width: 400px) {
			padding: 5px;
		}
	}
	a {
		text-decoration: none;
		color: black;
	}
	* {
		box-sizing: border-box;
	}
`;