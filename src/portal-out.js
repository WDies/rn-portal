import {
  View,
  DeviceEventEmitter,
  StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import {
  ON_CHANGE_PREFIX,
  ON_REMOVE_PREFIX
} from './consts';

// 传送门出口组件
class PortalOut extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    const { id } = props;
    if (!id) {
      console.error('接收门需要指定id参数');
    }
    this.state = {
      portals: [
        // {
        //   to: 'string',
        //   uuid: 'string',
        //   visible: Boolean,
        //   children: 'ReactChildren',
        // },
      ]
    };
    this.subscriptionSend = DeviceEventEmitter.addListener(`${ON_CHANGE_PREFIX}${id}`, uuidReactChildren => {
      const { portals } = this.state;
      const { uuid, children, visible } = uuidReactChildren;
      if (portals.find(protal => protal.uuid === uuid)) {
        portals.forEach((protal, index) => {
          if (protal.uuid === uuid) {
            portals[index].children = children;
            portals[index].visible = visible;
          }
        });
        this.setState(portals);
      } else {
        portals.push(uuidReactChildren);
        this.setState({ portals });
      }
    });
    this.subscriptionRemove = DeviceEventEmitter.addListener(`${ON_REMOVE_PREFIX}${id}`, uuid => {
      const { portals } = this.state;
      this.setState({
        portals: portals.filter(portal => portal.uuid !== uuid)
      });
    });
  }

  componentWillUnmount() {
    this.subscriptionSend.remove();
    this.subscriptionRemove.remove();
  }

  render() {
    const { portals, style } = this.state;
    const data = portals.filter(portal => portal.visible);
    return (
      <View style={[data.length > 0 ? styles.show : styles.hide, style]}>
        {data.map(item => item.children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  show: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  hide: {
    position: 'absolute',
    height: 0,
    width: 0
  }
});

export default PortalOut;
