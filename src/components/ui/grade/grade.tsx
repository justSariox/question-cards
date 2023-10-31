import { Star, StarOutline } from '@/components/ui/assets/svg'

export const Grade = (props: { gradeValue: number }) => {
  const { gradeValue } = props

  return (
    <div>
      {gradeValue >= 1 ? <Star /> : <StarOutline />}
      {gradeValue >= 2 ? <Star /> : <StarOutline />}
      {gradeValue >= 3 ? <Star /> : <StarOutline />}
      {gradeValue >= 4 ? <Star /> : <StarOutline />}
      {gradeValue === 5 ? <Star /> : <StarOutline />}
    </div>
  )
}
