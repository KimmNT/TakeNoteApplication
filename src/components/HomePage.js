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
} from 'react-native';
import React, {useState} from 'react';

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

export default function HomePage({navigation}) {
  //STATE
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const openCreateModal = () => {
    setCreateModalVisible(true);
    console.log(createModalVisible);
  };
  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  return (
    <View style={shareStyle.container}>
      <View style={shareStyle.header__box}>
        <Text style={shareStyle.header__title}>NoteIt!</Text>
      </View>
      <View style={homeStyle.home__list_item}>
        <TouchableOpacity
          onPress={openCreateModal}
          style={homeStyle.home__add_item_box}>
          <Icon name="library-add" style={homeStyle.home__add_item_icon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={shareStyle.content}></ScrollView>

      {/* MODAL */}
      <CreateModal openModal={openCreateModal} closeModal={closeCreateModal} />
    </View>
  );
}

const styles = StyleSheet.create({});
