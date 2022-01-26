import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<SnackbarProvider
			autoHideDuration={1000}
			transitionDuration={{ enter: 300, exit: 300 }}
			maxSnack={3}
		>
			<App />
		</SnackbarProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
