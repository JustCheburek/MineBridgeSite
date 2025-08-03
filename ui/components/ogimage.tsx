import { PropsWithChildren } from 'react'
import { MinebridgeSvg } from '@ui/SVGS'

type OGImageBox = { paths?: string[] } & PropsWithChildren
export function OGImageBox({ children, paths }: OGImageBox) {
  return (
    <div
      style={{
        position: 'relative',
        background: `radial-gradient(ellipse at center, #161C1F, #020202)`,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <MinebridgeSvg
        className='absolute left-[30px] top-[30px] size-[80px]'
        style={{
          width: '90px',
          height: '90px',
          position: 'absolute',
          left: '30px',
          top: '30px',
        }}
      />
      {paths && (
        <h4 style={{ fontSize: 50, color: '#D6D6D6', fontWeight: 500, display: 'flex', gap: 6 }}>
          {paths.map((path, index) => (
            <span key={path}>
              {index === 0 ? '' : <span style={{ marginRight: 6 }}>{'>'}</span>}
              {path}
            </span>
          ))}
        </h4>
      )}
      <h1
        style={{
          fontSize: 110,
          color: '#00A7B1',
          fontWeight: 700,
          lineHeight: 0.7,
          marginBottom: 30,
        }}
      >
        MineBridge
      </h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          gap: 0,
          color: '#9C9C9C',
          textAlign: 'center',
          maxWidth: '65%',
          fontWeight: 500,
        }}
      >
        {children}
      </div>
    </div>
  )
}
