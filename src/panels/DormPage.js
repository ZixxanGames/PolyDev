import React, { Component } from 'react';

import {Panel}  from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import { Cell } from '@vkontakte/vkui/dist/components/Cell/Cell';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import '../css/PickDirections_v2.css';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import CardScroll from '@vkontakte/vkui/dist/components/CardScroll/CardScroll';
import { PanelHeaderBack } from '@vkontakte/vkui';

import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';


let dorms = require('../json/dorms.json');

class DormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    createMarkup = (text) => {
      return {__html: text};
    }
    goNextPageHandler = () => {
      this.props.setdorm(this.props.dorm +1 )
    }
    goBackPageHandler = () =>{
      this.props.setdorm(this.props.dorm -1 )
    }
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
                <Title level="2" weight="regular" style={{ marginBottom: 8, textTransform:'uppercase', textAlign:'center', opacity:.5, fontSize:'.85rem' }}>Общежитие № {this.props.dorm +1} </Title>
                <CardScroll size='m'>
              {
                dorms.Общежития[this.props.dorm].Фотографии.map((photo,index)=>{
                  return (
                    <Card key={index} style={{background:'transparent'}}>
                    <div style={{ paddingBottom: '66%', background:"url(" + photo + ')' ,backgroundPosition:'center', backgroundSize:'cover', width:'100%', borderRadius:'8px', height:'' }}>
                    </div>
                  </Card>
                  )
                })
              }
            </CardScroll>
            <Div style={{margin:'0 16px 8px 16px', lineHeight:'1.4rem'}}>
                <Text dangerouslySetInnerHTML={this.createMarkup(dorms.Общежития[this.props.dorm].Описание)} />
               </Div>
               <FixedLayout filled vertical="bottom">
                <Div style={{display: "flex", justifyContent: "space-between"}}>
                  <Button  style={{width: "40%"}} size="l"  disabled={this.props.dorm == 0} onClick={this.goBackPageHandler} data-to="choosed-directions-info">Назад</Button>
                  <Button  style={{width: "40%"}} size="l"  disabled={this.props.dorm == dorms.Общежития.length -1} onClick={this.goNextPageHandler} data-to="choosed-directions-info">Продолжить</Button>
                </Div>
              </FixedLayout>
            </Panel>
        )
    };
}

export default DormPage;