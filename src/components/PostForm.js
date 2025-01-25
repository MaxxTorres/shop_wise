import React, {useState, useEffect} from 'react'
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native'
import Checkbox from '../components/Checkbox'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const PostForm = ({onSubmit, inititalValues = {item: '', price: 0,
                        store: '', purpose: 'personal', purchased: false
}}) => {
  const [item, setItem] = useState(inititalValues.item)
  const [price, setPrice] = useState(inititalValues.price)
  const [store, setStore] = useState(inititalValues.store)
  const [purpose, setPurpose] = useState(inititalValues.purpose)
  const [purchased, setPurchased] = useState(inititalValues.purchased)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (purpose == 'gift') {
      setChecked(true)
    }
  }, [])

  const handleCheck = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState); 

    if (newCheckedState) {
      setPurpose('gift')
    } else {
      setPurpose('personal')
    }
  }


  return (
    <View>

    <View style={styles.formCard}>
      <Text style={styles.label}>Item:</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        style={styles.input}
        value={item}
        onChangeText={(text) => setItem(text)}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        value={price}
        keyboardType="numeric"
        placeholder="Enter a number"
        onChangeText={(text) => setPrice(parseFloat(text))}
      />

      <Text style={styles.label}>Store:</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        value={store}
        onChangeText={(text) => setStore(text)}
      />

      <View style={styles.row}>
      <Text style={styles.label}>Is this a gift?</Text>
      <TouchableOpacity onPress={handleCheck} style={styles.checkboxContainer}>
        <Checkbox checkedState={checked}/>
      </TouchableOpacity>
      </View>

    </View>

      <Button
        color= "darkorange"
        title="Save Item"
        onPress={() => {
          onSubmit(item, price, store, purpose, purchased)
        }}
      />
    <View style={styles.iconContainer}>
      <MaterialIcons name="shopping-cart-checkout" size={100} color="darkgreen" />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  formCard: {
    margin: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  label: {
    fontSize: 20,
    margin: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    margin: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default PostForm
