import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { PanelHeaderBack } from '@vkontakte/vkui';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import { Cell } from '@vkontakte/vkui/dist/components/Cell/Cell';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import '../css/PickDirections_v2.css';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

let newDirections = require('../json/new_directions.json');

class ChoosedDirectionsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageDirections: `\n`,
            messageDirectionsArray: [],
            requiredPoint: {
                'математика': '39',
                'русский язык': '40',
                "Информатика и ИКТ/Физика": "44/39"
            }
        }
    }

    componentDidMount = () => {
        for (let i = 0; i < localStorage.getItem('choosedGroups').split(',').length; i++) {
            this.state.messageDirectionsArray.push(eval(localStorage.getItem('choosedGroups').split(',')[i])['Название направления'])
        }
        // console.log(this.state.messageDirectionsArray);
    }
    /* 
        firstMessage = () => {
        for (let i = 0; i<localStorage.getItem('choosedGroups').split(',').length; i++){
          this.state.messageDirections += `${i+1}. ` + eval(localStorage.getItem('choosedGroups').split(',')[i])['Название направления'] + '\n'
          
        }
        console.log(this.state.messageDirectionsArray)
        return (this.state.messageDirections);
        } */
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to='pick-directions' />}>PolyApp</PanelHeader>
                <Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem' }}>
                    Отлично! Ты выбрал:

    {
                        this.componentDidMount()}{
                        this.state.messageDirectionsArray.map((unit, index) => {
                            return (
                                <Text style={{ fontSize: '1.2rem' }} key={index}>{index + 1}. {unit}</Text>
                            )
                        }
                        )}
                </Title>

                <Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem' }}>
                    Чтобы участвовать в конкурсе на поступление тебе нужно сдать:
    {localStorage.getItem('wantStudyLevel') == 'magistracy' ?
                        <Text style={{ fontSize: '1.2rem' }}>- Междисциплинарный экзамен — 40</Text>
                        : Object.keys(this.state.requiredPoint).map((key, index) => {
                            return (
                                <Text style={{ fontSize: '1.2rem' }} key={index}>{index + 1}.{key} {this.state.requiredPoint[key]}</Text>
                            )
                        }
                        )}
                </Title>
                <Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem' }}>
                    Как подать документы?
          <Text style={{ fontSize: '1.2rem' }}>- Через личный кабинет абитуриента Московского Политеха</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Через портал Госуслуг</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Лично в университете</Text>
                </Title>
                <Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem' }}>
                    Подготовить документы:
          <Text style={{ fontSize: '1.2rem' }}>- Копися паспорта</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Аттестат или диплом СПО</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Копия СНИЛС</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Заявление на поступление</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Документы подтврждающие льготы (при наличии)</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- 2 матовые фотографии 3X4 (для поступающих по ВИ)</Text>
                    <Text style={{ fontSize: '1.2rem' }}>- Документы подтвержающиеучастие в олимпиадах (приналичии)</Text>
                </Title>
                <Title style={{ marginLeft: 16, marginRight: 16, marginBottom: 70, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem' }}>
                    Приём документов начинается 20 июня. Ждём тебя!
      </Title>

                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button stretched size="l" mode="primary" onClick={this.props.go} data-to="pick-directions">Продолжить</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    };
}

export default ChoosedDirectionsInfo;