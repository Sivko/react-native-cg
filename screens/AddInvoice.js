import { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from "react-native";
import moment from 'moment';
import SlotList from '../components/slot/SlotList';
import { setInvocesData, setInvocesToUploadData } from '../requests/local/getSetInvoces';
import defaultSlot from '../requests/local/defaultSlot';
import defaultInvoice from '../requests/local/defaultInvoce';
import { getInvoceInfo } from '../requests/local/getSetInfoInvoce';
import { fields } from '../requests/config';

function AddInvoice({ navigation }) {
  const [name, setName] = useState('')
  const invoice = defaultInvoice();
  const [slots, setSlots] = useState([defaultSlot]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function startFetch() {
      const res = await getInvoceInfo();
      setInfo(res);
      setName(`КВ от ${moment().format('DD.MM.YYYY hh:mm')}, ${res.clientCode}, ${res.countBox} кор.`);
    }
    startFetch()
  }, [])

  function hendlerSave() {
    invoice.data.attributes.name = name;
    invoice.data.attributes.customs[fields['clientCode']] = info.clientCode;
    setInvocesData(invoice);
    slots.map(e => {
      let tmpSlot = e
      tmpSlot.data.attributes.customs[fields['clientCode']] = info.clientCode;
      return tmpSlot
    })
    setInvocesToUploadData({ invoice, slots });
  }

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={{ fontSize: 10, opacity: 0.2 }}>Название:</Text>
        <TextInput style={styles.input}
          onChangeText={(e) => setName(e)}
          value={name}
        />
      </View>
      <SlotList
        data={slots}
        setData={setSlots}
        navigation={navigation}
        save={hendlerSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height: '100%'
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 10,
    backgroundColor: '#f3f3f3',
  },
  input: {
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  errors: {
    color: '#fc2847'
  }
})

export default AddInvoice;