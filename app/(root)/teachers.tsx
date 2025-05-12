import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import SubHeader from '@/components/SubHeader';
import { supabase } from '@/lib/supabase';

interface User {
  id: number;
  nombre: string;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const fetchTeachers = async () => {
    const { data, error } = await supabase.from('users').select('id, nombre');

    if (error) {
      console.error('Error al obtener los usuarios:', error);
      return;
    }

    setTeachers(data || []);
  };

  const agregarUsuario = async () => {
    if (!nombre || !correo) {
      Alert.alert('Campos requeridos', 'Por favor llena ambos campos.');
      return;
    }

    // Obtener el ID máximo actual
    const { data: maxData, error: maxError } = await supabase
      .from('users')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    if (maxError) {
      console.error('Error al obtener el ID máximo:', maxError);
      Alert.alert('Error', 'No se pudo calcular el nuevo ID.');
      return;
    }

    const maxId = maxData?.[0]?.id ?? 0;
    const nuevoId = maxId + 1;

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: nuevoId, nombre, correo }]);

    if (insertError) {
      console.error('Error al insertar usuario:', insertError);
      Alert.alert('Error', 'No se pudo guardar el usuario.');
      return;
    }

    setNombre('');
    setCorreo('');
    setShowModal(false);
    fetchTeachers();
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5">
          <SubHeader title="Profesores" />

          {teachers.map((teacher) => (
            <TouchableOpacity
              key={teacher.id}
              onPress={() => {
                console.log('ID seleccionado:', teacher.id);
              }}
            >
              <View className="w-full bg-secondary-200 shadow-md shadow-primary-200 h-15 py-4 mt-5 rounded-lg">
                <View className="flex-1 items-center justify-center">
                  <Text className="text-primary-200 text-center font-jaldi text-xl">
                    {teacher.nombre}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View className="flex items-end mt-5">
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <View className="w-16 h-16 bg-primary-200 shadow-md shadow-primary-200 rounded-lg">
                <View className="flex-1 items-center justify-center">
                  <Text className="text-secondary-100 text-center font-jaldi text-2xl">+</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-white rounded-lg p-6 w-11/12">
                <Text className="text-xl font-jaldi text-primary-200 mb-4 text-center">Agregar Profesor</Text>

                <Text className="text-primary-200 font-jaldi text-lg">Nombre:</Text>
                <TextInput
                  placeholder="Introduce el nombre"
                  className="h-12 border border-primary-200 rounded px-3 mb-4 text-black"
                  value={nombre}
                  onChangeText={setNombre}
                />

                <Text className="text-primary-200 font-jaldi text-lg">Correo:</Text>
                <TextInput
                  placeholder="Introduce el correo"
                  className="h-12 border border-primary-200 rounded px-3 mb-6 text-black"
                  value={correo}
                  onChangeText={setCorreo}
                  keyboardType="email-address"
                />

                <View className="flex-row justify-between">
                  <TouchableOpacity onPress={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                    <Text className="text-black font-jaldi">Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={agregarUsuario} className="bg-primary-200 px-4 py-2 rounded">
                    <Text className="text-secondary-100 font-jaldi">Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teachers;
