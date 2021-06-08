import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { PanelHeaderBack } from '@vkontakte/vkui';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import {Cell} from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import CardScroll from '@vkontakte/vkui/dist/components/CardScroll/CardScroll';
import { Icon16New } from '@vkontakte/icons';
import ReactMarkdown from 'react-markdown';

const dormsInfo = require('../json/dorms.json'); 
import '../css/dorms.css';

class Dorms extends Component {
  constructor(props) {
      super(props);
      this.state = {
          interestedDorm: ''
      }
    }
    handeDormClick = (id) =>(event)=> {
      this.props.setdorm(id);
      this.props.go(event)
    }

  render(){

    return(
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to='choosed-directions-info' />}>PolyApp</PanelHeader>
        <Group>
          <Title level="2" weight="regular" style={{ marginBottom: 8, textTransform:'uppercase', textAlign:'center', opacity:.5, fontSize:'.85rem' }}>Общежития</Title>
          <Text style={{margin:'0 16px 8px 16px', lineHeight:'1.4rem'}}>
            В Московском Политехе студентам предоставляется место в общежитии, если они проживают за пределами трассы А107 
          </Text>
          <Text style={{margin:'0 16px', lineHeight:'1.4rem'}}>
            Выбор общежития предоставляется в приоритетном порядке: 
          </Text>
          <Text style={{margin:'0 16px',lineHeight:'1.4rem'}}>
            1. Студенты со средним баллом 85+ 
          </Text>
          <Text style={{margin:'0 16px', lineHeight:'1.4rem'}}>
            2. Студенты поступившие на бюджет 
          </Text>
          <Text style={{margin:'0 16px', lineHeight:'1.4rem'}}>
            3. Студенты платной формы обучения со средним баллом 85+ 
          </Text>
          <Text style={{margin:'0 16px', lineHeight:'1.4rem'}}>
            4. Студенты платной формы обучения 
          </Text>
        </Group>
        <Group description="Наши общежития" style={{marginTop:8}}>
        
          <CardScroll size="m">
              {
                dormsInfo.Общежития.map((dorm,index)=>{
                  return (
                    <Card  key={index} style={{background:'transparent'}} onClick={this.handeDormClick(index)} data-to='dorm-page'>
                    <div style={{ paddingBottom: '66%', background:"url(" + dorm.Фотографии[0]+ (')') ,backgroundPosition:'center', backgroundSize:'cover', width:'100%', borderRadius:'8px', height:'' }}>
                    </div>
                    <div style={{display: 'flex', justifyContent: '', alignItems: 'center', width: '100%', flexDirection:'column'}}>
                      <Text style={{textAlign:'left', width: '100%'}}>Общежитие {dorm.Номер}</Text>
                      <div style={{display:"flex", alignItems: 'center', flexDirection:"row", width: '100%'}}>
                      <Text style={{textAlign:'left', opacity:.5, fontSize: '.85rem'}}> {dorm['Адрес']} </Text> <Icon16New fill={dorm.Цвет} style={{padding:0}}/>
                      <Text style={{textAlign:'left', opacity:.5, paddingTop: '0!important'}} >{dorm['Метро']}</Text>
                      </div>
                      
                    </div>
                  </Card>
                  )
                })
              }
            </CardScroll>
        </Group>
      </Panel>
    )
  }
}

export default Dorms;





