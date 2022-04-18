import React, { useState, useEffect } from 'react'
import './assets/scss/main.scss'

import Image from './assets/images/img.jpg'
import Icon from './assets/images/Icon.svg'

import axios from 'axios'

export const App = () => {
    const [counter, setCounter] = useState<number>(10)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            setPosts(response.data)
        })
    }, [])
    return (
        <>
            <h1>React TypeScript App</h1>
            <img src={Image} alt="img alt" />
            <img src={Icon} alt="img alt" />
            <div className="icon-icon-file"></div>
            <button onClick={() => setCounter(counter + 10)}>Counter {counter}</button>
            {JSON.stringify(posts)}
        </>
    )
}