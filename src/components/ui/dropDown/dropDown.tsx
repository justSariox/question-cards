import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDown.module.scss'

import avatar from '@/components/auth/assets/svg/avatar.svg'
import { LogOut, More, Person, Trash } from '@/components/ui/assets/svg'
import Edit from '@/components/ui/assets/svg/edit.tsx'
import PlayCircle from '@/components/ui/assets/svg/play-circle.tsx'

export type DropDownProps = {
  className?: string
  onChange?: () => void
  isProfile?: boolean
  children?: ReactNode
}
export const DropDown = ({ isProfile = false, onChange, children }: DropDownProps) => {
  return (
    <div className={s.mainContainer}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={s.IconButton}>{isProfile ? children : <More />}</button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            {isProfile ? (
              <DropdownMenu.Label className={s.DropdownMenuLabel}>
                <div className={s.profileInfo}>
                  <img src={avatar} alt="avatar" className={s.avatarIcon} />
                  <div className={s.profileNameAndMailWrapper}>
                    <div className={s.profileName}>Ivan</div>
                    <div className={s.profileMail}>j&johnson@gmail.com</div>
                  </div>
                </div>
              </DropdownMenu.Label>
            ) : (
              <DropdownMenu.Item className={s.DropdownMenuItem} onChange={onChange}>
                <div className={s.optionSetting}>
                  <PlayCircle />
                  <span className={s.optionName}>Learn</span>
                </div>
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
            <DropdownMenu.Item className={s.DropdownMenuItem} onChange={onChange}>
              <div>
                {isProfile ? (
                  <div className={s.optionSetting}>
                    <Person />
                    <span className={s.optionName}>My profile</span>
                  </div>
                ) : (
                  <div className={s.optionSetting}>
                    <Edit />
                    <span className={s.optionName}>Edit</span>
                  </div>
                )}
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
            <DropdownMenu.Item className={s.DropdownMenuItem} onChange={onChange}>
              <div>
                {isProfile ? (
                  <div className={s.optionSetting}>
                    <LogOut />
                    <span className={s.optionName}>Sign Out</span>
                  </div>
                ) : (
                  <div className={s.optionSetting}>
                    <Trash />
                    <span className={s.optionName}>Delete</span>
                  </div>
                )}
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow
              className={isProfile ? s.DropdownMenuArrowProfile : s.DropdownMenuArrow}
              height={8}
              width={16}
            />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
