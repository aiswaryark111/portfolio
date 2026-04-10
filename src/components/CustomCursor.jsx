import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = `${mouseX - 5}px`
      cursor.style.top = `${mouseY - 5}px`
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        follower.classList.add('hovering')
        cursor.style.transform = 'scale(0)'
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        follower.classList.remove('hovering')
        cursor.style.transform = 'scale(1)'
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX - 16) * 0.12
      followerY += (mouseY - followerY - 16) * 0.12
      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  )
}
