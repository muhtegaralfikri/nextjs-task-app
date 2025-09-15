// src/components/TaskList.tsx

"use client";

import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem"; // Import komponen yang baru kita buat

export default function TaskList() {
  // Ambil data 'tasks' dari 'otak' kita
  const { tasks } = useTasks();

  // Ini PENTING: Handle 'Empty State'
  // Tampilkan pesan jika tidak ada task
  if (tasks.length === 0) {
    return (
      <div className="mt-8 w-full max-w-xl rounded-lg border border-dashed border-zinc-700 bg-zinc-800/50 p-8 text-center">
        <h3 className="text-lg font-medium text-zinc-400">
          Belum ada task
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Coba tambahkan task baru di atas.
        </p>
      </div>
    );
  }

  // Jika ada task, tampilkan list-nya
  return (
    <ul className="mt-8 w-full max-w-xl space-y-3">
      {/* Loop (map) data tasks, dan render satu TaskItem untuk setiap task */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}