import { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Button } from 'react-native';
import { getLogsData, removeLogsData, setLogsData } from '../requests/local/getSetLogs';
import { removeFlightDeals } from '../requests/local/getSetFlights';
import { LoginContext } from '../Helper/Context';

function Option() {
  [logs, setLogs] = useState([])
  const { loggedIn, setLoggedIn } = useContext(LoginContext)

  useEffect(() => {
    async function fetching() {
      const res = await getLogsData();
      setLogs(res);
    }
    fetching();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Button title="Очистить Рейсы" onPress={() => { removeFlightDeals(); }} />
          <Button title="Очистить Логи" onPress={() => { removeLogsData([]); setLogs([]) }} />
          <Button title="Выйти" onPress={() => {setLoggedIn(false)}} />
          <Text>Логи:</Text>
          <Text>{JSON.stringify(logs)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
})

export default Option;