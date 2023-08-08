import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Button } from 'react-native';
import { getLogsData, removeLogsData, setLogsData } from '../requests/local/getSetLogs';

function Option() {
  [logs, setLogs] = useState([])

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
          <Text>Логи:</Text>
          <Text>{JSON.stringify(logs)}</Text>
          <Button title="Очистить" onPress={()=>{removeLogsData([]); setLogs([])}} />
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