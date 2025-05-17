import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormularioRegistro = ({ navigation, onGuardar }) => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: 'Masculino'
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const { cedula, nombres, apellidos } = formData;
    
    if (!cedula || !nombres || !apellidos) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      return;
    }

    const nuevoCliente = {
      id: Date.now().toString(),
      ...formData,
      fechaRegistro: new Date().toLocaleString()
    };

    if (onGuardar) {
      onGuardar(nuevoCliente);
    }

    Alert.alert('Éxito', 'Cliente registrado correctamente', [
      { 
        text: 'Aceptar', 
        onPress: () => {
          setFormData({
            cedula: '',
            nombres: '',
            apellidos: '',
            fechaNacimiento: '',
            sexo: 'Masculino'
          });
          navigation?.goBack();
        }
      }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo Registro</Text>
        <Text style={styles.subtitle}>Registro de Cliente</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cédula *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la cédula"
          value={formData.cedula}
          onChangeText={(text) => handleChange('cedula', text)}
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombres *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese los nombres"
          value={formData.nombres}
          onChangeText={(text) => handleChange('nombres', text)}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Apellidos *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese los apellidos"
          value={formData.apellidos}
          onChangeText={(text) => handleChange('apellidos', text)}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={formData.fechaNacimiento}
          onChangeText={(text) => handleChange('fechaNacimiento', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.sexo}
            onValueChange={(value) => handleChange('sexo', value)}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleSubmit}
        >
          <Icon name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Guardar Cliente</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495e',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default FormularioRegistro;