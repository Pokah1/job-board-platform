export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
] as const

export const EMPLOYMENT_TYPE_STYLES = {
  "full-time": "bg-green-100 text-green-800",
  "part-time": "bg-blue-100 text-blue-800",
  contract: "bg-purple-100 text-purple-800",
  freelance: "bg-orange-100 text-orange-800",
  internship: "bg-pink-100 text-pink-800",
  default: "bg-gray-100 text-gray-800",
} as const

export const formatSalary = (min: string, max: string) => {
  const minNum = Number.parseFloat(min)
  const maxNum = Number.parseFloat(max)
  return `$${minNum.toLocaleString()} - $${maxNum.toLocaleString()}`
}

export const getExperienceLabel = (level: string) => {
  return EXPERIENCE_LEVELS.find((exp) => exp.value === level)?.label || level
}

export const getEmploymentTypeStyle = (type: string) => {
  return (
    EMPLOYMENT_TYPE_STYLES[type.toLowerCase() as keyof typeof EMPLOYMENT_TYPE_STYLES] || EMPLOYMENT_TYPE_STYLES.default
  )
}
