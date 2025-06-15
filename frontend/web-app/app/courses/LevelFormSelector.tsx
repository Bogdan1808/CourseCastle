'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Control, Controller } from 'react-hook-form'

interface LevelFormSelectorProps {
  control: Control<any>;
  name: string;
  label?: string;
  showLabel?: boolean;
  rules?: any;
}

export default function LevelFormSelector({ control, name, label, showLabel, rules }: LevelFormSelectorProps) {
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
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent className="bg-stone-800 border-stone-600 text-white">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Apprentice">Apprentice</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}