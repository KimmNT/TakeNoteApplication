import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import modalStyle from '../../assets/styles/createModalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

import {storeData, getData} from '../storage';

const CreateModal = props => {
  const {openModal, closeModal, updateStoredInfo} = props;
  const [storedInfo, setStoredInfo] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Work', value: 'work'},
    {label: 'Study', value: 'study'},
    {label: 'Exercise', value: 'exercise'},
    {label: 'Holiday', value: 'holiday'},
    {label: 'Hobbies', value: 'hobbies'},
  ]);

  const saveInfo = async () => {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const currentDate = `${day}-${month}`;
    try {
      // Load stored information from storage
      const info = await getData('storedInfo');

      if (info && Array.isArray(info)) {
        setStoredInfo(info);
      } else {
        setStoredInfo([]);
      }

      // Save information to storage
      const newItem = {
        titleInputValue: titleValue,
        checkboxValue: checked,
        priority: checked ? 'High' : 'Low',
        savedDate: currentDate,
        typeValue: value,
        status: false,
      };

      const updatedInfo = [...storedInfo, newItem];

      await storeData('storedInfo', updatedInfo);
      setStoredInfo(updatedInfo);
      // Call the callback function to update storedInfo in HomePage
      updateStoredInfo(updatedInfo);
      // Close modal
      closeModal();
    } catch (error) {
      console.error('Error saving information:', error);
      // Handle the error appropriately, e.g., show a user-friendly message
    }
  };

  const handlePriority = () => {
    setChecked(!checked);
    setPriority(!checked ? 'High' : 'Low');
  };

  return (
    <Modal animationType="fade" transparent={true} visible={openModal}>
      <View style={modalStyle.modal__container}>
        <View style={modalStyle.modal__width}>
          <View style={modalStyle.modal__content}>
            <View style={modalStyle.modal__box_container}>
              <Text style={modalStyle.modal__box_title}>Title</Text>
              <View style={modalStyle.modal__box}>
                <TextInput
                  style={modalStyle.modal__box_input}
                  placeholder="Title of this note"
                  onChangeText={text => setTitleValue(text)}
                />
              </View>
            </View>
            <View
              style={[
                modalStyle.modal__box,
                modalStyle.one_line,
                {position: 'relative', zIndex: 100},
              ]}>
              <Text style={modalStyle.modal__box_title}>Type</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Choose a type'}
                style={[modalStyle.modal__dropdown]}
              />
            </View>
            <View style={[modalStyle.modal__box, modalStyle.one_line]}>
              <Text style={modalStyle.modal__box_title}>Priotiry</Text>
              <BouncyCheckbox
                size={25}
                fillColor="black"
                // unfillColor="tomato"
                // text="High Priority"
                style={[modalStyle.modal__checkbox]}
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                onPress={handlePriority}
                isChecked={checked}
              />
            </View>
            <View style={modalStyle.modal__create_container}>
              <TouchableOpacity
                onPress={saveInfo}
                style={modalStyle.modal__create_btn}>
                <Text style={modalStyle.modal__create_icon}>submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={closeModal}
            style={modalStyle.modal__close_btn}>
            <Text style={modalStyle.modal__close_icon}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CreateModal;
