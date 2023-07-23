import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HamburguerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerIcon}>
        <Icon name={showMenu ? 'times' : 'bars'} size={30} color="black" />
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menuOptions}>
            <View style={styles.menuUserData}>
                <Image
                    source={require('../assets/usuario.png')}
                    style={styles.image}
                    resizeMode="cover"
                    />
                <Text>Name User</Text>
            </View>
          {menuOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.menuOption}>
              <Text style={styles.menuOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  hamburgerIcon: {
    padding: 10,
  },
  menuOptions: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 200
  },
  menuOption: {
    padding: 10,
  },
  menuOptionText: {
    fontSize: 16,
  },  
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginBottom:10
  },
  menuUserData:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 10,borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom:10
  }
});

export default HamburguerMenu;
