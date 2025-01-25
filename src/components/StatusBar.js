import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {Easing, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import { BudgetContext } from '../context/BudgetContext';

const StatusBar = (props) => {
  const {progress} = props;
  const {status} = useContext(BudgetContext);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress}%`, {
        duration: 500,
        easing: Easing.linear,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Budget | ${status.budget}</Text>
      <View style={styles.statusBarContainer}>
        <Animated.View style={[styles.statusBar, animatedStyle]}>
          <Text></Text>
        </Animated.View>
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  statusBar: {
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderColor: 'black',
    borderWidth: 1,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusBar;
