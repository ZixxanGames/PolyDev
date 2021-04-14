import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Start from './panels/Start';
import Acquaintance from './panels/Acquaintance';
import StudyForm from './panels/StydyForm';
import Degree from './panels/Degree';
import AboutStudent from './panels/AboutStudent';
import HomePage from './panels/HomePage';

const App = () => {
	const [activePanel, setActivePanel] = useState('start');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	// const [group, setGroup] = useState('');
	// const [stud,setStud] = useState('');
	// const [prof, setProf] = useState('');
	// const [dorm, setDorm] = useState('');
	// const [year, setYear] = useState('');

	// updateData((value) => {
	// 	this.setState({ group:value })
	//   });

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Start id='start' fetchedUser={fetchedUser} go={go} />
					<Acquaintance id='acquaintance' go={go} />
					<StudyForm id='study-form' go={go} />
					<Degree id='degree' go={go}/>
					{/* Ветка два */}
					<AboutStudent id="student-form-filling" go={go} />
					<HomePage id='home' fetchedUser={fetchedUser} go={go}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

