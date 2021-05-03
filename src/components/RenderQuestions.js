import React, {Component} from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import { Icon24ArticleOutline } from '@vkontakte/icons';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import data from '../json/Questions.json';

var category = localStorage.getItem('category');

class renderQusstions extends Component {
  render () {
    return (
            <SimpleCell before={<Icon24ArticleOutline/>}>
                Лёша гей
            </SimpleCell>
    )
  }
}
export default renderQusstions;