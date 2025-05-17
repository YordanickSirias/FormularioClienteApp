import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormularioRegistro from '../Components/FormularioRegistro';

const HomeScreen = ({ route }) => {
  // Obtener la función callback de route.params
  const { onGuardarUsuario } = route.params || {};

  return (
    <View style={styles.container}>
      <FormularioRegistro 
        onGuardar={onGuardarUsuario} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
});

export default HomeScreen;