// src/components/TaskItem.tsx

"use client";

import { useState } from "react"; // Kita butuh useState untuk state lokal
import { useTasks, type Task } from "@/context/TaskContext";

// Import icon 
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function TaskItem({ task }: { task: Task }) {
  // Ambil SEMUA fungsi dari context, termasuk 'editTask'
  const { toggleTask, deleteTask, editTask } = useTasks();

  // --- State Lokal HANYA untuk komponen  ---
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text); // Simpan teks editan sementara

  // --- Handler ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah form submit reload halaman
    editTask(task.id, editText); // Kirim data baru ke "otak" (Context)
    setIsEditing(false); // Kembali ke mode normal
  };

  const handleCancel = () => {
    setIsEditing(false); // Kembali ke mode normal
    setEditText(task.text); // Batalkan editan
  };

  return (
    <li className="flex items-center justify-between rounded-lg bg-zinc-800 p-4 shadow min-h-[72px]">
      {isEditing ? (
        
        <form
          onSubmit={handleSave}
          className="flex-grow flex items-center gap-2"
        >
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-lg text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus 
          />
          <div className="flex gap-1">
            <button
              type="submit"
              className="rounded p-1.5 text-green-400 hover:bg-zinc-700"
              aria-label="Simpan"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded p-1.5 text-red-400 hover:bg-zinc-700"
              aria-label="Batal"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      ) : (

        <>
          <div className="flex items-center gap-3 flex-grow min-w-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="h-5 w-5 flex-shrink-0 rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-zinc-800"
            />
            <span
              className={`text-lg truncate ${
                task.completed ? "text-zinc-500 line-through" : "text-zinc-100"
              }`}
            >
              {task.text}
            </span>
          </div>
          <div className="flex gap-1 flex-shrink-0 ml-4">
            <button
              onClick={() => setIsEditing(true)} // <-- Tombol Edit
              className="rounded p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              aria-label="Edit"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="rounded p-1.5 text-zinc-400 hover:bg-red-600/50 hover:text-red-400"
              aria-label="Hapus"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}