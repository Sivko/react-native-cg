import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity
} from 'react-native';
import FlightCard from '../components/FlightCard/Index';
import { getFlights } from '../requests/flights';
import { getFlightDeals } from '../requests/local/getSetFlights';
import downloadFlightDeals from '../requests/downloadFlightDeals';

export default function DownloadFlights() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [checkedsId, setCheckedsId] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [flightLocalDeals, setFlightLocalDeals] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      // const resFlightDeals = await getFlightDeals()
      // if (!resFlightDeals?.length) {
      //   setFlightLocalDeals(false)
      // } else {
      //   setFlightLocalDeals(true)
      //   return true;
      // }
      const flightsData = await getFlights();
      if (flightsData.length) {
        const data = flightsData.map(e => ({
          id: e.id,
          name: e.attributes.name,
        }))
        setFlights(data);
      } else {
        alert("Нет рейсов для загрузки")
      }
      setRefreshing(false);
      setCheckedsId([]);
      startFetch()
    }, 2000);
  }, []);

  async function startFetch() {
    const resFlightDeals = await getFlightDeals()
    if (!resFlightDeals?.length) {
      setFlightLocalDeals(false)
    } else {
      setFlightLocalDeals(true)
      return true;
    }
    const flightsData = await getFlights();
    if (flightsData.length) {
      const data = flightsData.map(e => ({
        id: e.id,
        name: e.attributes.name,
      }))
      setFlights(data);
    }
  }

  useEffect(() => {
    startFetch()
  }, [])

  function hanlerChecked(id) {
    if (checkedsId.includes(id)) {
      setCheckedsId(prev => [...prev.filter(e => Number(e) !== Number(id))])
    } else {
      setCheckedsId(prev => [...prev, id])
    }
  }

  async function heandlerLoad() {
    setLoad(true)
    console.log("Сейчас начну загружать", checkedsId)
    await downloadFlightDeals(checkedsId)
    await startFetch()
    setLoad(false);
  }



  return (
    <>
      {!load && (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!flightLocalDeals && (
              <View style={styles.container}>
                {flights.map((e) => <FlightCard
                  {...e}
                  key={Math.random()}
                  setActive={() => hanlerChecked(e.id)}
                  active={checkedsId.includes(e.id)}
                />)}
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 20, marginTop: 20, backgroundColor: '#207aff', justifyContent: 'center', alignItems: 'center', }}
                  onPress={heandlerLoad}
                >
                  <Text style={{ color: '#fff' }}>Загрузить</Text>
                </TouchableOpacity>
              </View>
            )}
            {flightLocalDeals && (
              <View>
                <Text style={{ padding: 10 }}>Есть непросканированные объекты - перейдите в "Сканирование рейсов" </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView >)}
      {load && <Text style={{ padding: 10 }}>Load...</Text>}
    </>
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