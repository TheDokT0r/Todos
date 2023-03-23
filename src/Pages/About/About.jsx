import React, { useEffect } from 'react'
import styles from './About.module.sass'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import getTheme from '../../api/getTheme'
import changeTheme from '../../api/changeTheme'


const cx = classNames.bind(styles)

export default function About() {
    const [isDark, setIsDark] = React.useState(false)


    useEffect(() => {
        const theme = getTheme();
        if (theme === 'dark') {
            setIsDark(true);
        }
    })

    return (
        <div className={cx(styles.body, { [styles.body_dark]: isDark })}>
            <div className={cx(styles.center_div)}>
                <h1 className={styles.title}>About</h1>
                <p className={styles.txt}>This is the TodoList app v1.0.0. I made it cause I was bored af</p>
                <footer>Btw this app saves your todo list on a dedicated server so like... Idk... Have internet at all time or something idfk</footer>

                <Link to='/'>
                    <button>Back</button>
                </Link>

                <button onClick={() => {
                    changeTheme();
                    setIsDark(!isDark);
                }}>Change theme</button>
            </div>
        </div >
    )
}
