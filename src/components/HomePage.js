import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

//STYLE
import shareStyle from '../../assets/global/styleShare';
import homeStyle from '../../assets/styles/homeStyle';

//RESPONSIVE
const res = Dimensions.get('window').height;

//ICON
import Icon from 'react-native-vector-icons/MaterialIcons';

//IMAGE
import Logo from '../../assets/images/noteitLogo.png';

import CreateModal from '../Modals/CreateModal';
import {storeData, getData} from '../storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

export default function HomePage({navigation, route}) {
  //STATE
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [storedInfo, setStoredInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Work', value: 'work'},
    {label: 'Study', value: 'study'},
    {label: 'Exercise', value: 'exercise'},
    {label: 'Holiday', value: 'holiday'},
  ]);

  // const {noteInfo} = route.params || {storedInfo: []};

  useEffect(() => {
    loadStoredInfo();
  }, []);

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };
  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };
  const updateStoredInfo = newInfo => {
    setStoredInfo(newInfo);
  };

  const loadStoredInfo = async () => {
    try {
      // Load stored information from storage
      const info = await getData('storedInfo');

      if (info && Array.isArray(info)) {
        setStoredInfo(info);
      } else {
        // If the retrieved data is not an array, initialize storedInfo as an empty array
        setStoredInfo([]);
      }
    } catch (error) {
      console.error('Error loading information:', error);
      // Handle the error appropriately, e.g., show a user-friendly message
    }
  };
  const handleDeleteItem = index => {
    // Create a copy of the storedInfo array
    const updatedInfo = [...storedInfo];

    // Remove the item at the specified index
    updatedInfo.splice(index, 1);

    // Update the state with the new array
    setStoredInfo(updatedInfo);

    // Optionally, you can persist the updated array in storage
    storeData('storedInfo', updatedInfo);
  };
  const handleDone = index => {
    // Create a copy of the storedInfo array
    const updatedInfo = [...storedInfo];

    // Find the item at the specified index and update its status to true
    if (updatedInfo[index]) {
      updatedInfo[index].status = true;

      // Update the state with the new array
      setStoredInfo(updatedInfo);

      // Persist the updated array in storage
      storeData('storedInfo', updatedInfo);
    }
  };
  const sortItemsByPriority = () => {
    const sortedInfo = [...storedInfo];

    // Sort the array by priority (High first)
    sortedInfo.sort((a, b) => {
      if (a.priority === 'High' && b.priority !== 'High') {
        return -1;
      } else if (a.priority !== 'High' && b.priority === 'High') {
        return 1;
      } else {
        return 0;
      }
    });

    // Update the state with the sorted array
    setStoredInfo(sortedInfo);
  };

  storedInfo.map((item, index) => console.log(item.priority));

  return (
    <View style={shareStyle.container}>
      <View style={shareStyle.header__box}>
        <Text style={shareStyle.header__title}>NoteIt!</Text>
        <View>
          <TouchableOpacity onPress={sortItemsByPriority }>
            <Text style={homeStyle.modal__box_title}>Priotiry</Text>
            {/* <BouncyCheckbox
              size={25}
              fillColor="#FF9209"
              // unfillColor="tomato"
              // text="High Priority"
              style={[homeStyle.modal__checkbox]}
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              // onPress={sortItemsByPriority}
              // isChecked={checked}
            /> */}
          </TouchableOpacity>
          {/* <View
            style={[
              homeStyle.modal__box,
              homeStyle.one_line,
              {position: 'relative', zIndex: 100},
            ]}>
            <Text style={homeStyle.modal__box_title}>Type</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={'Choose a type'}
              style={[homeStyle.modal__dropdown]}
            />
          </View> */}
          <View>
            <Text style={homeStyle.modal__box_title}>Finished</Text>
            <BouncyCheckbox
              size={25}
              fillColor="#FF9209"
              // unfillColor="tomato"
              // text="High Priority"
              style={[homeStyle.modal__checkbox]}
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              // onPress={handlePriority}
              // isChecked={checked}
            />
          </View>
        </View>
      </View>
      <ScrollView style={shareStyle.content}>
        <View style={[homeStyle.home__list_item]}>
          {storedInfo.map((note, index) => (
            <View
              onLongPress={() => handleDeleteItem(index)}
              onPress={() => handleDone(index)}
              key={index}
              style={homeStyle.home__item}>
              {note.status ? (
                <TouchableOpacity
                  onPress={() => handleDone(index)}
                  style={[homeStyle.home__item_true]}>
                  <Text style={homeStyle.home__item_title}>
                    {note.titleInputValue}
                  </Text>
                  <Text style={homeStyle.home__item_date}>
                    {note.savedDate}
                  </Text>
                  <Text style={homeStyle.home__item_type}>
                    {note.typeValue}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={[homeStyle.home__item_false]}>
                  <Text style={homeStyle.home__item_title}>
                    {note.titleInputValue}
                  </Text>
                  <Text style={homeStyle.home__item_date}>
                    {note.savedDate}
                  </Text>
                  <Text style={homeStyle.home__item_type}>
                    {note.typeValue}
                  </Text>
                </View>
              )}
            </View>
          ))}
          <View></View>
        </View>
      </ScrollView>
      <View style={homeStyle.home__add_item}>
        <TouchableOpacity
          onPress={openCreateModal}
          // onPress={() => navigation.navigate('Storage')}
          style={homeStyle.home__add_item_box}>
          <Text style={homeStyle.home__add_item_icon}>+</Text>
          {/* <Icon name="home" style={homeStyle.home__add_item_icon} /> */}
        </TouchableOpacity>
      </View>
      <ScrollView style={shareStyle.content}></ScrollView>

      {/* MODAL */}
      <CreateModal
        openModal={createModalVisible}
        closeModal={closeCreateModal}
        updateStoredInfo={updateStoredInfo}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
