import React, { Component} from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import { Button } from '@vkontakte/vkui';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import '../css/AboutStudents.css'


class AboutStudent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            group: '',
            stud: '',
            prof: '',
            dorm: '',
            year: '',
            changed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
      }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'select-one' ? target.options.value : target.value;;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
        if ((this.state.group !== '')&&(this.state.stud !== '')&&(this.state.dorm !== '')&&(this.state.year !== '')){
            this.setState({
                changed: true
            });
        };
    }
  render () {
    return (
        <Panel id={this.props.id}> 
            <PanelHeader>PolyApp</PanelHeader>
            <FormItem top="Курс">
            <Select name = "year" value={this.state.value}
            onChange={this.handleInputChange}
            placeholder="Не выбран" 
            options={[{value:1, label:'1 курс'},{value:2, label:'2 курс'},{value:3, label:'3 курс'},{value:4, label:'4 курс'}]}
            renderOption={({ option, ...restProps }) => (
                <CustomSelectOption {...restProps} />
            )}
            />
            </FormItem>
            <FormItem top="Группа">
                <Input type="number" name="group"
                    value={this.state.group}
                    onChange={this.handleInputChange}
                    placeholder="201-321" />
            </FormItem>
            <FormItem top="Живешь в общежитии">
                <Select value={this.state.value}
                onChange={this.handleInputChange}
                name = 'dorm'
                placeholder="Не выбран"
                options={[{value:1, label:'Да'},{value:2, label:'Нет'}]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps} />
                )}
                />
            </FormItem>
            <FormItem top="Номер студенческого">
                <Input type="number" name="stud"
                    value={this.state.stud}
                    onChange={this.handleInputChange}
                    placeholder="000000000" />
            </FormItem>
            <FormItem top="Номер профбилета(при наличии)">
                <Input type="number" name="prof"
                    value={this.state.prof}
                    onChange={this.handleInputChange}
                    placeholder="000000000" />
            </FormItem>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button type="submit" stretched size="l" mode="primary"
                disabled={!this.state.changed} onClick={this.props.go} data-to="home">Продолжить</Button>
                </Div>
          </FixedLayout>
          </Panel>   
    )
  }
}

export default AboutStudent;