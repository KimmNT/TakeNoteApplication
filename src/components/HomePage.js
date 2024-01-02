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

export default function HomePage({navigation, route}) {
  //STATE
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [storedInfo, setStoredInfo] = useState([]);

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

  return (
    <View style={shareStyle.container}>
      <View style={shareStyle.header__box}>
        <Text style={shareStyle.header__title}>NoteIt!</Text>
      </View>
      <ScrollView style={shareStyle.content}>
        <View style={[homeStyle.home__list_item]}>
          {storedInfo.map((note, index) => (
            <TouchableOpacity
              onPress={() => handleDeleteItem(index)}
              key={index}
              style={homeStyle.home__item}>
              <Text style={homeStyle.home__item_title}>
                {note.titleInputValue}
              </Text>
              <Text style={homeStyle.home__item_type}>{note.typeValue}</Text>
              {/* <Text style={homeStyle.home__item_date}>{note.savedDate}</Text> */}
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
