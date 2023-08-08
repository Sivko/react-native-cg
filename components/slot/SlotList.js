import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';
import defaultSlot from '../../requests/local/defaultSlot';
import { fields } from '../../requests/config';

export default function SlotList({ data, setData, navigation, save}) {
  dataList = data.map((e, index) => ({ ...e, index: index + 1 }))

  const deleteItem = (slot) => {
    let newData = [...data];
    newData.splice(slot.index, 1)
    setData(newData);
  };

  const renderItem = (el) => (
    <TouchableHighlight
      // onPress={onPress}
      onPress={(() => { navigation.push('Место', { data, setData, index: el.item.index, navigation }) })}
      style={styles.rowFront}
      underlayColor={'#fff'}
    >
      <View style={styles.card}>
        <View style={styles.index}><Text>{el.item.index}</Text></View>
        <View style={styles.image}>
          <AntDesign name="picture" size={70} color="#d3d3d3" />
        </View>
        <View style={styles.info}>
          <Text>Название: {el.item?.data?.attributes?.name}</Text>
          <Text>Габариты: {el.item?.data?.attributes?.customs[fields["length"]] ?? 'Д'} х {el.item?.data?.attributes?.customs[fields["width"]] ?? 'Ш'} х {el.item?.data?.attributes?.customs[fields["height"]] ?? 'В'}</Text>
          <Text>Вес: {el.item?.data?.attributes?.customs[fields["weight"]] ?? '_'} кг</Text>
          <Text>Транспорт: {el.item?.data?.attributes?.customs[fields["transport"]]}</Text>
          <Text>ШК: {el.item?.data?.attributes?.customs[fields["barcode"]]}</Text>
          {el.item?.status === 'find' && <Text>Статус: <Text style={{ color: 'green' }}>Найдено</Text></Text>}
          {el.item?.status === 'notFind' && <Text>Статус: <Text style={{ color: 'red' }}>Ошибка</Text></Text>}
        </View>
      </View>
    </TouchableHighlight >
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem(data)}
      >
        <AntDesign name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexBasis: '80%' }}>
        <SwipeListView
          data={dataList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          // leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
      <View style={{ flexDirection: 'row', flexBasis: '15%' }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: '#207aff', justifyContent: 'center', alignItems: 'center', }}
          onPress={()=>{
            save();
            navigation.goBack();
          }}
        >
          <Text style={{ color: '#fff' }}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#d3d3d3', paddingHorizontal: 10 }}
          onPress={() => {
            setData((prev) => {
              navigation.push('Место', { data: [...prev, defaultSlot], setData, index: prev.length + 1, navigation });
              return [...prev, defaultSlot]
            })
          }}
        >
          <Text>Добавить место (добавлено: {data.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexBasis: '90%',
    justifyContent: 'space-between'
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },

  card: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 112,
    alignItems: 'center',
    borderBottomColor: '#f1f1f1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
  },
  index: {
    flexBasis: '10%',
    alignItems: 'center',
  },
  image: {
    flexBasis: '40%',
  },
  info: {
    flexBasis: '50%',
  }
});