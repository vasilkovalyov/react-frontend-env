import React from 'react'
import cn from 'classnames'

type ButtonType = {
    text: string
    type?: 'primary' | 'secondary'
}

const Button = ({ text, type }: ButtonType) => {
    const buttonType = cn({
        'btn--primary': type === 'primary',
        'btn--secondary': type === 'secondary',
    })

    return (
        <button className={`btn ${buttonType}`}>{text}</button>
    )
}

export default Button