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
    gap: res * 0.02,
  },
  home__item: {
    width: '48%',
    // height: res * 0.23,
    justifyContent: 'space-between',
  },
  home__item_true: {
    backgroundColor: colors.primary,
    padding: res * 0.015,
    borderRadius: res * 0.01,
  },
  home__item_false: {
    backgroundColor: colors.doneItem,
    padding: res * 0.02,
    borderRadius: res * 0.01,
  },
  home__item_title_container: {
    backgroundColor: colors.light,
    borderRadius: res * 0.005,
    padding: res * 0.005,
  },
  home__item_title: {
    color: colors.text,
    fontWeight: '600',
    fontSize: res * 0.03,
    width: '100%',
    height: res * 0.18,
  },
  home__item_status_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  home__item_date: {
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: res * 0.02,
    fontWeight: '600',
    marginTop: res * 0.02,
  },
  home__item_type: {
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: res * 0.015,
    fontWeight: '600',
    marginTop: res * 0.02,
    backgroundColor: colors.text,
    textAlign: 'center',
    paddingVertical: res * 0.005,
    paddingHorizontal: res * 0.01,
    color: colors.light,
  },
  home__add_item: {
    position: 'absolute',
    bottom: res * 0.01,
    right: res * 0.01,
    zIndex: 1,
  },
  home__add_item_box: {
    width: res * 0.1,
    height: res * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text,
    borderRadius: res * 0.015,
  },
  home__add_item_icon: {
    fontSize: res * 0.05,
    color: colors.light,
  },

  home__item_done: {
    // Apply styles for the entire item when status is true
    opacity: 0.3, // Adjust the opacity as needed for a "blur" effect
    backgroundColor: colors.text,
  },

  home__item_title_done: {
    // Apply styles for the title when status is true
    textDecorationLine: 'line-through', // Add strikethrough or other styles
  },
});

export default styles;
