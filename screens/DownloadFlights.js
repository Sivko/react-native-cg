import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity
} from 'react-native';
import FlightCard from '../components/FlightCard/Index';
import { getFlights } from '../requests/flights';

export default function DownloadFlights() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [checkedsId, setCheckedsId] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      const flightsData = await getFlights();
      if (flightsData.length) {
        const data = flightsData.map(e => ({
          id: e.id,
          name: e.attributes.name,
        }))
        setFlights(data);
      } else {
        alert ("Нет рейсов для загрузки")
      }
      setRefreshing(false);
      setCheckedsId([]);
    }, 2000);
  }, []);

  useEffect(() => {
    async function startFetch() {
      const flightsData = await getFlights();
      if (flightsData.length) {
        const data = flightsData.map(e => ({
          id: e.id,
          name: e.attributes.name,
        }))
        setFlights(data);
      }
    }
    startFetch()
  }, [])

  function hanlerChecked(id) {
    if (checkedsId.includes(id)) {
      setCheckedsId(prev => [...prev.filter(e => Number(e) !== Number(id))])
    } else {
      setCheckedsId(prev => [...prev, id])
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          {flights.map((e) => <FlightCard
            {...e}
            key={Math.random()}
            setActive={() => hanlerChecked(e.id)}
            active={checkedsId.includes(e.id)}
          />)}
          <TouchableOpacity
            style={{ flex: 1, paddingVertical: 20, marginTop: 20, backgroundColor: '#207aff', justifyContent: 'center', alignItems: 'center', }}
          >
            <Text style={{ color: '#fff' }}>Загрузить</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 55,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});