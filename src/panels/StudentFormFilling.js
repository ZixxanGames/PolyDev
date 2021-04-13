import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Form from '../components/Form'


const StudentFormFilling = ({ id, go}) => {
  const[group, setGroup] = useState('');
  const[stud, setStud] = useState('');
  const[prof, setProf] = useState('');
  const[dorm, setDorm] = useState('');
  const[year, setYear] = useState('');
  const[changed, setChanged] = useState(false);

  if((group !== '')&&(stud !== '')&&(dorm !== '')&&(year !== '')){
    setChanged(true)
  };

  return(
   <Panel id={this.props.id}> 
      <PanelHeader>PolyApp</PanelHeader>
          <FormItem top="Курс">
                <Select name = "year" value={year}
                onChange={(e) => setYear(e.target.options.value)}
                placeholder="Не выбран" 
                options={[{value:1, label:'1 курс'},{value:2, label:'2 курс'},{value:3, label:'3 курс'},{value:4, label:'4 курс'}]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps} />
                )}
                />
            </FormItem>
            <FormItem top="Группа">
                <Input type="text" name="group" value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    placeholder="201-321" />
            </FormItem>
            <FormItem top="Живешь в общежитии">
                <Select value={dorm}
                onChange={(e) => setDorm(e.target.options.value)}
                name = 'dorm'
                placeholder="Не выбран"
                options={[{value:1, label:'Да'},{value:2, label:'Нет'}]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps} />
                )}
                />
            </FormItem>
            <FormItem top="Номер студенческого">
                <Input type="text" name="stud"
                    value={stud}
                    onChange={(e) => setStud(e.target.value)}
                    placeholder="000000000" />
            </FormItem>
            <FormItem top="Номер профбилета(при наличии)">
                <Input type="text" name="prof" 
                    value={prof}
                    onChange={(e) => setProf(e.target.value)}
                    placeholder="000000000" />
            </FormItem>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button type="submit" stretched size="l" mode="primary"
                disabled={!changed} onClick={this.props.go} data-to="acquaintance">Продолжить</Button>
                </Div>
          </FixedLayout>   
   </Panel>     
  )
}

StudentFormFilling.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};



export default StudentFormFilling;
