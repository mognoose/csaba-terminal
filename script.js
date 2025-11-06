document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const preElement = document.querySelector('pre');
    const mainElement = document.querySelector('.main');
    const desktopNav = document.querySelector('nav.desktop');
    const mobileNav = document.querySelector('nav.mobile');

    function generateNavigation() {
        desktopNav.querySelector('ul').innerHTML = '';
        mobileNav.querySelector('ul').innerHTML = '';
        const menu = desktopNav.querySelector('ul');
        const mobileMenu = mobileNav.querySelector('ul');

        links.forEach(option => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = option.value;
            a.innerHTML = (option.icon && window.innerWidth > 500) ? `<i class="${option.icon}"></i>` : option.label;
            if (option.external) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            li.appendChild(a);
            menu.appendChild(li);
            mobileMenu.appendChild(li.cloneNode(true));

        });
    }

    generateNavigation();

    function printOptions() {
        preElement.appendChild(document.createTextNode('\n\nAvailable options:'));
        links.forEach(option => {
            preElement.appendChild(document.createTextNode('\n' + option.id + ') ' + option.label));
        });
        preElement.appendChild(document.createTextNode('\n\nEnter the number of your choice and press Enter:\n\n'));
    }

    function printLogo() {
        preElement.appendChild(document.createTextNode(logo));
    }
    
    printLogo();
    printOptions();

    mainElement.addEventListener('click', () => {
        commandInput.focus();
    });

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputValue = commandInput.value;
            console.log('Command entered:', inputValue);
            commandInput.value = '';

            if (inputValue.length === 1) {
                const selectedOption = links.find(option => option.id === parseInt(inputValue));
                if (selectedOption) {
                    selectedOption.external ? window.open(selectedOption.value) : window.location.href = selectedOption.value;
                } else {
                    preElement.appendChild(document.createTextNode('\n> Invalid option. Please enter a valid number.'));
                    printOptions();
                }
            } else {
                preElement.appendChild(document.createTextNode('\n> Please enter a single number corresponding to the options.'));
                printOptions();
            }

            mainElement.scrollTop = mainElement.scrollHeight;

        }
    });

    window.addEventListener('resize', () => {
        generateNavigation();
    });
        
});