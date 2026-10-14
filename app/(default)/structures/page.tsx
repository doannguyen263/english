import { StructureBox } from "@/features/structures/StructureBox";

export default function StructuresPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
      <h1 className="text-2xl font-semibold">Cấu trúc câu</h1>
      <div className="mt-6">
        <StructureBox />
      </div>
    </main>
  );
}