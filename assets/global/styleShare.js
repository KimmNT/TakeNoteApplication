// styles.js

import {StyleSheet, Dimensions} from 'react-native';
import colors from './colors';

//RESPONSINVE
const res = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: res * 0.05,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: res * 0.02,
  },
  header__box: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: res * 0.02,
  },
  header__title: {
    // color: res * 0.1,
    fontSize: res * 0.05,
    fontWeight: '900',
  },
});

export default styles;
