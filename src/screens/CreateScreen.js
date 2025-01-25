import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { Context } from '../context/DiaryContext';

const CreateScreen = ({ navigation }) => {
  const {addDiaryPost} = useContext(Context);

  return (
    <PostForm
      onSubmit={(item, price, store, purpose, purchased) => {
        addDiaryPost(item, price, store, purpose, purchased, () => navigation.navigate('Index'));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
