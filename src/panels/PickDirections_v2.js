import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import List from '@vkontakte/vkui/dist/components/List/List';
import { Cell } from '@vkontakte/vkui/dist/components/Cell/Cell';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import { Icon20Info } from '@vkontakte/icons';
import '../css/PickDirections_v2.css';
import { PanelHeaderBack } from '@vkontakte/vkui';

let newDirections = require('../json/new_directions.json');

class PickDirections_v2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedGroups: [],
			counter: 5,
			valid: false,
			choosedGroupTempArray: [],
		}
	}
	handleCheckboxChange(a) {
		if (a.target.checked) {
			this.state.counter = this.state.counter - 1;
			/* 			console.log(a.target.value); 
						console.log(a.target.parentNode.querySelector('.Checkbox__content').textContent);  */
		}
		else this.state.counter = this.state.counter + 1;



		if ((this.state.counter >= 0) && (this.state.counter < 5)) {
			this.setState({
				valid: true
			});
		} else {
			this.setState({
				valid: false
			});
		}
	}
	componentDidMount = () => {
		if (localStorage.getItem('selectedGroups')) {
			let counter = 0;
			for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length * 2 - 1; i++) {
				if (localStorage.getItem('selectedGroups')[i] !== ',') {

					document.querySelectorAll('input[type=checkbox]')[counter].checked = (localStorage.getItem('selectedGroups')[i] === 't' ? true : false);
					counter = counter + 1;
				}
			}
		}
	}

	handleInfoClick = (value) => (event) => {
		if (value) {
			localStorage.setItem('interestedDirection', value);
			this.props.go(event);
		}

		for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length; i++) {
			this.state.selectedGroups.push(document.querySelectorAll('input[type=checkbox]')[i].checked ? 't' : 'f');
		}
		localStorage.setItem('selectedGroups', [this.state.selectedGroups]);
	}


	goNextPageHandler = () => (event) => {
		localStorage.setItem('choosedGroups', []);
		for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length; i++) {
			if (document.querySelectorAll('input[type=checkbox]')[i].checked) {
				this.state.choosedGroupTempArray.push(document.querySelectorAll('input[type=checkbox]')[i].value);


			}
		}
		localStorage.setItem('choosedGroups', [this.state.choosedGroupTempArray]);
		let a = localStorage.getItem('choosedGroups');
		this.props.go(event)
	}


	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to='acquaintance' />}>PolyApp</PanelHeader>
				<Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem', }}>
					Хорошо, я всё записал. Вот программы обучения, выбери из них пять, которые тебе интересны.
		</Title>
				<Div style={{ marginLeft: 'auto', }}>
					<List>
						<Cell indicator={<Counter>{this.state.counter}</Counter>}>Доступно для выбора
			</Cell>
					</List>
				</Div>
				<Div style={{ marginLeft: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', width: '40%', margin: '0 auto', maxWidth: '220px' }}>
					ФИТ
		</Div>

				{localStorage.getItem('wantStudyForm') == 'intramural' && localStorage.getItem('wantStudyLevel') == 'bachelor' ?
					<Div style={{ background: "var(--background_content)", borderRadius: '8px', boxShadow: 'inset 0 0 0 var(--thin-border) var(--input_border)', margin: '0 16px', marginBottom: '80px' }}>
						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Информатика и вычислительная техника - 09.03.01
			</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem  style={{padding:0}}>
								<Checkbox value="newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][0]" checked={this.value} onChange={() => this.handleCheckboxChange(event)}> {newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][0]`)} data-to="about-direction" />
						</Div>

						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][1]">{newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][1]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][1]`)} data-to="about-direction" />
						</Div>

						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][2]">{newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][2]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[0]['Информатика и вычислительная техника - 09.03.01'][2]`)} data-to="about-direction" />
						</Div>

						<Div style={{ marginLeft: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Прикладная информатика 09.03.03
			</Div>

						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][0]">{newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][0]`)} data-to="about-direction" />
						</Div>

						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][1]">{newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][1]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[1]['Прикладная информатика - 09.03.03'][1]`)} data-to="about-direction" />
						</Div>

						<Div style={{ marginLeft: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Информационная безопасность - 10.03.01
			</Div>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Бакалвриат[2]['Информационная безопасность - 10.03.01'][0]">{newDirections.Очная.Бакалвриат[2]['Информационная безопасность - 10.03.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Бакалвриат[2]['Информационная безопасность - 10.03.01'][0]`)} data-to="about-direction" />
						</Div>
					</Div>
					: null
				}

				{localStorage.getItem('wantStudyForm') == 'intramural' && localStorage.getItem('wantStudyLevel') == 'specialty' ?

					<Div style={{ background: "var(--background_content)", borderRadius: '8px', boxShadow: 'inset 0 0 0 var(--thin-border) var(--input_border)', margin: '0 16px', marginBottom: '80px' }}>
						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Компьютерная безопастноть - 10.05.01
			</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Специалитет[0]['Компьютерная безопастноть - 10.05.01'][0]"> {newDirections.Очная.Специалитет[0]['Компьютерная безопастноть - 10.05.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Специалитет[0]['Компьютерная безопастноть - 10.05.01'][0]`)} data-to="about-direction" />
						</Div>
					</Div>
					: null
				}

				{localStorage.getItem('wantStudyForm') == 'intramural' && localStorage.getItem('wantStudyLevel') == 'magistracy' ?
					<Div style={{ background: "var(--background_content)", borderRadius: '8px', boxShadow: 'inset 0 0 0 var(--thin-border) var(--input_border)', margin: '0 16px', marginBottom: '80px' }}>
						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Прикладная информатика и математика - 01.04.02
					</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Магистаратура[0]['Прикладная информатика и математика - 01.04.02'][0]">  {newDirections.Очная.Магистаратура[0]['Прикладная информатика и математика - 01.04.02'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Магистаратура[0]['Прикладная информатика и математика - 01.04.02'][0]`)} data-to="about-direction" />
						</Div>


						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Информатика и вычислительная техника - 09.04.01
					</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][0]"> {newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][0]`)} data-to="about-direction" />
						</Div>

						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][1]"> {newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][1]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Магистаратура[1]['Информатика и вычислительная техника - 09.04.01'][1]`)} data-to="about-direction" />
						</Div>

						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Информационная безопасность - 10.04.01
					</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Магистаратура[2]['Информационная безопасность - 10.04.01'][0]"> {newDirections.Очная.Магистаратура[2]['Информационная безопасность - 10.04.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Магистаратура[2]['Информационная безопасность - 10.04.01'][0]`)} data-to="about-direction" />
						</Div>

						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Управление в технических системах - 27.04.04
					</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Очная.Магистаратура[3]['Управление в технических системах - 27.04.04'][0]"> {newDirections.Очная.Магистаратура[3]['Управление в технических системах - 27.04.04'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Очная.Магистаратура[3]['Управление в технических системах - 27.04.04'][0]`)} data-to="about-direction" />
						</Div>
					</Div>
					: null

				}

				{localStorage.getItem('wantStudyForm') == 'extramural' && localStorage.getItem('wantStudyLevel') == 'bachelor' ?

					<Div style={{ background: "var(--background_content)", borderRadius: '8px', boxShadow: 'inset 0 0 0 var(--thin-border) var(--input_border)', margin: '0 16px', marginBottom: '80px' }}>
						<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							Информатика и вычислительная техника - 09.03.01
				</Title>
						<Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
							<FormItem style={{padding:0}}>
								<Checkbox onChange={() => this.handleCheckboxChange(event)} value="newDirections.Заочная.Бакалавриат[0]['Информатика и вычислительная техника - 09.03.01'][0]"> {newDirections.Заочная.Бакалавриат[0]['Информатика и вычислительная техника - 09.03.01'][0]['Название направления']}</Checkbox>
							</FormItem>
							<Icon20Info onClick={this.handleInfoClick(`newDirections.Заочная.Бакалавриат[0]['Информатика и вычислительная техника - 09.03.01'][0]`)} data-to="about-direction" />
						</Div>
					</Div>
					: null
				}

				<FixedLayout filled vertical="bottom">
					<Div>
						<Button stretched size="l" mode="primary"
							disabled={!this.state.valid} onClick={this.goNextPageHandler(event)} data-to="choosed-directions-info">Продолжить</Button>
					</Div>
				</FixedLayout>
			</Panel>
		)
	};
}

export default PickDirections_v2;