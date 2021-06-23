import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import InputInfo from "../components/InputInfo";
export const navigationRef = React.createRef();
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <InputInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'roboto'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
