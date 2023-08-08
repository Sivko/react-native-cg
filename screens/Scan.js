import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import SlotList from '../components/slot/SlotList';
import constSlots from '../requests/constSlots';

export default function Scan({ navigation }) {
  const [slot, setSlot] = useState(constSlots());
  // const [input, setInput] = useState('');

  // function handlderInput(e) {
  //   setInput(e.trim())
  //   const findElement = slot.findIndex(item => item.attributes.name === e);
  //   if (findElement !== -1) {
  //     let updateElement = slot[findElement]
  //     updateElement.status = 'find'
  //     console.log(JSON.stringify(updateElement))
  //     setInput('')
  //     setSlot(prev => [updateElement, ...prev.filter((e, index) => index !== findElement)]);
  //   }
  //   console.log(findElement)
  // }
  return (
    <View style={styles.container}>
      {/* <Text>test message</Text> */}
      <View style={styles.wrapperInput}>
        <TextInput
          style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, flex: 1, paddingVertical: 10 }}
          // onChangeText={handlderInput}
          keyboardType="numeric"
          // value={input.toString()}
          placeholder="Штрих-код" />
        <Button style={{ flex: 1 }} title="Добавить" />
      </View>
      <View style={{ flexBasis: '80%' }}>
        <SlotList
          data={slot}
          setData={setSlot}
          navigation={navigation}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapperInput: {
    flex: 1,
    flexBasis: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    gap: 20
  },
  containerSafe: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
