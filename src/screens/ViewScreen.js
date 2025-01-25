import React, {useContext, useState, useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {Context} from '../context/DiaryContext'
import {BudgetContext} from '../context/BudgetContext'
import StatusBar from '../components/StatusBar'
import Checkbox from '../components/Checkbox'

const ViewScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state, editDiaryPost} = useContext(Context)
  const {status, getTotal, getPercent} = useContext(BudgetContext)
  const [checked, setChecked] = useState(false)

  const post = state.find(
    (diaryPost) => diaryPost.id === navigation.getParam('id')
  )

  useEffect(() => {
    if (post.purchased) {
      setChecked(true)
    }
  }, [])

  const handleCheck = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState); 

    if (newCheckedState) {
      editDiaryPost(id, post.item, post.price, post.store, post.purpose, true)
    } else {
      editDiaryPost(id, post.item, post.price, post.store, post.purpose, false)
    }
  }
  
  return (
    <View>
    <StatusBar progress={status.percent}/>
    <View style={styles.itemCard}>
      <Text style={styles.title}>{post.item} from {post.store}</Text>
      <Text style={styles.label}>Price: ${post.price}</Text>
      <Text style={styles.label}>Purpose: {post.purpose}</Text>
    </View>

    <View style={styles.purchasedCard}>
    <Text style={styles.label}>Already Purchased?</Text>
    <TouchableOpacity onPress={handleCheck} style={styles.checkboxContainer}>
      <Checkbox checkedState={checked}/>
    </TouchableOpacity>
    </View>

    <View style={styles.iconContainer}>
    <FontAwesome name="shopping-bag" size={100} color="darkgreen"/>
    </View>

    </View>
  )
}

ViewScreen.navigationOptions = ({navigation}) => {
  const id = navigation.getParam('id')
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: id})}>
        <FontAwesome
          style={styles.editIcon}
          name="pencil"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkgreen'
  },
  label: {
    fontSize: 18
  },
  itemCard: {
    gap: 10,
    margin: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 10,
  },
  purchasedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  }
})

export default ViewScreen
