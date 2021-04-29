import React,{ Component} from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import List from '@vkontakte/vkui/dist/components/List/List';
import {Cell} from '@vkontakte/vkui/dist/components/Cell/Cell';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import '../css/PickDirections_v2.css';

class PickDirections_v2 extends Component{
	constructor (props) {
		super(props);
		this.state = {
				groups: [{value:'0',label:'Информационные технологии', role:'header' } ,{value: '1', label: 'Интеграция и программирование в САПР'}, {value: '2', label: 'Прикладная математика и информатика'}, {value: '3', label: 'Веб-технологии'}, {value: '4', label: 'Корпоративные информационные системы'}, {value:'5', label: 'Прикладная кибербезопасность'},{value:'-1',label:'Экономика и Управление',role:'header'},{value:'6',label:'Экономика и финансы предприятия'},{value:'7', label:'Экономика'}, {value:8, label:'Управление Персоналом'}, {value:9, label:'Реклама и связи с общественностью'}],
				selectedGroups: [],
				counter: 5,
				valid: true,
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}
/* 	componentDidMount = () =>{
			localStorage.clear();
	} */
	directionToStorage = (a) => {
		console.log(a)
	}

	handleInputChange(event) {
		this.state.counter = 5 - event.length;
		this.state.selectedGroups = event;

	if ((this.state.selectedGroups.length > 0 )&&(this.state.selectedGroups.length <= 5) ) {
			this.setState({
				valid: true
			});
		} else {
			this.setState({
				valid: false
			});
		}

}

render () {
	return(
	<Panel id={this.props.id}>
		<PanelHeader>PolyApp</PanelHeader>
		<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem',}}> 
		Хорошо, я всё записал. Вот программы обучения, выбери из них пять, которые тебе интересны.	
		</Div>
		<Div  style={{marginLeft: 'auto', }}>
		<List style={{display:'none'}}>
			<Cell indicator={<Counter>{this.state.counter}</Counter>}>Доступно для выбора
			</Cell>
		</List>
		</Div>
		<Div>
            <Title level="1" weight="semibold" style={{ marginBottom: 16, textAlign:'center' }}>Факультет информационных технологий</Title>
        </Div>	
		<Div style={{background:"var(--background_content)", borderRadius: '8px', boxShadow: 'inset 0 0 0 var(--thin-border) var(--input_border)', margin:'0 16px', marginBottom:'80px' }}>
			<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign:'center', fontSize: '1rem', margin:'0 auto'}}> 
				Информатика и вычислительная техника	09.03.01
			</Div>	
			<FormItem >	
				<Checkbox>{this.state.groups[0].label}</Checkbox>
				<Checkbox>{this.state.groups[1].label}</Checkbox>
				<Checkbox>{this.state.groups[2].label}</Checkbox>
				<Checkbox>{this.state.groups[3].label}</Checkbox>
			</FormItem>
			<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign:'center', fontSize: '1.1rem', margin:'0 auto'}}> 
				Прикладная информатика 09.03.03
			</Div>	
			<FormItem>	
				<Checkbox>Большие и открытые данные</Checkbox>
				<Checkbox>Корпоративные информационные системы</Checkbox>
			</FormItem>
			<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign:'center', fontSize: '1.1rem', margin:'0 auto'}}> 
				Информационная безопасность автоматизированных систем 10.05.03
			</Div>
			<FormItem>	
				<Checkbox>Информационная безопасность автоматизированных систем</Checkbox>
			</FormItem>
			<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign:'center', fontSize: '1.1rem', margin:'0 auto'}}> 
				Прикладная математика и информатика 01.03.02
			</Div>
			<FormItem>	
				<Checkbox>Большие и открытые данные</Checkbox>
			</FormItem>
			<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign:'center', fontSize: '1.1rem', margin:'0 auto'}}> 
				Информационная безопасность 10.03.01
			</Div>
			<FormItem>	
				<Checkbox>Информационная безопасность</Checkbox>
			</FormItem>
    </Div>

		<FixedLayout filled vertical="bottom">
			<Div>
        <Button stretched size="l" mode="primary"
        disabled={!this.state.valid} onClick={this.props.go} data-to="start">Продолжить</Button>
      </Div>
		</FixedLayout>
	</Panel>
)
};
}

export default PickDirections_v2;