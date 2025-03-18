import { domAnimation, LazyMotion } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store/store';
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<LazyMotion features={domAnimation}>
				<App />
			</LazyMotion>
		</Provider>
	</StrictMode>
);
