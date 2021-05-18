import React, { Component } from 'react';


import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import { Button } from '@vkontakte/vkui';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { PanelHeaderBack } from '@vkontakte/vkui';

import '../css/AboutStudents.css'


class AboutStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            specialty: '',
            group: '',
            dorm: '',
            stud: '',
            prof: '',
            changed: false,
            groupValid: true,
            studValid: true,
            profValid: true,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount = () => {
        localStorage.clear();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        },
            () => { this.validateField(name, value) }
        );
        // if (((this.state.year !== '') || (name == 'year')) && ((this.state.specialty !== '') || (name == 'specialty')) && ((this.state.group !== '') || (name == 'group')) && ((this.state.dorm !== '') || (name == 'dorm'))) {
        //     this.setState({
        //         changed: true
        //     });
        // };
    };
    validateField = (fieldName, value) => {
        let groupValid = this.state.groupValid;
        let profValid = this.state.profValid;
        let studValid = this.state.studValid;
        switch (fieldName) {
            case 'group':
                groupValid = value.match(/\d{6}$/i);
                break;
            case 'prof':
                profValid = ((value.match(/\d{16}$/i)&&(value.length == 16))||(value == ''));
                break;
            case 'stud':
                studValid = (value.match(/\d{8}$/i)||(value == ''));
                break;
            default:
                break;
        }
        this.setState({
            groupValid: groupValid,
            profValid: profValid,
            studValid: studValid,
        }, this.validateForm);
    };
    validateForm = () => {
        this.setState({
            changed: this.state.groupValid &&
                this.state.profValid && this.state.studValid && (this.state.year !== '') && (this.state.specialty !== '')&&(this.state.dorm !== '')
        });
    };
    toStorage = () => {
        const { year, specialty, group, dorm, stud, prof } = this.state;
        localStorage.setItem('year', year);
        localStorage.setItem('specialty', specialty);
        localStorage.setItem('group', group);
        localStorage.setItem('dorm', dorm);
        localStorage.setItem('stud', stud);
        localStorage.setItem('prof', prof);
    };
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to='acquaintance' />}>PolyApp</PanelHeader>
                <FormItem top="Курс">
                    <Select name="year" value={this.state.year}
                        onChange={this.handleInputChange}
                        placeholder="Не выбран"
                        options={[{ value: 1, label: '1 курс' }, { value: 2, label: '2 курс' }, { value: 3, label: '3 курс' }, { value: 4, label: '4 курс' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                <FormItem top="Направление">
                    <Select name="specialty" value={this.state.specialty}
                        onChange={this.handleInputChange}
                        placeholder="Не выбрано"
                        options={[{ value: 'Информационная безопасность автоматизированных систем', label: 'Информационная безопасность автоматизированных систем' }, { value: 'Прикладная математика и информатика (Большие и открытые данные)', label: 'Прикладная математика и информатика (Большие и открытые данные)' }, { value: 'Веб-технологии', label: 'Веб-технологии' }, { value: 'Интеграция и программирование в САПР', label: 'Интеграция и программирование в САПР' }, { value: 'Программное обеспечение информационных систем', label: 'Программное обеспечение информационных систем' }, { value: 'Киберфизические системы', label: 'Киберфизические системы' }, { value: 'Большие и открытые данные', label: 'Большие и открытые данные' }, { value: 'Корпоративные информационные системы', label: 'Корпоративные информационные системы' }, { value: 'Информационная безопасность', label: 'Информационная безопасность' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                <FormItem top="Группа">
                    <Input type="text" name="group" className={!this.state.groupValid&&this.state.group!='' ? 'red' : null}
                        autocomplete="off"
                        value={this.state.group}
                        onChange={this.handleInputChange}
                        placeholder="000-000" />
                </FormItem>
                <FormItem top="Живешь в общежитии">
                    <Select value={this.state.dorm}
                        onChange={this.handleInputChange}
                        name='dorm'
                        placeholder="Не выбрано"
                        options={[{ value: 'Yes', label: 'Да' }, { value: 'No', label: 'Нет' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                <FormItem top="Номер студенческого(необязательно)">
                    <Input type="text" name="stud" className={!this.state.studValid ? 'red' : null}
                        autocomplete="off"
                        value={this.state.stud}
                        onChange={this.handleInputChange}
                        placeholder="0000-0000" />
                </FormItem>
                <FormItem top="Номер профбилета(необязательно)" style={{ marginBlockEnd: 70, writingMode: 'horizontal-tb' }}>
                    <Input type="text" name="prof" className={!this.state.profValid ? 'red' : null}
                        autocomplete="off"
                        value={this.state.prof}
                        onChange={this.handleInputChange}
                        placeholder="0000000000000000" />
                </FormItem>
                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button type="submit" stretched size="l" mode="primary" disabled={!this.state.changed}
                            onClick={this.toStorage(), this.props.go} data-to="home">Продолжить</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}

export default AboutStudent;