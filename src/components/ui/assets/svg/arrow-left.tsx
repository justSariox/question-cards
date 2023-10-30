import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={6}
    height={8}
    viewBox="0 0 6 8"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M5.27331 7.06L2.21998 4L5.27331 0.94L4.33331 0L0.333313 4L4.33331 8L5.27331 7.06Z"
      fill={props.fill ? props.fill : 'white'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
