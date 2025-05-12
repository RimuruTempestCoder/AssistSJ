import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubHeader from '@/components/SubHeader';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';

interface AttendanceRecord {
  id: number;
  id_alumno: number;
  fecha: string;
  estatus: boolean;
}

const List = () => {
  const params = useLocalSearchParams();

  const id_grupo = Number(params.id_grupo);
  const id_maestro = Number(params.id_maestro);
  const id_materia = Number(params.id_materia);

  if (!id_materia) {
    return <Text>Error: No se proporcionó una materia válida.</Text>;
  }

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [students, setStudents] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('fecha')
        .eq('id_asignacion', id_materia)
        .order('fecha', { ascending: false });

      if (error) {
        console.error('Error fetching dates:', error);
        return;
      }

      const uniqueDates = [...new Set(data.map((d) => d.fecha))];
      setDates(uniqueDates);
      if (uniqueDates.length > 0) setSelectedDate(uniqueDates[0]);
    };

    fetchDates();
  }, [id_materia]);

  useEffect(() => {
  if (!selectedDate || !id_materia) return;

  const fetchAttendance = async () => {
    const { data: attendanceData, error } = await supabase
      .from('attendance')
      .select('id, id_alumno, fecha, estatus')
      .eq('id_asignacion', id_materia)
      .eq('fecha', selectedDate);

    if (error) {
      console.error('Error fetching attendance:', error);
      return;
    }

    console.log('Fetched Attendance:', attendanceData);
    setAttendance(attendanceData.filter((record) => record.id_alumno !== null));
  };

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('id, nombre');

    if (error) {
      console.error('Error fetching students:', error);
      return;
    }

    console.log('Fetched Students:', data);
    setStudents(data);
  };

  fetchAttendance();
  fetchStudents();
}, [selectedDate, id_materia]);



  const toggleAttendance = (studentId: number) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.id_alumno === studentId
          ? { ...record, estatus: !record.estatus }
          : record
      )
    );
  };

  const handleUpdate = async () => {
  if (attendance.length === 0) {
    Alert.alert('Error', 'No hay registros válidos para actualizar.');
    return;
  }

  try {
    for (const record of attendance) {
      const { error } = await supabase
        .from('attendance')
        .update({
          estatus: record.estatus,
        })
        .eq('id', record.id);

      if (error) {
        console.error(`Error actualizando el registro con ID ${record.id}:`, error);
        Alert.alert('Error', `No se pudo actualizar el registro con ID ${record.id}`);
        return; // Si falla uno, detiene todo
      }
    }

    Alert.alert('Éxito', 'Se actualizó la asistencia correctamente');
  } catch (err) {
    console.error('Error general en actualización:', err);
    Alert.alert('Error', 'Ocurrió un error al actualizar la asistencia');
  }
};


  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-5">
          <SubHeader title="Pase de lista" />

          {dates.length > 0 ? (
            <ScrollView horizontal className="flex-row mt-3">
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  className={`w-40 h-16 justify-center items-center rounded-lg m-2 ${
                    selectedDate === date ? 'bg-primary-200' : 'bg-secondary-200'
                  }`}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text
                    className={`font-bold text-xl ${
                      selectedDate === date ? 'text-white' : 'text-black'
                    }`}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text className="text-center mt-3">No hay fechas disponibles.</Text>
          )}

          <View className="mt-5">
            {attendance.length > 0 ? (
              attendance.map((record) => {
                const student = students.find((s) => s.id === record.id_alumno);
                return (
                  <TouchableOpacity
                    key={record.id}
                    className={`p-3 m-2 rounded-lg ${
                      record.estatus ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onPress={() => toggleAttendance(record.id_alumno)}
                  >
                    <Text className="text-white font-bold text-lg text-center">
                      {student ? student.nombre : 'Desconocido'}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text className="text-center">No hay asistencia registrada para esta fecha.</Text>
            )}
          </View>

          <View className="w-full items-center mt-10 mb-10">
            <TouchableOpacity
              className="w-48 h-14 bg-primary-200 justify-center p-5 rounded"
              onPress={handleUpdate}
            >
              <Text className="font-bold text-white text-center">Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default List;
