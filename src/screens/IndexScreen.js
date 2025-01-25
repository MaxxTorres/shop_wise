import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {Context as DiaryContext} from '../context/DiaryContext'
import {BudgetContext} from '../context/BudgetContext'
import ProductsList from '../components/ProductsList'
import Checkbox from '../components/Checkbox'
import StatusBar from '../components/StatusBar'

const IndexScreen = ({navigation}) => {
  const {state, deleteDiaryPost, getDiaryPosts} = useContext(DiaryContext)
  const {status, getTotal, getPercent, getBudget} = useContext(BudgetContext)
  const [data, setData] = useState(state)
  const [orderPrice, setOrderPrice] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [showEditBudget, setShowEditBudget] = useState(false)
  const [value, setValue] = useState(0)
  const [recentItem, setRecentItem] = useState('')

  useEffect(() => {
    getDiaryPosts()
    const listener = navigation.addListener('didFocus', () => {
      getDiaryPosts()
      setOrderPrice(false)
      setShowGifts(false)  })
    return () => {listener.remove()}
  }, [])

  useEffect(() => {
    getTotal(state)
    getPercent()
    setData(state)
  }, [state, status])

  const handleShowEditBudget = () => {
    const show = !showEditBudget
    setShowEditBudget(show)
  }

  const handleOrderPrice = () => {
    const check = !orderPrice
    setOrderPrice(check)
    if (check) {
      const newData = [...data].sort((a, b) => b.price - a.price)
      setData(newData)
    } else {
      setShowGifts(false) //reset both filters
      setData(state)
    }
  }

  const handleShowGifts = () => {
    const check = !showGifts
    setShowGifts(check)
    if (check) {
      const newData = [...data].filter((item) => item.purpose == 'gift')
      setData(newData)
    } else {
      setOrderPrice(false) //reset both filters
      setData(state)
    }
  }

  return (
    <ScrollView overScrollMode="never">
      {/* Budget Status Bar */}
      <StatusBar progress={status.percent}/>

      {/* Edit Budget Window */}
      {showEditBudget ? (
        <View style={styles.budgetWindow}>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            value={status.budget}
            keyboardType="numeric"
            placeholder="Enter budget"
            onChangeText={(text) => setValue(parseFloat(text))}
          />
          <Button
            color="darkgreen"
            title="Save"
            onPress={() => {getBudget(value) 
              setShowEditBudget(false)}}
          />
        </View>) : null}

      {/* Home Bar */}
      <View style={styles.homeBar}>
        <TouchableOpacity style={styles.budgetButton} onPress={handleShowEditBudget}>
          <Text style={styles.barLabel}>Edit Budget</Text>
        </TouchableOpacity>

        <Text style={styles.barLabel}>Order By Price</Text>
        <TouchableOpacity onPress={handleOrderPrice} style={styles.checkboxContainer}>
          <Checkbox checkedState={orderPrice}/>
        </TouchableOpacity>

        <Text style={styles.barLabel}>Show Gifts Only</Text>
        <TouchableOpacity onPress={handleShowGifts} style={styles.checkboxContainer}>
          <Checkbox checkedState={showGifts}/>
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <FlatList
        data={data}
        keyExtractor={(post) => post.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {navigation.navigate('View', {id: item.id})
                        setRecentItem(item.item)}}>
            <View style={styles.itemContainer}>

              <View>
                <Text style={styles.title}>{item.item} | ${item.price}</Text>
                <View style={{flexDirection: 'row', gap: 5}}>
                <Text>
                  {item.purchased ? "Purchased" : "Unpurchased"}
                </Text>
                {item.purpose == "gift" ? <MaterialIcons name="card-giftcard" size={20} color="red" style={styles.giftIcon}/> : null}
              </View>
              </View>

              <TouchableOpacity style={styles.deleteContainer} onPress={() => deleteDiaryPost(item.id)}>
                <MaterialIcons name="remove-shopping-cart" size={24} color="#333" />
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        )}
      />

      {/* Recommended Products List */}
      <ProductsList recentItem={recentItem}/>
    </ScrollView>
  )
}

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <MaterialIcons
          style={styles.addIcon}
          name="add-shopping-cart"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  deleteContainer: {

  },
  giftIcon: {
    margin: 0 
  },
  budgetButton: {
    backgroundColor: 'darkgreen',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10
  },
  barLabel: {
    fontSize: 15,
    color: 'white',
    margin: 3
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '50%'
  },
  budgetWindow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    positon: 'fixed',
    top: -10,
    left: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'darkgreen',
    borderRadius: 5
  },
  homeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    backgroundColor: 'darkorange',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    padding: 10,
    margin: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  addIcon: {
    marginRight: 10,
  },
})

export default IndexScreen
