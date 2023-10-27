import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "../theme";
import { ScrollView } from "react-native";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  style,
}) => {
  return (
    <View style={[styles.productContainer, style]}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>Price: ${price}</Text>
      <Text style={styles.productCategory}>Category: {category}</Text>
      <Text style={styles.productDescription}>Description: {description}</Text>
      <Text style={styles.productRating}>
        Rating: {rating.rate} (Count: {rating.count})
      </Text>
    </View>
  );
};

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar />
      <SafeAreaView>
        <ScrollView>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator style={styles.loading} size="large" color={themeColors.bgLight} />
            </View>
            
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            products.map((product) => <Product key={product.id} {...product} style={product.id % 2 === 0 ? styles.evenProduct : styles.oddProduct} />)
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  
  productContainer: {
    margin: 20,
    padding: 20,
    borderWidth: 1.5,
    borderRadius: 25,
  },
  productImage: {
    width: 150,
    height: 200,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
  },
  productCategory: {
    fontSize: 14,
  },
  productDescription: {
    fontSize: 14,
  },
  productRating: {
    fontSize: 14,
  },
  evenProduct: {
    borderColor : themeColors.bgLight,
  },
  oddProduct: {
    borderColor : themeColors.bgDark,
  },
});

export default Cart;
