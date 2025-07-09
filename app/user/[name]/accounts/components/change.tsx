'use client'

// Сервер
import type { User } from 'lucia'

// Компоненты
import { Form, FormInput, FormLabel, FormTextarea } from '@components/form'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { InputNameCheck, InputNameCheckWithoutState } from '@components/inputName'
import { UpdateProfile } from '@services/user/update'
import { DeleteUser } from '@services/user/delete'
import Link from 'next/link'
import { ImgUpload } from '@components/imgUpload'
import { useEdgeStore } from '@/lib/edgestore'
import { Modal, type ModalAction } from '@components/modal'
import { HookButton } from '@components/hookbutton'

type Modal = {
  user: User
}

function DeleteModal({ modal, setModal, user }: ModalAction & Modal) {
  const [name, setName] = useState('')
  const { edgestore } = useEdgeStore()

  return (
    <Modal modal={modal} setModal={setModal}>
      <h1>Удаление</h1>
      <p>Ты уверен, что хочешь</p>
      <p>
        удалить аккаунт <strong className='text-red'>безвозвратно</strong>?
      </p>
      <h4>
        Тогда введи <strong className='text-red'>ник</strong>
      </h4>
      <Form
        action={async () => {
          try {
            await edgestore.publicFiles.delete({
              url: user.photo,
            })
          } catch (e) {
            console.error(e)
          }

          await DeleteUser(user._id)
        }}
      >
        <InputNameCheck
          danger
          placeholder={user.name}
          autoComplete='off'
          name={name}
          setName={setName}
        />
        <HookButton danger disabled={name !== user.name}>
          Жми, жми!
        </HookButton>
      </Form>
    </Modal>
  )
}

type DeleteUser = {
  user: User
}

export function DeleteUserBox({ user }: DeleteUser) {
  const [modal, setModal] = useState(false)

  return (
    <>
      <Form action={() => setModal(true)}>
        <HookButton danger>Удалить аккаунт</HookButton>
      </Form>
      <DeleteModal modal={modal} setModal={setModal} user={user} />
    </>
  )
}

type ChangeParam = {
  user: User
  isMe: boolean
  isAdmin: boolean
  isHelper: boolean
  isContentMaker: boolean
}

export function ChangeForm({ user, isHelper, isAdmin, isContentMaker }: ChangeParam) {
  const [result, setResult] = useState('')
  const ratingAccess = -50

  const { edgestore } = useEdgeStore()
  const [file, setFile] = useState<File>()
  type Urls = {
    photo?: string
    thumbnail?: string
  }
  const [urls, setUrls] = useState<Urls>({
    thumbnail: user.photo,
  })

  return (
    <>
      {user.rating <= ratingAccess && (
        <div className='grid place-items-center'>
          <h3>Твои звёзды ниже {ratingAccess}</h3>
          <Link href='/rules' className='font-medium'>
            Как повысить звёзды?
          </Link>
        </div>
      )}
      <Form
        action={async formData => {
          if (urls.photo) {
            if (user.fullPhoto) {
              await edgestore.publicFiles.delete({
                url: user.fullPhoto,
              })
            }

            await edgestore.publicFiles.confirmUpload({
              url: urls.photo,
            })
          }

          try {
            await UpdateProfile(user, formData, isAdmin)
          } catch (e) {
            setResult((e as Error).message)
          }
        }}
      >
        <InputNameCheckWithoutState
          defaultName={user.name}
          disabled={user.rating <= ratingAccess && !isHelper}
        />
        <ImgUpload
          value={file}
          onChange={async file => {
            setFile(file)
            if (file) {
              const photo = await edgestore.publicFiles.upload({
                file,
                input: { type: 'profile' },
                options: {
                  replaceTargetUrl: urls.photo,
                  temporary: true,
                },
              })
              setUrls({
                photo: photo.url,
                thumbnail: photo.thumbnailUrl || photo.url,
              })
            }
          }}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 2, // 2MB
          }}
          disabled={user.rating <= ratingAccess && !isHelper}
        />
        <FormTextarea
          name='photo'
          placeholder='Ссылка на аватарку'
          autoComplete='photo'
          required
          maxLength={1000}
          value={urls.thumbnail}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setUrls(prev => ({
              ...prev,
              thumbnail: e.target.value,
            }))
          }
          disabled={user.rating <= ratingAccess && !isHelper}
        />

        <FormTextarea
          name='fullPhoto'
          value={urls.photo || ''}
          disabled
          style={{ display: 'none' }}
        />

        {isAdmin && (
          <FormLabel>
            <FormInput
              name='mostiki'
              type='number'
              placeholder='Мостики'
              autoComplete='mostiki'
              min={0}
              defaultValue={user.mostiki}
              title='Мостики'
            />
          </FormLabel>
        )}
        {isContentMaker && (
          <>
            <div className='text-center'>
              <h3>Ники</h3>
              <p>
                Нужны <span className='text-unic'>уникальные</span> ники,
                <br />
                не отображаемые
              </p>
            </div>
            <FormLabel>
              <FormInput
                placeholder='Youtube'
                name='youtube'
                autoComplete='name'
                title='Ютуб'
                defaultValue={user.socials?.find(({ social }) => social === 'youtube')?.name}
              />
            </FormLabel>
            <FormLabel>
              <FormInput
                placeholder='Twitch'
                name='twitch'
                autoComplete='name'
                title='Твич'
                defaultValue={user.socials?.find(({ social }) => social === 'twitch')?.name}
              />
            </FormLabel>
            <FormLabel>
              <FormInput
                placeholder='VK'
                name='vk'
                autoComplete='name'
                title='Вк'
                defaultValue={user.socials?.find(({ social }) => social === 'vk')?.name}
              />
            </FormLabel>
            <FormLabel>
              <FormInput
                placeholder='DonationAlerts'
                name='donationAlerts'
                autoComplete='name'
                title='DonationAlerts'
                defaultValue={user.socials?.find(({ social }) => social === 'donationAlerts')?.name}
              />
            </FormLabel>
            <div className='text-center'>
              <h3>Ссылки на каналы</h3>
            </div>
            <FormLabel>
              <FormInput
                placeholder='Discord'
                name='discord'
                title='Дискорд'
                defaultValue={user.socials?.find(({ social }) => social === 'discord')?.url}
              />
            </FormLabel>
            <FormLabel>
              <FormInput
                placeholder='Telegram'
                name='telegram'
                title='Телеграм'
                defaultValue={user.socials?.find(({ social }) => social === 'telegram')?.url}
              />
            </FormLabel>
          </>
        )}
        {result && <strong className='text-red text-center'>{result}</strong>}
        <HookButton disabled={user.rating <= ratingAccess && !isHelper}>Сохранить</HookButton>
      </Form>
    </>
  )
}
