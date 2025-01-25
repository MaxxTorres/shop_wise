import { StyleSheet, Text, View, FlatList, Image} from 'react-native'
import React, {useContext,useState, useEffect} from 'react'
import amazon from '../api/amazon'
import {productsTest} from '../api/productsTest'
import logo from '../images/amazon_logo.png'
import {Context as DiaryContext} from '../context/DiaryContext'

const ProductsList = (props) => {
  const [products, setProducts] = useState(productsTest)
  //const [products, setProducts] = useState([])
  const {state} = useContext(DiaryContext)
  const {recentItem} = props

  const searchApi = async (searchTerm) => {
    try{
    const response = await amazon.get('/search', {
        params: {
        query: searchTerm,
        }
    })
    setProducts(response.data.data.products)
    } catch (err) {
      console.log('search error')
    }
  }

  // useEffect(() => {
  //   if (recentItem != '') {
  //     searchApi(recentItem)
  //   }
  // }, [state])

  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Image style={styles.amazon} source={logo}/>
            <Text style={styles.title}>For You</Text>
        </View>

        {products.length === 0 ? (<Text style={styles.noProducts}>Searching Products...</Text>) : (
        <FlatList
        horizontal={true}
        data={products}
        keyExtractor={(item) => {return item.asin}}
        renderItem={({ item }) => {
            return (
            <View style={styles.productCard}>
            <Text style={styles.productName}>{item.product_title}</Text>
            <Text>{item.product_price}</Text>
            <Text>{item.product_star_rating}</Text>
            <Image source={{uri: item.product_photo}} style={styles.img} />
            </View>
            )
        }}
        />)
        }
    </View>
  );
}

export default ProductsList

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 250,
    borderRadius: 5
  },
  container: {
    height: 500,
    backgroundColor: 'lightgray',
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderColor: 'gray'
  },
  productCard: {
    width: 300,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noProducts: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginVertical: 30,
  },
  amazon: {
    width: 30,
    height: 30,
    margin: 5
  }
});