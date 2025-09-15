"use client"; // 

import { useState } from "react";
import { useTasks } from "@/context/TaskContext"; 

export default function TaskInput() {
  // 1. State lokal HANYA untuk form input
  const [text, setText] = useState("");

  // 2. Ambil fungsi 'addTask' dari 'otak' (Context)
  const { addTask } = useTasks();

  // 3. Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    
    // Panggil fungsi dari context. 
    // Komponen ini tidak perlu tahu BAGAIMANA cara menambah task,
    // dia hanya 'memerintahkan' context untuk menambah task.
    addTask(text);
    
    // Kosongkan input setelah submit
    setText("");
  };

  return (
    // Gunakan <form> untuk best practice (bisa submit pakai Enter)
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mt-8 flex gap-2" // styling form
    >
      <input
        type="text"
        value={text} // Controlled component
        onChange={(e) => setText(e.target.value)} // Update state lokal
        placeholder="Apa yang ingin kamu kerjakan?"
        className="flex-grow rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
      <button
        type="submit"
        className="flex-shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        Tambah
      </button>
    </form>
  );
}