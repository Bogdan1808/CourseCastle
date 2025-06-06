import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsStore } from "@/hooks/useParamsStore";

export default function LevelSelector() {
  const levelFilter = useParamsStore((state) => state.levelFilter);
  const setParams = useParamsStore((state) => state.setParams);

  return (
    <Select
      value={levelFilter || "all"}
      onValueChange={(value) =>
        setParams({ levelFilter: value === "all" ? "" : value })
      }
    >
      <SelectTrigger className="w-full md:w-[180px] bg-stone-800 border-stone-600 text-white h-12">
        <SelectValue placeholder="Difficulty Level" />
      </SelectTrigger>
      <SelectContent className="bg-stone-800 border-stone-600 text-white">
        <SelectItem value="all">All Levels</SelectItem>
        <SelectItem value="Beginner">Beginner</SelectItem>
        <SelectItem value="Apprentice">Apprentice</SelectItem>
        <SelectItem value="Intermediate">Intermediate</SelectItem>
        <SelectItem value="Master">Master</SelectItem>
        <SelectItem value="Expert">Expert</SelectItem>
      </SelectContent>
    </Select>
  );
}
