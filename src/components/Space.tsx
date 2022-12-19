import {View} from 'react-native';
import React from 'react';

interface SpaceProps {
  height?: number;
  width?: number;
}

const Space = (props: SpaceProps) => {
  return <View style={{height: props.height, width: props.width}}></View>;
};

export default Space;
