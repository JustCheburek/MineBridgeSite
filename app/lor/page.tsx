import {MaxSize} from '@components/maxSize'
import {H1} from '@components/h1'
import type {Metadata} from 'next'
import SplashCursor from '@rbits/Animations/SplashCursor/SplashCursor'
import {Img} from "@components/img";

export const metadata: Metadata = {
    title: 'Крафты',
    description: 'Вне времени пройдёшь, cквозь страх и сглаз крафты обретёшь...',
    robots: {index: false}
}

export default function Scientist() {
    return (
        <MaxSize>
            <H1>Крафты</H1>

            <div>
                <Img
                    src="data:image/webp;base64,UklGRpAAAABXRUJQVlA4TIMAAAAvD8ADEE+gmJEkaCTO92Zl1h9gsRS1bcS0tyncazA/qEYCIKFCBM160bPumf8AYGs32vfzSYa6dH+oNjXgtrb2NrmyFnCm5biid6g1BCNoASrXZCjZOY4Q0f8J8EfDUMD2ue72UFfrAlw2IM33ADkeAtLsTY6OgTTzCuRISZqBHIHRjwA="
                    alt="Кирка"
                    width={64}
                    pixel
                />
                <Img
                    src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKMAAAAvD8ADEE+gNAAISbf/aOS/kbhnFDMNkFCTtjQgADcFnJc+ahpJgc7F+XeBBFz8VOCAZv4DAP/2vOgxyMdSZZIdlJQ9cGLbttpcmUgGyYnn2LqOg6u5jtsXV4bxfhhDRP8nAJI7IoVp8vzItFrwZGbJ4MN4Q/vF9K3em9kmgy+wo18970jZDdrV5DtR8c/8/PIH0IzHXwDoiH7MbbVWeRMO/n8AAA=="
                    alt="Тотем"
                    width={64}
                    pixel
                />
                <Img
                    src="data:image/gif;base64,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"
                    alt="Часы"
                    width={64}
                    pixel
                />
                <Img
                    src="data:image/webp;base64,UklGRpIAAABXRUJQVlA4TIUAAAAvD8ADEFegKJKkNnr5FAQwkHmhkI0kOFaLZbjP4dREkqQmDwxcyBS+gZ//AOCBA1hUJwL7+bIO/+O3aAoY1bat5D4aOAzf+hmQACwKOIydCJ8ARNAhVT1CRP8nAH8KccNTr1xOWVgA+JBFSwCPS5XelcmHuazvgoYAxG7oAABHNV2gqvgTAA=="
                    alt="Изумруд"
                    width={64}
                    pixel
                />
                <Img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAY0lEQVR42rWM0RFAMBjGDGUXTx2iG/zTdKNuA3IXAB77BZCcrs3SkpZ/BQXy8qOqmHyqR4IeH0JGqCQE5ZGglJjewORUsWSIM4BTiV8NKOEpA4lmJpcfq5TOhHN4qzNJqgZbAYJT1+QP590GAAAAAElFTkSuQmCC"
                    alt="Железо"
                    width={64}
                    pixel
                />
                <Img
                    src="data:image/webp;base64,UklGRqgAAABXRUJQVlA4TJsAAAAvD8ADEFegqJEkZSXgm0HGST69iiNJSpOnuNsTMkFxJElp8hR3e0ImzH8AADz69Oha5Zw0BF6rr+r9z+7l74Hb1rbb5sq55J9BYQA9gL2z3QtcIO3CDQjVmlUzRPQ/2dURAC0TgJaSD6BUFCaUfPExHx6hxKLQzyn7EnSd/6F81G73Nb3Vau+2v1qVcV9b7Q3cVnsDuPcGgDN2AQA="
                    alt="Книга"
                    width={64}
                    pixel
                />
            </div>

            <SplashCursor/>
        </MaxSize>
    )
}
