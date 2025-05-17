import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const ListaUsuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);

  const irAFormulario = () => {
    navigation.navigate('Home', {
      onGuardarUsuario: (nuevoUsuario) => {
        const usuarioSinHora = {
          ...nuevoUsuario,
          fechaRegistro: new Date().toLocaleDateString()
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
      {/* Header con solo el icono a la derecha */}
      <View style={styles.header}>
        <TouchableOpacity onPress={irAFormulario} style={styles.iconoHeader}>
          <IconMC name="account-plus" size={28} color="#3498db" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={usuarios.length === 0 ? styles.listaVaciaContenido : styles.listaContenido}
        ListEmptyComponent={
          <View style={styles.contenedorVacio}>
            <Icon name="people-outline" size={80} color="#bdc3c7" style={styles.iconoVacio} />
            <Text style={styles.textoVacio}>No hay clientes registrados aún</Text>
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  iconoHeader: {
    padding: 8,
  },
  listaContenido: {
    padding: 16,
  },
  listaVaciaContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contenedorVacio: {
    alignItems: 'center',
  },
  iconoVacio: {
    marginBottom: 20,
    opacity: 0.5,
  },
  textoVacio: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
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
  botonEliminar: {
    marginLeft: 10,
    padding: 8,
  },
});

export default ListaUsuarios;