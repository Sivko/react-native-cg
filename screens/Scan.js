import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import SlotList from '../components/slot/SlotList';
import constSlots from '../requests/constSlots';
import { getFlightDeals } from '../requests/local/getSetFlights';

export default function Scan({ navigation }) {
  const [slot, setSlot] = useState([]);

  useEffect(() => {
    async function startFetch() {
      const resFlightDeals = await getFlightDeals()
      setSlot(resFlightDeals)
    }
    startFetch()
  })

  return (
    <>
      {slot.length === 0 && (<Text style={{padding: 20}}>Нет загруженных мест для сканирования</Text>)}
      {slot.length > 0 && (
        <View style={styles.container}>
          {/* <Text>test message</Text> */}
          <View style={styles.wrapperInput}>
            <TextInput
              style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, flex: 1, paddingVertical: 10 }}
              // onChangeText={handlderInput}
              keyboardType="numeric"
              value={JSON.stringify(slot)}
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
      )}
    </>
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
