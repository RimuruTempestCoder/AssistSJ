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

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [teacherId, setTeacherId] = useState<number | null>(null); // Store teacherId here
  const { user } = useGlobalContext(); // Obtener el usuario autenticado

  const fetchGroups = async () => {
    if (!user?.email) return;
    try {
      const { data: teacherData, error: teacherError } = await supabase
        .from('users')
        .select('id')
        .eq('correo', user.email)
        .single();

      if (teacherError) {
        console.error('Error obteniendo el ID del maestro:', teacherError);
        return;
      }

      if (!teacherData) {
        console.log('No se encontró un maestro con este correo.');
        setGroups([]);
        return;
      }

      const teacherId = teacherData.id;
      setTeacherId(teacherId); // Set the teacherId here

      const { data: teacherGroups, error: teacherGroupsError } = await supabase
        .from('teacher_subject_group')
        .select('id_grupo')
        .eq('id_maestro', teacherId);

      if (teacherGroupsError) {
        console.error('Error obteniendo los grupos del maestro:', teacherGroupsError);
        return;
      }

      if (!teacherGroups.length) {
        console.log('El maestro no tiene grupos asignados.');
        setGroups([]);
        return;
      }

      const groupIds = teacherGroups.map((tg) => tg.id_grupo);

      const { data: groupsData, error: groupsError } = await supabase
        .from('groups')
        .select('*')
        .in('id', groupIds);

      if (groupsError) {
        console.error('Error obteniendo detalles de los grupos:', groupsError);
        return;
      }

      setGroups(groupsData as Group[]);
    } catch (error) {
      console.error('Error en fetchGroups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user?.email]); // Re-run fetchGroups if email changes

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
          groups.map((group) => (
          <Grupos key={group.id} id={group.id} id_maestro={teacherId} nombre={group.nombre} />
          ))
            ) : (
              <Text>No hay grupos disponibles o el ID del maestro no se ha cargado</Text>
            )}

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Groups;
