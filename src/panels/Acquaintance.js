import React, { Component } from 'react';
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

class Acquaintance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			want: false,
			wantStudyForm: 'intramural',
			wantStudyLevel: 'bachelor'
		}
	}

	componentDidMount = () => {
		localStorage.clear()
		localStorage.setItem('selectedGroups', []);
	}

	handleNextClick = () => (event) => {
		localStorage.setItem('wantStudyForm', this.state.wantStudyForm);
		localStorage.setItem('wantStudyLevel', this.state.wantStudyLevel);
		this.props.go(event);
	}


	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>PolyApp</PanelHeader>
				{this.props.fetchedUser &&
					<Group header={<Header mode="primary">Приветствуем тебя</Header>}>
						<Div className="homepage-subhead">
							<Subhead weight="semibold">Это мобильное приложения Московского Политеха</Subhead>
						</Div>
						<Cell
							before={this.props.fetchedUser.photo_200 ? <Avatar src={this.props.fetchedUser.photo_200} /> : null}
							description={this.props.fetchedUser.city && this.props.fetchedUser.city.title ? this.props.fetchedUser.city.title : ''}
						>
							{`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
						</Cell>
					</Group>}
				<Group>
					<Div>
						<FormLayout>
							<FormItem top="Анкета">
								<Radio name="radio" onClick={() => this.setState({ want: false })} value="already" defaultChecked>Я уже учусь в Московском Политехе</Radio>
								<Radio name="radio" onClick={() => this.setState({ want: true })} value="newStudent">Я только собираюсь поступить</Radio>
							</FormItem>
						</FormLayout>
					</Div>
					{this.state.want ?
						<Div style={{ marginBlockEnd: 50 }}>
							<Caption className="captionCaps" level="1" weight="semibold" caps >
								Круто! Мы рады, что тебя привлёк наш университет. Расскажи, какая форма обучения тебя интересует?
					</Caption>
							<FormLayout>
								<FormItem top="Форма обуения">
									<Radio name="radio" value="intramural" onClick={() => this.setState({ wantStudyForm: 'intramural' })} defaultChecked>Очная</Radio>
									<Radio name="radio" value="extramural" onClick={() => this.setState({ wantStudyForm: 'extramural' })}>Заочная</Radio>
								</FormItem>
							</FormLayout>
							<FormLayout>
								{this.state.wantStudyForm == 'intramural' ?
									<FormItem top="Ступень образования">
										<Radio name="radio" value="bachelor" onClick={() => this.setState({ wantStudyLevel: 'bachelor' })} defaultChecked>Бакалавриат</Radio>
										<Radio name="radio" value="specialty" onClick={() => this.setState({ wantStudyLevel: 'specialty' })} >Специалитет</Radio>
										<Radio name="radio" value="magistracy" onClick={() => this.setState({ wantStudyLevel: 'magistracy' })} >Магистратура</Radio>
									</FormItem>
									:
									<FormItem top="Ступень образования">
										<Radio name="radio" value="bachelor" onClick={() => this.setState({ wantStudyLevel: 'bachelor' })} defaultChecked>Бакалавриат</Radio>
									</FormItem>
								}

							</FormLayout>
						</Div>
						: null
					}
					<FixedLayout filled vertical="bottom">
						<Div>
							<Button stretched size="l" mode="primary" onClick={this.handleNextClick(event)} data-to={this.state.want ? 'pick-directions' : 'student-form-filling'} >
								Далее
							</Button>
						</Div>
					</FixedLayout>
				</Group>
			</Panel>
		)
	}
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