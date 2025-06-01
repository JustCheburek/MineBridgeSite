"use client";

import { Button } from "@/ui/components/button";
import { BuyModal } from "@/ui/components/modals/buy";
import { useState } from "react";
import type { User } from "lucia";
import { Img } from "@/ui/components/img";
import { ImgBox } from "@/ui/components/img";
import { Box } from "@/ui/components/shop";
import { Text } from "@/ui/components/shop";
import { Price } from "@/ui/components/shop";
import styles from "./shop.module.scss";

export function PreSeason({ author }: { author: User | null }) {
    const [modal, setModal] = useState(false)

    return (<>
        <ImgBox
            type="post"
            borderRadius="all"
        >
            <Img
                src="/shop/preseason.jpg" alt="Проходка на межсезонье"
            />
            <Box className={styles.box}>
                <Text className={styles.text}>
                    <h3 className="center_text">Межсезонье</h3>
                    <Price>100</Price>
                    {author
                        ? <Button margin="10px" onClick={() => setModal(true)}>
                            Купить
                        </Button>
                        : <Button margin="10px">
                            Войти
                        </Button>
                    }
                </Text>
            </Box>
        </ImgBox>
        {author &&
            <BuyModal modal={modal} setModal={setModal} author={author} />
        }
    </>)
}