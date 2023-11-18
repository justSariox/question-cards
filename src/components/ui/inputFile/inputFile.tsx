import { useController } from 'react-hook-form'

import s from './inputFile.module.css'

import { ImageIcon } from '@/components/ui/assets/svg'

type PropsType = {
  inputName: string
  control: any
  defaultValue: string | undefined | null
}

export const InputFile = ({ inputName, control, defaultValue }: PropsType) => {
  const {
    field: { onChange, value },
  } = useController({
    name: inputName,
    control,
    defaultValue,
  })

  return (
    <div className={s.fileUpload}>
      <label>
        <input
          type={'file'}
          name={inputName}
          multiple
          accept={'image/*'}
          onChange={onChange}
          value={value}
        />
        <div className={s.iconUpload}>
          <ImageIcon />
          <span>Change Cover</span>
        </div>
      </label>
    </div>
  )
}
