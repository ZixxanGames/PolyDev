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
import Form from '../components/Form'

const StudentFormFilling = ({ id, go }) => {
  return(
   <Panel id={id}> 
      <PanelHeader>PolyApp</PanelHeader>
        <Form/>    
   </Panel>     
  )
}

StudentFormFilling.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};



export default StudentFormFilling;
