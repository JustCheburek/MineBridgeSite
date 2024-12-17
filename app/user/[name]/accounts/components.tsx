"use client";

// Сервер
import type {User} from "lucia";

// Компоненты
import {FormBox, FormButton, FormInput, FormLabel, FormTextarea} from "@components/formBox";
import {Modal, type ModalAction} from "@components/modal";
import {useState} from "react";
import type {isRoles} from "@/services";
import {InputNameCheck, InputNameCheckWithoutState} from "@components/formInputs";
import {H1} from "@components/h1";
import {DeleteUser, UpdateProfile} from "@services/user";
import Link from "next/link";

type SuccessModal = {
    user: User
}

function SuccessModal({modal, setModal, user}: ModalAction & SuccessModal) {
    const [name, setName] = useState("")

    return (
        <Modal modal={modal} setModal={setModal}>
            <H1>Удаление</H1>
            <p>
                Ты уверен, что хочешь
            </p>
            <p>
                удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
            </p>
            <h4>Тогда введи свой <strong className="red_color">ник</strong></h4>
            <FormBox action={() => DeleteUser(user._id)}>
                <InputNameCheck
                    danger placeholder={user.name}
                    autoComplete="off"
                    name={name} setName={setName}
                />
                <FormButton danger disabled={name !== user.name}>
                    Жми, жми!
                </FormButton>
            </FormBox>
        </Modal>
    )
}

function NoPermModal({modal, setModal}: ModalAction) {
    return (
        <Modal modal={modal} setModal={setModal} centerText={false}>
            <H1>Нет прав</H1>
            <p>
                Твой рейтинг меньше 0,
            </p>
            <p>
                поэтому не можешь удалять аккаунт
            </p>
            <Link href="/rules" className="medium-font">
                Как повысить рейтинг?
            </Link>
        </Modal>
    )
}

type DeleteUser = {
    user: User
    isAdmin: boolean
}

export function DeleteUserBox({user, isAdmin}: DeleteUser) {
    const [modal, setModal] = useState(false)
    const access = isAdmin || user.rating >= 0

    return (<>
        <FormBox action={() => setModal(true)}>
            <FormButton danger>
                Удалить аккаунт
            </FormButton>
        </FormBox>
        {access
            ? <SuccessModal
                modal={modal}
                setModal={setModal}
                user={user}
            />
            : <NoPermModal
                modal={modal}
                setModal={setModal}
            />
        }
    </>)
}

type ChangeParam = {
    user: User
    isMe: boolean
} & isRoles

export function ChangeParam(
    {
        user, isHelper, isAdmin,
        isContentMaker,
    }: ChangeParam) {
    const [result, setResult] = useState("")
    const [access, setAccess] = useState(false)
    const ratingAccess = -50

    return (<>
        {user.rating <= ratingAccess &&
          <div className="grid_center">
            <h3>
              У вас рейтинг ниже {ratingAccess}
            </h3>
            <Link href="/rules" className="medium-font">
              Как повысить рейтинг?
            </Link>
          </div>
        }
        <FormBox action={async formData => {
            try {
                await UpdateProfile(user, formData, isAdmin)
            } catch (e) {
                setResult((e as Error).message)
            }
        }}>
            <InputNameCheckWithoutState
                setAccess={setAccess}
                defaultName={user.name}
                disabled={user.rating <= ratingAccess && !isHelper}
            />

            <FormLabel>
                <FormTextarea
                    name="photo"
                    placeholder="Ссылка на аватарку"
                    autoComplete="photo"
                    required
                    maxLength={200}
                    defaultValue={user.photo}
                    disabled={user.rating <= ratingAccess && !isHelper}
                />
            </FormLabel>
            {isAdmin &&
              <FormLabel>
                <FormInput
                  name="mostiki"
                  type="number"
                  placeholder="Мостики"
                  autoComplete="mostiki"
                  required
                  defaultValue={user.mostiki}
                />
              </FormLabel>
            }
            {isContentMaker && <>
              <div className="center_text">
                <h3>
                  Ники
                </h3>
                <p>
                  Нужны <span className="unic_color">уникальные</span> ники,<br/>
                  не отображаемые
                </p>
              </div>
              <FormLabel>
                <FormInput
                  placeholder="Youtube"
                  name="youtube"
                  autoComplete="name"
                  defaultValue={user.socials?.find(({social}) => social === "youtube")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="Twitch"
                  name="twitch"
                  autoComplete="name"
                  defaultValue={user.socials?.find(({social}) => social === "twitch")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="VK"
                  name="vk"
                  autoComplete="name"
                  defaultValue={user.socials?.find(({social}) => social === "vk")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="DonationAlerts"
                  name="donationAlerts"
                  defaultValue={user.socials?.find(({social}) => social === "donationAlerts")?.name}
                />
              </FormLabel>
              <div className="center_text">
                <h3>
                  Ссылки на каналы
                </h3>
              </div>
              <FormLabel>
                <FormInput
                  placeholder="Discord"
                  name="discord"
                  defaultValue={user.socials?.find(({social}) => social === "discord")?.url}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="Telegram"
                  name="telegram"
                  defaultValue={user.socials?.find(({social}) => social === "telegram")?.url}
                />
              </FormLabel>
            </>}
            {result &&
              <strong className="red_color center_text">
                  {result}
              </strong>
            }
            <FormButton disabled={user.rating <= ratingAccess && !isHelper || !access}>
                Сохранить
            </FormButton>
        </FormBox>
    </>)
}