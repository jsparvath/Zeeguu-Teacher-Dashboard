import React from 'react'
import clsx from 'clsx'
import './button.scss'

const Button = (
  { className, rounded = false, secondary = false, ...props },
  ref
) => (
  <button 
    ref={ref}
    className={clsx(className, 'ztd-btn', {
      'ztd-btn--secondary': secondary,
      'ztd-btn--rounded': rounded
    })}
    {...props}
  />
)

export default React.forwardRef(Button)
