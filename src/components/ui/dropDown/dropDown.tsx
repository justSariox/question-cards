import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useNavigate } from 'react-router-dom'

import s from './dropDown.module.scss'

import AvatarIcon from '@/assets/avatar.png'
import { LogOut, More, Person, Trash } from '@/components/ui/assets/svg'
import Edit from '@/components/ui/assets/svg/edit.tsx'
import PlayCircle from '@/components/ui/assets/svg/play-circle.tsx'
import { User } from '@/services/auth/types.ts'

export type DropDownProps = {
  className?: string
  onChange?: () => void
  isProfile?: boolean
  children?: ReactNode
  user?: User
  deckId: string | undefined
}
export const DropDown = ({
  isProfile = false,
  onChange,
  children,
  user,
  deckId,
}: DropDownProps) => {
  const navigate = useNavigate()

  const goLearnCards = () => {
    navigate(`/decks/${deckId}/learn`)
  }
  const goToMyProfile = () => {
    navigate(`/my-profile`)
  }

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
                  <img
                    alt={'Avatar'}
                    src={user?.avatar ? user.avatar : AvatarIcon}
                    className={s.avatarIcon}
                  />
                  <div className={s.profileNameAndMailWrapper}>
                    <div className={s.profileName}>{user?.name ? user.name : 'No name'}</div>
                    <div className={s.profileMail}>{user?.email ? user.email : 'No email'}</div>
                  </div>
                </div>
              </DropdownMenu.Label>
            ) : (
              <DropdownMenu.Item
                className={s.DropdownMenuItem}
                onChange={onChange}
                onClick={goLearnCards}
              >
                <div className={s.optionSetting}>
                  <PlayCircle />
                  <span className={s.optionName}>Learn</span>
                </div>
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
            <DropdownMenu.Item
              className={s.DropdownMenuItem}
              onChange={onChange}
              onClick={goToMyProfile}
            >
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
