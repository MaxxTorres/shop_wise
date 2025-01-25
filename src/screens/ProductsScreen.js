import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import amazon from '../api/amazon'
import {productsTest} from '../api/productsTest'

const Products = ({navigation}) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(productsTest)
    }, [])

  // const searchApi = async (searchTerm) => {
  //   try{
  //   const response = await amazon.get('/search', {
  //       params: {
  //       query: searchTerm,
  //       }
  //   })
  //   //console.log(response)
  //   setProducts(response.data.data.products)
  //   } catch (err) {
  //     console.log('search error')
  //   }
    
  // }

  // useEffect(() => {
  //   searchApi('phone')
  //   }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => {return item.asin}}
        renderItem={({ item }) => {
          return (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.product_title}</Text>
            <Text>{item.product_price}</Text>
            <Text>{item.product_star_rating}</Text>
          </View>
          )
        }}
      />
    </View>
  );
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  productCard: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16
  }
});