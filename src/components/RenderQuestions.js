import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import { Icon24ArticleOutline } from '@vkontakte/icons';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import jsonData from '../json/Questions.json';

class renderQusstions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    let json = jsonData;
    this.setState({ data: json });
  }
  onClick = (unit) => (event) => {
    this.props.updateQuestion(unit);
    this.props.go(event);
  }
  render() {
    return (
      <Div>
        {this.props.category == 'dorms' && this.state.data.length !== 0 &&
          this.state.data.dorms.map((unit, index) => {
            return (
              <SimpleCell onClick={this.onClick(unit)} data-to="instruction" before={<Icon24ArticleOutline />} key={index}>{unit.question}</SimpleCell>
            )
          }
          )
        }
        {this.props.category == 'study' && this.state.data.length !== 0 &&
          this.state.data.study.map((unit, index) => {
            return (
              <SimpleCell onClick={this.onClick(unit)} data-to="instruction" before={<Icon24ArticleOutline />} key={index}>{unit.question}</SimpleCell>
            )
          }
          )
        }
        {this.props.category == 'buildings' && this.state.data.length !== 0 &&
          this.state.data.buildings.map((unit, index) => {
            return (
              <SimpleCell onClick={this.onClick(unit)} data-to="instruction" before={<Icon24ArticleOutline />} key={index}>{unit.question}</SimpleCell>
            )
          }
          )
        }
        {this.props.category == 'PD' && this.state.data.length !== 0 &&
          this.state.data.pd.map((unit, index) => {
            return (
              <SimpleCell onClick={this.onClick(unit)} data-to="instruction" before={<Icon24ArticleOutline />} key={index}>{unit.question}</SimpleCell>
            )
          }
          )
        }
      </Div>
    )
  }
}

renderQusstions.propTypes = {
  category: PropTypes.string.isRequired,
};

export default renderQusstions;