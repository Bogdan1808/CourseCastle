'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Control, Controller } from 'react-hook-form'

interface CategoryFormSelectorProps {
  control: Control<any>;
  name: string;
  label?: string;
  showLabel?: boolean;
  rules?: any;
}

export default function CategoryFormSelector({ control, name, label, showLabel, rules }: CategoryFormSelectorProps) {
  return (
    <div className="space-y-2">
      {showLabel && label && (
        <label className="block text-l font-medium text-amber-300">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger className="bg-stone-900 border border-stone-700 text-white placeholder-stone-400 rounded-lg focus:ring-amber-400 focus:border-amber-400 transition text-base px-4 py-3 shadow h-12 [&>span]:text-white">
              <SelectValue placeholder="Select a category" className="text-white placeholder:text-stone-400"/>
            </SelectTrigger>
            <SelectContent className="bg-stone-800 border-stone-600 text-white">
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
        )}
      />
    </div>
  )
}