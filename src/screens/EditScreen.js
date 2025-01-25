import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import PostForm from '../components/PostForm'
import {Context} from '../context/DiaryContext'

const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state, editDiaryPost} = useContext(Context)
  const post = state.find(
    (diaryPost) => diaryPost.id === navigation.getParam('id')
  )

  return (
    <PostForm
      inititalValues={{item: post.item, price: post.price, store: post.store, purpose: post.purpose, purchased: post.purchased}}
      onSubmit={(item, price, store, purpose, purchased) => {
        editDiaryPost(id, item, price, store, purpose, purchased, () =>
          navigation.navigate('View', {id: id})
        )
      }}
    />
  )
}

const styles = StyleSheet.create({})

export default EditScreen
