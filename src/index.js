import { DeviceEventEmitter } from 'react-native';
import { Component } from 'react';
import PortalOut from './portal-out';
import {
  ON_CHANGE_PREFIX,
  ON_REMOVE_PREFIX
} from './consts';

let uuid = 0;

// 接收传送门
const sendPortal = props => {
  DeviceEventEmitter.emit(`${ON_CHANGE_PREFIX}${props.to}`, props);
};

// 移除传送门
const rmPortal = (to, id) => {
  DeviceEventEmitter.emit(`${ON_REMOVE_PREFIX}${to}`, id);
};


// 传送门-入口组件
class Portal extends Component {
  constructor(props) {
    super(props);
    const { to } = props;
    if (!to) {
      console.error('传送门需要指定to参数，用于传送到与接收门id一致');
    }
    uuid += 1;
    this.uuid = uuid;
  }
  componentDidMount() {
    this.send(this.props);
  }
  componentWillUpdate(nextProps) {
    this.send(nextProps);
  }
  componentWillUnmount() {
    rmPortal(this.props.to, this.uuid);
  }
  send(props) {
    sendPortal({
      ...props,
      uuid: this.uuid
    });
  }
  render() {
    return null;
  }
}

export default {
  Portal,
  PortalOut
};
