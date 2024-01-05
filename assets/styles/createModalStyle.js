import {StyleSheet, Dimensions} from 'react-native';
import colors from '../global/colors';

const res = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal__container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(33,33,33,0.95)',
    paddingVertical: res * 0.22,
    paddingHorizontal: res * 0.06,
  },
  modal__width: {
    backgroundColor: colors.light,
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: res * 0.01,
    flexDirection: 'column',
    shadowColor: colors.light,
    shadowOffset: {
      width: -5,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // justifyContent: 'space-between',
  },
  modal__close_btn: {
    position: 'absolute',
    top: res * -0.015,
    right: res * -0.015,
    width: res * 0.05,
    height: res * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text,
    borderRadius: res * 0.01,
  },
  modal__close_icon: {
    fontSize: res * 0.03,
    color: '#FFF',
  },
  modal__content: {
    marginTop: res * 0.02,
    paddingHorizontal: res * 0.02,
    width: '100%',
    height: '100%',
    gap: res * 0.03,
  },
  modal__box_container: {
    padding: res * 0.01,
    backgroundColor: colors.light,
    width: '100%',
  },
  modal__box: {
    borderColor: colors.text,
    borderWidth: 1,
    paddingVertical: res * 0.02,
    paddingHorizontal: res * 0.01,
    borderRadius: res * 0.01,
  },
  one_line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: res * 0.03,
    backgroundColor: colors.light,
    borderWidth: 0,
    width: '80%',
  },
  modal__box_title: {
    fontSize: res * 0.023,
    color: colors.text,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: res * 0.01,
  },
  modal__box_input: {
    marginTop: res * 0.01,
    color: colors.text,
    fontSize: res * 0.02,
  },
  modal__dropdown: {
    // color: colors.light,
  },
  modal__checkbox: {},
  modal__create_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal__create_btn: {
    width: res * 0.2,
    height: res * 0.07,
    borderRadius: res * 0.005,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal__create_icon: {
    color: colors.text,
    textTransform: 'uppercase',
    fontSize: res * 0.02,
    fontWeight: '600',
  },
});

export default styles;
