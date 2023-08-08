import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import axios from 'axios';
import config from "../../requests/config";
import { LoginContext } from "../../Helper/Context";

function Login() {
  // const URL = process.env['URL'];
 
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const [email, setEmail] = useState('ddmitrova@gmail.com');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    if (email && password && submit) {
      setSubmit(false)
    }
  }, [email, password])

  const auth = async () => {
    setSubmit(true);
    setErrors(() => {
      let err = [];
      if (!email)
        err.push("Укажите логин")
      if (!password)
        err.push("Укажите пароль")
      return err
    })
    if (email && password) {
      try {
        const res = await axios.get(`https://app.salesap.ru/api/v1/users?filter[email]=${encodeURI(email)}`, config);
        console.log(`https://app.salesap.ru/api/v1/users?filter[email]=${encodeURI(email)}`)
        // console.log(res.data)
        if (res.data.data[0]?.attributes.email !== email) {
          await setErrors(["Email не найден"])
          // await setErrors([JSON.stringify(res)])
          return;
        }
        if ('123' !== password)
        {
          await setErrors(["Неверный пароль"])
          return;
        }
        setLoggedIn(true)
      }
      catch (error) {
        setErrors([JSON.stringify(error)]);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require('../../assets/logo-v2.png')}
      />
      <TextInput style={styles.input}
        onChangeText={(e) => setEmail(e.toLowerCase())}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="username"
        value={email}
        placeholder="Email"
      />
      <TextInput style={styles.input} onChangeText={(e) => setPassword(e)}
        placeholder={'Enter password'}
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry={true}
        textContentType={'password'}
      />
      {/* <Text>{errors.length}</Text> */}
      {errors.map((e, index) => {
        return <Text key={index} style={styles.errors}>{e}</Text>
      })}
      <Button title="Войти" onPress={auth} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '90%',
    marginHorizontal: '5%',
  },
  input: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%'
  },
  errors: {
    color: '#fc2847'
  }
})

export default Login;