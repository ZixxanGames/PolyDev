import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { Panel } from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { FormItem, Input } from '@vkontakte/vkui';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CalendarOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';


import DatePicker from '@vkontakte/vkui/dist/components/DatePicker/DatePicker';

import DatePicker_ from 'react-date-picker';
import Calendar from 'react-calendar';

import '../css/Calendar.css';
import { object } from 'prop-types';

import Header from '@vkontakte/vkui/dist/components/Header/Header';
import { getRandomInt } from '@vkontakte/vkjs';

const CalendarPanel = ({ fetchedUser, id, go }) => {
	const [notifies, setNotifies] = useState({});
	const [value, setValue] = useState('');
	const [text, setText] = useState('Нет напоминаний');
	const [texts, setTexts] = useState([]);
	const [date, setDate] = useState();
	const [allowedNotifies, setAllow] = useState(false);
	const [choosedDate, setChoosed] = useState(new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear())


	async function setToBridgeStorage(key, value) {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: key,
				value: JSON.stringify(value)
			});
		}
		catch (error) {
			console.error('error: ' + error);
		}
	}

	async function getFromBridgeStorage(keys) {
		try {
			const storageData = await bridge.send('VKWebAppStorageGet', { keys: keys });

			return storageData;
		} catch (error) {
			return undefined;
		}
	}

	async function callAPIMethod(methodName, requestId, params) {
		try {

			const response = await bridge.send("VKWebAppCallAPIMethod",
				{
					"method": methodName,
					"request_id": requestId ?? '',
					"params": params
				});

			console.log(response);
			return response.response;
		}
		catch (error) {
			console.error(error);
		}
	}


	async function deleteAllNotifies() {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: ''
			});
			setNotifies({});
		}
		catch (error) {
			console.error(error);
		}

		console.log('notifies removed');
	}

	async function showNotifies(date) {
		console.log('show notify');
		const key = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

		const datePicker = {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear()
		}

		setDate(datePicker);

		setChoosed(key);
		setTexts([]);
		if (Object.keys(notifies).length) {
			if (!notifies[key]) {
				console.log('Нет напоминаний');
				return;
			}

			let tmp = [];

			Object.keys(notifies[key]).forEach(text => {
				tmp.push(text);
			});

			setTexts(tmp);

			return datePicker;
		}
		else {
			try {
				const storageData = await bridge.send('VKWebAppStorageGet', { keys: ['notifies'] });
				const notifies = JSON.parse(storageData.keys[0].value);

				if (!notifies || !Object.keys(notifies).length) {
					return;
				}
				setNotifies(notifies);

				if (!notifies[key]) {
					return;
				}


				let allow = await getFromBridgeStorage(['allowNotifies']);

				for (const text of Object.keys(notifies[key])) {
					
				if (allow) {
					try {

						let data = await callAPIMethod('apps.isNotificationsAllowed', 'allow', {
							"user_id": fetchedUser.id,
							"v": "5.131",
							"access_token": "c437153fc437153fc437153f0bc4403b1ecc437c437153fa4511fafc89134934d49c427"
						})

						if (!data.is_allowed) {
							console.warn('уведомления выключены');
							return;
						}

						const response = await bridge.send("VKWebAppCallAPIMethod",
							{
								"method": "notifications.sendMessage",
								"request_id": text,
								"params": {
									"user_ids": fetchedUser.id,
									"access_token": "c437153fc437153fc437153f0bc4403b1ecc437c437153fa4511fafc89134934d49c427",
									"v": "5.131",
									"message": `Напоминание: ${text}`
								}
							});

						console.log(response);
					}
					catch (error) {
						console.error(error);
					}
				}

				}



			} catch (error) {
				console.log('no any notify');
			}
		}
	}

	async function addNotifies(date, message) {
		document.getElementById('input').value = ''
		if (message == null || message.trim() === '') {
			console.warn('Введите сообщение')
			return;
		}

		if (!date || !date.day || !date.month || !date.year) {
			console.warn('Введите дату');
			return;
		}
		console.log('raw date: ' + Object.keys(date));

		let allow = false;

		if (!allowedNotifies) {
			try {

				allow = await getFromBridgeStorage(['allowNotifies']);

				if (!allow) {
					allow = await bridge.send("VKWebAppAllowNotifications");

					setAllow(allow);

					await setToBridgeStorage('allowNotifies', allow);
				}
			}
			catch (error) {
				console.error(error);
			}
		}
		const key = date.day + '/' + date.month + '/' + date.year;
		console.log('parsed date: ' + key);
		console.log('mesage: ' + message);
		console.log('notifies: ' + notifies);
		console.log('notifies_keys: ' + Object.keys(notifies));

		if (!notifies[key]) notifies[key] = {};
		notifies[key][message] = "16:25:00";

		if (choosedDate === key) texts.push(message);

		try {
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: JSON.stringify(notifies)
			});

			setNotifies({});
			setNotifies(notifies);
		}
		catch (error) {
			console.error('error:' + error);
		}


		console.log('notify added');

	}

	async function deleteNotifiy(date) {
		delete notifies[date];
		setTexts([]);
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: JSON.stringify(notifies)
			});

			setNotifies({});
			setNotifies(notifies);
		}
		catch (error) {
			console.error('error:' + error);
		}


		console.log('notify removed');
	}

	async function deleteNotifiy1(date, message) {
		delete notifies[date][message];
		texts.splice(texts.indexOf(message), 1);

		if (!Object.keys(notifies[date]).length) delete notifies[date];

		try {
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: JSON.stringify(notifies)
			});

			setNotifies({});
			setNotifies(notifies);
		}
		catch (error) {
			console.error('error:' + error);
		}


		console.log('notify removed');
	}

	function highlightDates(date) {
		const parsedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

		if (Object.keys(notifies).find(notifyDate => parsedDate == notifyDate))
			return 'highlight';
	}

	async function getAllNotifies() {
		if (Object.keys(notifies).length) console.log(notifies);
		else {
			try {
				const storageData = await bridge.send('VKWebAppStorageGet', { keys: ['notifies'] });
				const value = JSON.parse(storageData.keys[0].value);
				setNotifies(value);
				console.log(value);
			}
			catch (error) {
				console.log('storage is empty')
			}
		}
	}

	useEffect(() => {
		getAllNotifies();
		showNotifies(new Date());
	}, []);
	return (
		<Panel id={id}>
			<PanelHeader>PolyApp</PanelHeader>
			<Group>
				<FormItem>
					<Input id='input' type='text' placeholder='Введите текст уведомления' />
				</FormItem>
				<Div>
					<DatePicker
						min={{ day: 11, month: 6, year: 2021 }}
						max={{ day: 1, month: 1, year: 2024 }}
						popupDirection='bottom'
						onDateChange={(value) => { console.log(value); setDate(value) }}
						dayPlaceholder="ДД"
						monthPlaceholder="ММММ"
						yearPlaceholder="ГГГГ"
						placeholder='Дата'
						defaultValue={{ day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear() }}
					/>
				</Div>
			</Group>
			<Group>
				<Div style={{ display: 'flex' }}>
					<Button stretched size='l' style={{ marginRight: 8 }} mode='primary' onClick={() => addNotifies(date, document.getElementById('input').value)}>
						Добавить уведомление
					</Button>
					<Button stretched mode='destructive' size='l' onClick={() => deleteAllNotifies()}>
						Удалить все уведомления
					</Button>
				</Div>
			</Group>
			<Group>
				<Div><Calendar className="calendar"
					onClickDay={showNotifies}
					value={new Date()}
					tileClassName={({ date }) => highlightDates(date)}
				/></Div>
			</Group>
			<Group style={{ marginBottom: 130 }}>
				<Div>
					<Title
						level="1"
						weight="semibold"
						style={{ marginBottom: 16, textAlign: 'center' }}>Запланированно на: {choosedDate} {texts.length ? <Button mode='destructive' onClick={() => deleteNotifiy(choosedDate)}>X</Button> : ''}</Title>
					<Title level="2" weight="regular" style={{ marginBottom: 16, textAlign: 'center' }} >
						{
							texts.length
								? texts.map((text) => <Div>{text} <Button mode='destructive' onClick={() => deleteNotifiy1(choosedDate, text)}>X</Button></Div>)
								: <Div>Нет напоминаний</Div>
						}
					</Title>
				</Div>
			</Group>
			<FixedLayout filled vertical="bottom">
				<Tabbar className='tabbar-padding'>
					<TabbarItem text="Вопросы" onClick={go} data-to="questions">
						<Icon28InfoCircleOutline />
					</TabbarItem>
					<TabbarItem text="Календарь" selected>
						<Icon28CalendarOutline />
					</TabbarItem>
					<TabbarItem text="Профиль" onClick={go} data-to="home">
						<Icon28UserCircleOutline />
					</TabbarItem>
				</Tabbar>
			</FixedLayout>
		</Panel>
	);
}

export default CalendarPanel;