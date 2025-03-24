import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { useGlobalContext } from '@/lib/global-provider';

interface Schedule {
  id: number;
  id_materia: number;
  fecha: string;
  horario_inicio: string;
  horario_fin: string;
}

interface Subject {
  id: number;
  nombre: string;
}

const ActivityScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [subjects, setSubjects] = useState<Record<number, string>>({});
  const { user } = useGlobalContext(); // Usuario autenticado


  const fetchSchedules = async (date: string) => {
    if (!user?.email) return;

    try {

      const { data: teacherData, error: teacherError } = await supabase
        .from('users')
        .select('id')
        .eq('correo', user.email)
        .single();

      if (teacherError || !teacherData) {
        console.error('Error obteniendo el ID del maestro:', teacherError);
        setSchedules([]);
        return;
      }

      const teacherId = teacherData.id;

      // 2️⃣ Obtener los horarios del maestro para la fecha seleccionada
      const { data: scheduleData, error: scheduleError } = await supabase
        .from('schedules')
        .select('id, id_materia, fecha, horario_inicio, horario_fin')
        .eq('id_maestro', teacherId)
        .eq('fecha', date);

      if (scheduleError) {
        console.error('Error obteniendo los horarios:', scheduleError);
        return;
      }

      setSchedules(scheduleData || []);

const materiaIds = [...new Set(scheduleData?.map((s) => s.id_materia) || [])];

console.log("Materia IDs obtenidos:", materiaIds);  // Log de los ID de materias

if (materiaIds.length > 0) {
  const { data: subjectData, error: subjectError } = await supabase
    .from('subjects') 
    .select('id, nombre')
    .in('id', materiaIds);

  if (subjectError) {
    console.error('Error obteniendo los nombres de materias:', subjectError);
    return;
  }

  console.log("Materia Data recibida:", subjectData); 
  const subjectMap: Record<number, string> = {};
  subjectData?.forEach((subject: Subject) => {
    subjectMap[subject.id] = subject.nombre;
  });

  console.log("Subject Map: ", subjectMap); 

  setSubjects(subjectMap);
}

    } catch (error) {
      console.error('Error en fetchSchedules:', error);
    }
  };


  useEffect(() => {
    fetchSchedules(selectedDate);
  }, [selectedDate]);

  return (
    <SafeAreaView className='bg-white'>
      <View className='px-5'>
        <Header />

        {/* Calendario */}
        <Calendar
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
          }}
          onDayPress={(day:any) => setSelectedDate(day.dateString)}
        />

        {/* Horarios del día seleccionado */}
        <Text className='font-xxl font-jaldi-bold mt-10'>
          Horarios para el {selectedDate}:
        </Text>

        <FlatList
          data={schedules}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className='font-xl mt-5'>
              📚 {subjects[item.id_materia] || 'Materia desconocida'} de 🕒 {item.horario_inicio} - {item.horario_fin}
            </Text>
          )}
          ListEmptyComponent={<Text>No hay horarios programados.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreen;
