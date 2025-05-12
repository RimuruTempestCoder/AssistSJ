import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '@/components/Search';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import Grupos from '@/components/Grupos';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/lib/global-provider';

interface Group {
  id: number;
  nombre: string;
}

interface TeacherSubjectGroup {
  id_grupo: number;
  id_materia: number;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [teacherGroups, setTeacherGroups] = useState<TeacherSubjectGroup[]>([]);

  const { user } = useGlobalContext(); // Obtener el usuario autenticado

  const fetchGroups = async () => {
    if (!user?.email) return;
    
    try {
      // Obtener ID del maestro a partir del correo
      const { data: teacherData, error: teacherError } = await supabase
        .from('users')
        .select('id')
        .eq('correo', user.email)
        .single();

      if (teacherError) throw teacherError;
      if (!teacherData) {
        console.log('No se encontró un maestro con este correo.');
        setGroups([]);
        return;
      }

      const teacherId = teacherData.id;
      setTeacherId(teacherId);

      // Obtener los grupos y materias del maestro
      const { data: teacherGroupsData, error: teacherGroupsError } = await supabase
        .from('teacher_subject_group')
        .select('id_grupo, id_materia')
        .eq('id_maestro', teacherId);

      if (teacherGroupsError) throw teacherGroupsError;
      if (!teacherGroupsData.length) {
        console.log('El maestro no tiene grupos asignados.');
        setGroups([]);
        return;
      }

      setTeacherGroups(teacherGroupsData);

      // Obtener detalles de los grupos
      const groupIds = teacherGroupsData.map((tg) => tg.id_grupo);
      const { data: groupsData, error: groupsError } = await supabase
        .from('groups')
        .select('*')
        .in('id', groupIds);

      if (groupsError) throw groupsError;

      setGroups(groupsData as Group[]);
    } catch (error) {
      console.error('Error en fetchGroups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user?.email]);

  return (
    <SafeAreaView className="bg-white">
      <View className="px-5">
        <Header />
        <Search />
        <View className="p-1 flex-row justify-end">
          <TouchableOpacity onPress={fetchGroups}>
            <Image source={icons.refresh} resizeMode="contain" className="size-8" tintColor={'#7B85BC'} />
          </TouchableOpacity>
        </View>
        <View>
        {teacherId !== null && groups.length > 0 ? (
        groups.map((group) => {
          const groupData = teacherGroups.find((tg) => tg.id_grupo === group.id);
          const idMateria = groupData?.id_materia;

          console.log(`Grupo: ${group.nombre}, ID Materia: ${idMateria}`); // Verifica que id_materia no sea undefined o null

          return (
            <Grupos 
              key={group.id} 
              id={group.id} 
              id_maestro={teacherId} 
              nombre={group.nombre} 
              id_materia={idMateria ? String(idMateria) : undefined} 
            />
          );
        })
      ) : (
        <Text>No hay grupos disponibles o el ID del maestro no se ha cargado</Text>
      )}

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Groups;
