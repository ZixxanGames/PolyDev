import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import { Cell } from '@vkontakte/vkui/dist/components/Cell/Cell';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import '../css/Radio.css';
import { scrollToBottom } from 'react-scroll/modules/mixins/animate-scroll';
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

const Acquaintance = ({ id, go, fetchedUser }) => {

	const [want, setWant] = useState(false)
	const [wantStudyForm, setForm] = useState('intramural')
	const [wantStudyLevel, setLevel] = useState('bachelor')

	useEffect(() => {
		localStorage.setItem('selectedGroups', []);
	});

	const handleNextClick = (event) => {
		localStorage.setItem('wantStudyForm', wantStudyForm);
		localStorage.setItem('wantStudyLevel', wantStudyLevel);
		go(event)
	};
	const scrollToSection = () => {
		setWant(true)
		scroll.scrollToBottom();
	};
	return (
		<Panel id={id}>
			<PanelHeader>PolyApp</PanelHeader>
			{fetchedUser &&
				<Group header={<Header mode="primary">Приветствуем тебя</Header>}>
					<Div className="homepage-subhead">
						<Subhead weight="semibold">Это мобильное приложение Московского Политеха</Subhead>
					</Div>
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
						description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>}
			<Group>
				<Div>
					<FormLayout>
						<FormItem top="Анкета">
							<Radio name="radio" onClick={() => setWant(false)} value="already" defaultChecked>Я уже учусь в Московском Политехе</Radio>
							<Radio name="radio" onClick={() => scrollToSection()} value="newStudent">Я только собираюсь поступить</Radio>
						</FormItem>
					</FormLayout>
				</Div>
				{want ?
					<Div style={{ marginBlockEnd: 50 }}>
						<Caption className="captionCaps" level="1" weight="semibold" caps >
							Круто! Мы рады, что тебя привлёк наш университет. Расскажи, какая форма обучения тебя интересует?
					</Caption>
						<FormLayout>
							<FormItem top="Форма обуения">
								<Radio name="radio" value="intramural" onClick={() => setForm('intramural')} defaultChecked>Очная</Radio>
								<Radio name="radio" value="extramural" onClick={() => setForm('extramural')}>Заочная</Radio>
							</FormItem>
						</FormLayout>
						<FormLayout>
							{wantStudyForm == 'intramural' ?
								<FormItem top="Ступень образования">
									<Radio name="radio" value="bachelor" onClick={() => setLevel('bachelor')} defaultChecked>Бакалавриат</Radio>
									<Radio name="radio" value="specialty" onClick={() => setLevel('specialty')} >Специалитет</Radio>
									<Radio name="radio" value="magistracy" onClick={() => setLevel('magistracy')} >Магистратура</Radio>
								</FormItem>
								:
								<FormItem className="myDiv" top="Ступень образования">
									<Radio name="radio" value="bachelor" onClick={() => setLevel('bachelor')} defaultChecked>Бакалавриат</Radio>
								</FormItem>
							}

						</FormLayout>
					</Div>
					: null
				}
				<FixedLayout filled vertical="bottom">
					<Div>
						<Button stretched size="l" mode="primary" onClick={(event)=>handleNextClick(event)} data-to={want ? 'pick-directions' : 'student-form-filling'} >
							Далее
							</Button>
					</Div>
				</FixedLayout>
			</Group>
		</Panel>
	);
}

Acquaintance.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Acquaintance;