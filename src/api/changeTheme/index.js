const changeTheme = () => {
    const theme = localStorage.getItem('theme');

    switch (theme) {
        case 'dark':
            localStorage.setItem('theme', 'light');
            break;
        case 'light':
            localStorage.setItem('theme', 'dark');
            break;

        //Prob null value or something idk maybe the user broke it somehow
        default:
            localStorage.setItem('theme', 'light');
    }
}

export default changeTheme;