import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useParamsStore } from '@/hooks/useParamsStore'

export default function CategorySelector() {
  const filterBy = useParamsStore(state => state.filterBy);
  const setParams = useParamsStore(state => state.setParams);

  return (
    <Select
      value={filterBy || "all"}
      onValueChange={value => setParams({ filterBy: value === "all" ? "" : value })}
    >
      <SelectTrigger className="w-full md:w-[180px] bg-stone-800 border-stone-600 text-white h-12">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="bg-stone-800 border-stone-600 text-white">
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="art">Art</SelectItem>
        <SelectItem value="business">Business</SelectItem>
        <SelectItem value="cooking">Cooking</SelectItem>
        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="education">Education</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
        <SelectItem value="fitness">Fitness</SelectItem>
        <SelectItem value="gaming">Gaming</SelectItem>
        <SelectItem value="health">Health</SelectItem>
        <SelectItem value="language">Language</SelectItem>
        <SelectItem value="legal">Legal</SelectItem>
        <SelectItem value="lifestyle">Lifestyle</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
        <SelectItem value="music">Music</SelectItem>
        <SelectItem value="parenting">Parenting</SelectItem>
        <SelectItem value="photography">Photography</SelectItem>
        <SelectItem value="programming">Programming</SelectItem>
        <SelectItem value="sales">Sales</SelectItem>
        <SelectItem value="science">Science</SelectItem>
        <SelectItem value="software">Software</SelectItem>
        <SelectItem value="spirituality">Spirituality</SelectItem>
      </SelectContent>
    </Select>
  )
}
