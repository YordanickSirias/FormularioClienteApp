import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListaUsuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);

  const irAFormulario = () => {
    navigation.navigate('Home', {
      onGuardarUsuario: (nuevoUsuario) => {
        // Modificado para guardar solo la fecha sin hora
        const usuarioSinHora = {
          ...nuevoUsuario,
          fechaRegistro: new Date().toLocaleDateString() // Solo fecha
        };
        setUsuarios([...usuarios, usuarioSinHora]);
      }
    });
  };

  const eliminarUsuario = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        { 
          text: 'Eliminar', 
          onPress: () => {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={irAFormulario}
      >
        <Icon name="add" size={24} color="white" />
        <Text style={styles.textoBoton}>Agregar Cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenido}
        ListEmptyComponent={
          <Text style={styles.listaVacia}>No hay clientes registrados</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.contenidoItem}>
              <Text style={styles.nombre}>
                {item.nombres} {item.apellidos}
              </Text>
              <Text style={styles.detalle}>Cédula: {item.cedula}</Text>
              <Text style={styles.detalle}>Fecha Nacimiento: {item.fechaNacimiento}</Text>
              <Text style={styles.detalle}>Sexo: {item.sexo}</Text>
              {item.fechaRegistro && (
                <Text style={styles.detalle}>Registrado: {item.fechaRegistro}</Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.botonEliminar}
              onPress={() => eliminarUsuario(item.id)}
            >
              <Icon name="delete" size={24} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Los estilos se mantienen exactamente igual que en tu versión original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  botonAgregar: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listaContenido: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contenidoItem: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  listaVacia: {
    textAlign: 'center',
    marginTop: 32,
    color: '#95a5a6',
    fontSize: 16,
  },
  botonEliminar: {
    marginLeft: 10,
    padding: 8,
  },
});

export default ListaUsuarios;