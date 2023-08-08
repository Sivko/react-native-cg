import { View } from 'react-native';
import InvoceList from '../components/Invoces/InvoceList';

function Invoices() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <InvoceList />
    </View>
  );
}

export default Invoices;