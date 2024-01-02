import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

import {storeData, getData} from '../storage';

export default function StoredPage({navigation}) {
  const [storedInfo, setStoredInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Work', value: 'work'},
    {label: 'Study', value: 'study'},
    {label: 'Exercise', value: 'exercise'},
    {label: 'Holiday', value: 'holiday'},
  ]);

  useEffect(() => {
    // Load stored information when the component mounts
    loadStoredInfo();
  }, []);

  const saveInfo = async () => {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = `${day}-${month}-${year}`;

    try {
      // Save information to storage
      const newItem = {
        textInputValue: inputValue,
        checkboxValue: checked,
        priority: checked ? 'High' : 'Low',
        savedDate: currentDate,
        typeValue: value,
      };

      const updatedInfo = [...storedInfo, newItem];

      await storeData('storedInfo', updatedInfo);
      setStoredInfo(updatedInfo);
    } catch (error) {
      console.error('Error saving information:', error);
      // Handle the error appropriately, e.g., show a user-friendly message
    }
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

  const handlePriority = () => {
    setChecked(!checked);
    setPriority(!checked ? 'High' : 'Low');
  };

  const deleteInfo = () => {
    setStoredInfo([]);
  };
  const handleBackToHome = () => {
    navigation.navigate('Home', {storedInfo});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={storedInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text>
            {`TextInput: ${item.textInputValue}, 
          Priority: ${item.priority}, 
          Date: ${item.savedDate},
          Value: ${item.typeValue},
          `}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter information"
        onChangeText={text => setInputValue(text)}
      />
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="High Priority"
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 2}}
        onPress={handlePriority}
        isChecked={checked}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Choose a filter'}
      />
      <Button title="Save" onPress={saveInfo} />
      <Button title="Clear" onPress={deleteInfo} />
      <Button title="Back to home" onPress={handleBackToHome} />
    </View>
  );
}

const styles = StyleSheet.create({});
