import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SubHeader from '@/components/SubHeader';
import { supabase } from '@/lib/supabase';

interface Subject {
  id: number;
  nombre: string;
}

const Subjects = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const id_grupo = Number(params.id_grupo);
  const id_maestro = Number(params.id_maestro);


  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    try {
      console.log('Obteniendo materias con:', { id_grupo, id_maestro });
  
      if (isNaN(id_grupo) || isNaN(id_maestro)) {
        console.error('Error: id_grupo o id_maestro son inválidos.');
        return;
      }
  
      const { data: subjectLinks, error: linkError } = await supabase
        .from('teacher_subject_group')
        .select('id_materia')
        .eq('id_maestro', id_maestro)
        .eq('id_grupo', id_grupo);
  
      if (linkError) {
        console.error('Error obteniendo materias del grupo:', linkError);
        return;
      }
  
      if (!subjectLinks || subjectLinks.length === 0) {
        console.log('No hay materias asignadas para este grupo y maestro.');
        setSubjects([]);
        return;
      }
  
      const subjectIds = subjectLinks.map((s) => s.id_materia);
  
      if (subjectIds.length === 0) {
        console.log('No hay materias válidas para consultar.');
        setSubjects([]);
        return;
      }
  
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('id, nombre')
        .in('id', subjectIds);
  
      if (subjectsError) {
        console.error('Error obteniendo detalles de las materias:', subjectsError);
        return;
      }
  
      setSubjects(subjectsData || []);
    } catch (error) {
      console.error('Error en fetchSubjects:', error);
    }
  };
  

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5">
          <SubHeader title="Materias asignadas" />
          <View className="p-2">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  onPress={() =>
                    router.push(
                      `/(root)/list?id_maestro=${id_maestro}&id_materia=${subject.id}&id_grupo=${id_grupo}`
                    )
                  }
                  
                  className="p-2 border-b border-gray-300 p-5"
                >
                  <Text className="text-lg font-semibold">{subject.nombre}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay materias asignadas.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Subjects;
