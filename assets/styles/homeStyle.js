// styles.js
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../global/colors';

const res = Dimensions.get('window').height;

const styles = StyleSheet.create({
  home__list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: res * 0.02,
    gap: res * 0.01,
  },
  home__item: {
    backgroundColor: colors.primary,
    width: '32%',
    height: res * 0.2,
    justifyContent: 'space-between',
    padding: res * 0.02,
    borderRadius: res * 0.01,
  },
  home__item_title: {
    color: colors.light,
    fontWeight: '600',
    fontSize: res * 0.025,
  },
  home__item_type: {
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: res * 0.015,
    fontWeight: '600',
  },
  home__add_item: {
    position: 'absolute',
    bottom: res * 0.03,
    right: res * 0.03,
    zIndex: 1,
  },
  home__add_item_box: {
    width: res * 0.1,
    height: res * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text,
    borderRadius: res * 0.03,
  },
  home__add_item_icon: {
    fontSize: res * 0.05,
    color: colors.primary,
  },
});

export default styles;
