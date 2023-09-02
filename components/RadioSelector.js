import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioSelector = ({titulo, values, setFiltros, filtros, atributo}) => {
  const [selectedValue, setSelectedValue] = useState('perro');

  const handleSelect = (value) => {
    setSelectedValue(value);
    const newFiltros = {...filtros}; //Hago una copia del objeto con los filtros
    newFiltros[atributo]= value; //seteo el valor del atributo con el valor que elijo
    console.log(newFiltros);
    //setFiltros(newFiltros); //seteo el valor del objeto de los filtros originales con el modificado.
    setFiltros(...filtros, ...[atributo]= value);
  };

  return (
    <View style={styles.containerRadioSelector}>
      <Text style={styles.tituloRadio}>{titulo}</Text>
      {
        values.map((item)=>{

          const valor = item === "Perro" ? 1 : item === "Gato" ? 2 : 3;
          return (
            <TouchableOpacity
              style={selectedValue === item ? styles.selectedOption : styles.option}
              onPress={() => handleSelect(valor)}
              >
                
              <Text>{item}</Text>
              
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  containerRadioSelector:{
    backgroundColor:"grey",
    width:"95%",
    borderRadius:5
  },
  tituloRadio:{
    color:"white",
    fontWeight:"bold",
    fontSize:18
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    color:"white"
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white', // Color de fondo cuando está seleccionado
    borderRadius: 5,
    padding: 5,
  },
});

export default RadioSelector;
