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
  Alert,
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
    loadStoredInfo();
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
    Alert.alert('Deleting', 'Do you want to delete this note ?', [
      {text: 'Cancel', onPress: () => console.log('Cancel deleting')},
      {
        text: 'OK',
        onPress: async () => {
          // Create a copy of the storedInfo array
          const updatedInfo = [...storedInfo];

          // Remove the item at the specified index
          updatedInfo.splice(index, 1);

          // Update the state with the new array
          setStoredInfo(updatedInfo);

          // Persist the updated array in storage
          await storeData('storedInfo', updatedInfo);
        },
      },
    ]);
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

  return (
    <View style={shareStyle.container}>
      <View style={shareStyle.header__box}>
        <Text style={shareStyle.header__title}>NoteIt!</Text>
      </View>
      <ScrollView style={shareStyle.content}>
        <View style={[homeStyle.home__list_item]}>
          {storedInfo.map((note, index) => (
            <TouchableOpacity
              onLongPress={() => handleDeleteItem(index)}
              onPress={() => handleDone(index)}
              key={index}
              style={[homeStyle.home__item]}>
              <View
                style={[
                  homeStyle.home__item_true,
                  note.status && homeStyle.home__item_done, // Apply specific styles when status is true
                ]}>
                <View style={homeStyle.home__item_title_container}>
                  <Text
                    style={[
                      homeStyle.home__item_title,
                      note.status && homeStyle.home__item_title_done, // Apply specific styles for title when status is true
                    ]}>
                    {note.titleInputValue}
                  </Text>
                </View>
                <View style={homeStyle.home__item_status_container}>
                  <Text style={homeStyle.home__item_date}>
                    {note.savedDate}
                  </Text>
                  <Text style={homeStyle.home__item_type}>
                    {note.typeValue}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
