import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dwlamhtpfkkvcnvmvyci.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3bGFtaHRwZmtrdmNudm12eWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MDE1MDMsImV4cCI6MjA1NzQ3NzUwM30.LnaZa_xjg6MB-plygq2ReCXn265IN65QN7asVsoN_Lc'

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})