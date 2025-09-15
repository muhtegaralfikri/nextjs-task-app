import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        My Task App
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        Sebuah project CRUD sederhana menggunakan Next.js.
      </p>

      {/* Komponen Input (untuk menambah task baru) */}
      <TaskInput />
      {/* Komponen Daftar Task (untuk menampilkan semua task) */}
      <TaskList />
    </main>
  );
}