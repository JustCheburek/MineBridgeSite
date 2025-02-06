"use client";

// Сервер
import type {User} from "lucia";

// Компоненты
import {FormBox, FormButton, FormInput, FormLabel, FormTextarea} from "@components/formBox";
import {Modal, type ModalAction} from "@components/modal";
import {useState} from "react";
import type {ChangeEvent} from "react";
import {InputNameCheck, InputNameCheckWithoutState} from "@components/formInputs";
import {H1} from "@components/h1";
import {DeleteUser, UpdateProfile} from "@services/user";
import Link from "next/link";
import {ImgUpload} from "@components/imgUpload";
import {useEdgeStore} from "@/lib/edgestore"

type SuccessModal = {
    user: User
}

function SuccessModal({modal, setModal, user}: ModalAction & SuccessModal) {
    const [name, setName] = useState("")
    const {edgestore} = useEdgeStore()

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
            <FormBox action={async () => {
                await edgestore.publicFiles.delete({
                    url: user.photo,
                });
                await DeleteUser(user._id)
            }}>
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
                Твои звёзды меньше 0,
            </p>
            <p>
                поэтому не можешь удалять аккаунт
            </p>
            <Link href="/rules" className="medium-font">
                Как повысить звёзды?
            </Link>
        </Modal>
    )
}

type DeleteUser = {
    user: User
    access: boolean
}

export function DeleteUserBox({user, access}: DeleteUser) {
    const [modal, setModal] = useState(false)

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
    isAdmin: boolean
    isHelper: boolean
    isContentMaker: boolean
}

export function ChangeParam(
    {
        user, isHelper, isAdmin,
        isContentMaker,
    }: ChangeParam) {
    const [result, setResult] = useState("")
    const [access, setAccess] = useState(false)
    const ratingAccess = -50

    const {edgestore} = useEdgeStore()
    const [file, setFile] = useState<File>()
    type Urls = {
        photo?: string
        thumbnail?: string
    }
    const [urls, setUrls] = useState<Urls>({
        thumbnail: user.photo
    })

    return (<>
        {user.rating <= ratingAccess &&
          <div className="grid_center">
            <h3>
              У вас звёзды ниже {ratingAccess}
            </h3>
            <Link href="/rules" className="medium-font">
              Как повысить звёзды?
            </Link>
          </div>
        }
        <FormBox action={async formData => {
            if (urls.photo) {
                if (user.fullPhoto) {
                    await edgestore.publicFiles.delete({
                        url: user.fullPhoto
                    });
                }

                await edgestore.publicFiles.confirmUpload({
                    url: urls.photo,
                });
            }

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
            <ImgUpload
                value={file}
                onChange={async (file) => {
                    setFile(file)
                    if (file) {
                        const photo = await edgestore.publicFiles.upload({
                            file,
                            input: {type: "profile"},
                            options: {
                                replaceTargetUrl: urls.photo,
                                temporary: true
                            }
                        })
                        setUrls({
                            photo: photo.url,
                            thumbnail: photo.thumbnailUrl || photo.url
                        })
                    }
                }}
                dropzoneOptions={{
                    maxSize: 1024 * 1024 * 2, // 2MB
                }}
                disabled={user.rating <= ratingAccess && !isHelper}
            />
            <FormLabel>
                <FormTextarea
                    name="photo"
                    placeholder="Ссылка на аватарку"
                    autoComplete="photo"
                    required
                    maxLength={1000}
                    value={urls.thumbnail}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setUrls(prev => ({
                            ...prev,
                            thumbnail: e.target.value
                        }))
                    }
                    disabled={user.rating <= ratingAccess && !isHelper}
                />
            </FormLabel>

            <FormTextarea
                name="fullPhoto"
                value={urls.photo || ""}
                style={{display: "none"}}
            />

            {isAdmin &&
              <FormLabel>
                <FormInput
                  name="mostiki"
                  type="number"
                  placeholder="Мостики"
                  autoComplete="mostiki"
                  required
                  defaultValue={user.mostiki}
                  title="Мостики"
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
                  title="Ютуб"
                  defaultValue={user.socials?.find(({social}) => social === "youtube")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="Twitch"
                  name="twitch"
                  autoComplete="name"
                  title="Твич"
                  defaultValue={user.socials?.find(({social}) => social === "twitch")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="VK"
                  name="vk"
                  autoComplete="name"
                  title="Вк"
                  defaultValue={user.socials?.find(({social}) => social === "vk")?.name}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="DonationAlerts"
                  name="donationAlerts"
                  autoComplete="name"
                  title="DonationAlerts"
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
                  title="Дискорд"
                  defaultValue={user.socials?.find(({social}) => social === "discord")?.url}
                />
              </FormLabel>
              <FormLabel>
                <FormInput
                  placeholder="Telegram"
                  name="telegram"
                  title="Телеграм"
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