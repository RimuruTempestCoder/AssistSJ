import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { supabase } from "@/lib/supabase";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Topic from "@/components/topic";
import Header from "@/components/Header";
import Advices from "@/components/Advices";
import { useGlobalContext } from "@/lib/global-provider";

interface Schedule {
  id: number;
  id_materia: number;
  id_maestro: number;
  fecha: string;
  horario_inicio: string;
  horario_fin: string;
}

interface Subject {
  id: number;
  nombre: string;
}

export default function Index() {
  const [advices, setAdvices] = useState<Schedule[]>([]);
  const [subjects, setSubjects] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext(); // Obtener usuario autenticado

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      if (!user?.email) {
        setLoading(false);
        return;
      }

      const now = new Date();
      const today = now.toISOString().split("T")[0];

      try {
        // Obtener ID del maestro según su email
        const { data: teacherData, error: teacherError } = await supabase
          .from("users")
          .select("id")
          .eq("correo", user.email)
          .single();

        if (teacherError || !teacherData) {
          console.error("Error obteniendo el ID del maestro:", teacherError);
          setAdvices([]);
          setLoading(false);
          return;
        }

        const teacherId = teacherData.id;

        // Obtener horarios del día actual
        const { data: scheduleData, error: scheduleError } = await supabase
          .from("schedules")
          .select("id, id_materia, id_maestro, fecha, horario_inicio, horario_fin")
          .eq("id_maestro", teacherId)
          .eq("fecha", today);

        if (scheduleError) {
          console.error("Error obteniendo los horarios:", scheduleError);
          setLoading(false);
          return;
        }

        setAdvices(scheduleData || []);

        // Obtener IDs únicos de materias
        const materiaIds = [...new Set(scheduleData?.map((s) => s.id_materia) || [])];

        if (materiaIds.length > 0) {
          const { data: subjectData, error: subjectError } = await supabase
            .from("subjects")
            .select("id, nombre")
            .in("id", materiaIds);

          if (subjectError) {
            console.error("Error obteniendo los nombres de materias:", subjectError);
            setLoading(false);
            return;
          }

          // Crear un mapa de IDs de materias a nombres
          const subjectMap: Record<number, string> = {};
          subjectData?.forEach((subject: Subject) => {
            subjectMap[subject.id] = subject.nombre;
          });

          setSubjects(subjectMap);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error en fetchSchedules:", error);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <View className="px-5">
          <Header />

          <View className="w-full items-center mt-2">
            <Image source={images.main} className="rounded w-full h-80 mt-3 mb-3" />
          </View>

          <View className="w-full flex flex-row justify-between mt-2">
            <Topic icon={icons.groups} title="Pasa lista" />
            <Topic icon={icons.calendar} title="Revisa tu horario" />
            <Topic icon={icons.subjects} title="Proceso más simple" />
          </View>

          {/* Avisos dinámicos */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-5" />
          ) : advices.length > 0 ? (
            <View className="mt-5">
              <Text className="text-xl text-primary-200 font-jaldi-bold">Avisos</Text>
              <View className="gap-4 mb-20">
                {advices.map((advice) => (
                  <Advices
                    key={advice.id}
                    title="Tienes una clase próxima"
                    description={`Materia: ${subjects[advice.id_materia] || "Materia desconocida"} 
                    de ${advice.horario_inicio} a ${advice.horario_fin}`}
                  />
                ))}
              </View>
            </View>
          ) : (
            <Text className="text-center text-gray-500 mt-5">No hay clases próximas.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
