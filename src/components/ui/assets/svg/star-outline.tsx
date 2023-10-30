import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_5928_5114)">
      <path
        d="M17.56 21C17.4001 21.0006 17.2423 20.9629 17.1 20.89L12 18.22L6.9 20.89C6.73439 20.9771 6.54768 21.016 6.36108 21.0022C6.17448 20.9884 5.99548 20.9226 5.84443 20.8122C5.69338 20.7018 5.57634 20.5512 5.50661 20.3776C5.43689 20.2039 5.41727 20.0142 5.45 19.83L6.45 14.2L2.33 10.2C2.20146 10.0717 2.11027 9.91087 2.06623 9.73469C2.02218 9.55852 2.02694 9.37367 2.08 9.2C2.13796 9.02227 2.24458 8.86435 2.38775 8.74416C2.53092 8.62396 2.70492 8.5463 2.89 8.52L8.59 7.69L11.1 2.56C11.1819 2.39093 11.3097 2.24834 11.4689 2.14857C11.6281 2.0488 11.8121 1.99589 12 1.99589C12.1879 1.99589 12.3719 2.0488 12.5311 2.14857C12.6903 2.24834 12.8181 2.39093 12.9 2.56L15.44 7.68L21.14 8.51C21.3251 8.5363 21.4991 8.61396 21.6423 8.73416C21.7854 8.85435 21.892 9.01227 21.95 9.19C22.0031 9.36367 22.0078 9.54852 21.9638 9.72469C21.9197 9.90087 21.8285 10.0617 21.7 10.19L17.58 14.19L18.58 19.82C18.6157 20.0075 18.597 20.2013 18.5261 20.3784C18.4552 20.5556 18.3351 20.7089 18.18 20.82C17.9989 20.9469 17.7809 21.0102 17.56 21ZM12 16.1C12.1603 16.096 12.3189 16.1339 12.46 16.21L16.23 18.21L15.51 14C15.4821 13.8392 15.4939 13.6741 15.5444 13.519C15.595 13.3638 15.6827 13.2234 15.8 13.11L18.8 10.18L14.6 9.56C14.446 9.52899 14.3014 9.46213 14.1781 9.36483C14.0547 9.26754 13.956 9.14255 13.89 9L12 5.25L10.11 9C10.0376 9.1437 9.93169 9.26783 9.80112 9.36184C9.67055 9.45585 9.51923 9.51696 9.36 9.54L5.16 10.16L8.16 13.09C8.27728 13.2034 8.36502 13.3438 8.41556 13.499C8.46611 13.6541 8.47793 13.8192 8.45 13.98L7.73 18.14L11.5 16.14C11.6597 16.0806 11.8328 16.0668 12 16.1Z"
        fill={'#e5ac39'}
      />
    </g>
    <defs>
      <clipPath id="clip0_5928_5114">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
