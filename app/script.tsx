'use client'

import { useEffect } from 'react'

export function Metrika() {
  useEffect(() => {
    window.addEventListener('scroll', metrica, { once: true })
    return () => window.removeEventListener('scroll', metrica)
  })

  function metrica() {
    setTimeout(() => {
      ; (function (m, e, t, r, i, k, a) {
        // @ts-ignore
        m[i] =
          m[i] ||
          function () {
            // @ts-ignore
            ; (m[i].a = m[i].a || []).push(arguments)
          }
        // @ts-ignore
        m[i].l = 1 * new Date()
        for (let j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return
          }
        }
        // @ts-ignore
        ; ((k = e.createElement(t)),
          // @ts-ignore
          (a = e.getElementsByTagName(t)[0]),
          // @ts-ignore
          (k.async = 1),
          // @ts-ignore
          (k.src = r),
          // @ts-ignore
          a.parentNode.insertBefore(k, a))
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

      // @ts-ignore
      ym(91732193, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      })
    }, 1000)
  }

  return <></>
}
