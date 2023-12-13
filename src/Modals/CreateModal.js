import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import createModalStyle from '../../assets/styles/createModalStyle';

const CreateModal = props => {
  const {openModal, closeModal} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={createModalStyle.modal__width}>
        <View style={createModalStyle.modalContent}>
          <Text>CreateModal</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CreateModal;
