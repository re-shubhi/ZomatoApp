import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  title: string;
  count: number;
  isActive?: boolean;
}

const Counter: FC<Props> = ({title, count}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{count}</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
