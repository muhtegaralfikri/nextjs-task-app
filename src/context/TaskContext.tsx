"use client"; // Wajib ada di App Router untuk client-side logic

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 1. Definisikan bentuk data Task 
export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// 2. Definisikan apa yang akan ada di dalam Context
interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
}

// 3. Buat Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 4. Buat "Hook" kustom (yang akan dipakai komponen)
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks harus digunakan di dalam TaskProvider");
  }
  return context;
}

// 5. Buat "Provider" (Komponen yang akan membungkus aplikasi)
export function TaskProvider({ children }: { children: ReactNode }) {
  // --- STATE ---
  // 1. Inisialisasi state KOSONG di render pertama (server & client)
  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. State untuk melacak 'mount' di client
  const [isMounted, setIsMounted] = useState(false);

  // --- EFEK (PERSISTENCE) ---

  // EFEK 1: Load data dari localStorage HANYA SEKALI saat client mount
  useEffect(() => {
    // Hanya berjalan di client, setelah render pertama
    try {
      const storedTasks = window.localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Gagal parse tasks dari localStorage:", error);
    }
    // Tandai bahwa sudah 'mounted' (hidrasi selesai)
    setIsMounted(true);
  }, []); // [] = Hanya jalan sekali saat mount

  // EFEK 2: Simpan data ke localStorage SETIAP KALI 'tasks' berubah
  // (tapi HANYA jika sudah 'mounted')
  useEffect(() => {
    // Jangan simpan ke localStorage jika masih di server
    // atau saat render pertama di client (sebelum isMounted=true).
    if (isMounted) {
      try {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Gagal menyimpan tasks ke localStorage:", error);
      }
    }
  }, [tasks, isMounted]); // Jalan saat 'tasks' atau 'isMounted' berubah

  // --- FUNGSI CRUD ---

  const addTask = (text: string) => {
    if (!text.trim()) return; // Jangan tambahkan task kosong
    const newTask: Task = {
      id: crypto.randomUUID(), // Pakai API browser modern
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]); // Tambah di paling atas
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, newText: string) => {
    if (!newText.trim()) return; // Jangan update jadi kosong
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // 6. Sediakan nilai untuk semua 'children'
  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}