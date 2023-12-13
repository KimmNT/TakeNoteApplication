// styles.js
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../global/colors';

const res = Dimensions.get('window').height;

const styles = StyleSheet.create({
  home__list_item: {
    position: 'absolute',
    bottom: res * 0.05,
    right: res * 0.05,
    zIndex: 1,
  },
  home__add_item_box: {
    width: res * 0.1,
    height: res * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: (res * 0.1) / 2,
  },
  home__add_item_icon: {
    fontSize: res * 0.04,
    color: colors.text,
  },
});

export default styles;
