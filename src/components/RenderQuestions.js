import React, {Component} from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import { Icon24ArticleOutline } from '@vkontakte/icons';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';

import data from '../json/Questions.json';

class renderQusstions extends Component {
    constructor (props) {
        super(props);
        this.state = {
            category: '',
        }
      }
      componentDidMount = () => {
        const category = localStorage.getItem('category');
        this.setState({ category});
      }
  render () {
    return (
        <Div>
            <SimpleCell before={<Icon24ArticleOutline/>}>
                Вопрос 1
            </SimpleCell>
            <SimpleCell before={<Icon24ArticleOutline/>}>
                Вопрос 1
            </SimpleCell>
            <SimpleCell before={<Icon24ArticleOutline/>}>
                Вопрос 1
            </SimpleCell>
        </Div>
    )
  }
}
export default renderQusstions;