document.addEventListener('DOMContentLoaded', () => {
    const options = [
        { id: 1, label: 'NAS', value: 'http://sapatti.synology.me:5000/' },
        { id: 2, label: 'Photos', value: 'http://sapatti.synology.me:8080/photo' },
        { id: 3, label: 'Home Assistant', value: 'http://sapatti.synology.me:8123/' },
        { id: 4, label: 'GitHub', value: 'https://github.com/mognoose', external: true, icon: 'fab fa-github' },
        { id: 5, label: 'LinkedIn', value: 'https://www.linkedin.com/in/csaba-szilagyi/', external: true, icon: 'fab fa-linkedin' },
    ]
    const commandInput = document.getElementById('commandInput');
    const preElement = document.querySelector('pre');
    const mainElement = document.querySelector('.main');

    function generateNavigation() {
        const ul = document.querySelector('nav ul');
        options.forEach(option => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = option.value;
            a.innerHTML = option.icon ? `<i class="${option.icon}"></i>` : option.label;
            if (option.external) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    generateNavigation();

    function printOptions() {
        preElement.appendChild(document.createTextNode('\n\nAvailable options:'));
        options.forEach(option => {
            preElement.appendChild(document.createTextNode('\n' + option.id + ') ' + option.label));
        });
        preElement.appendChild(document.createTextNode('\n\nEnter the number of your choice and press Enter:\n\n'));
    }
    
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
                const selectedOption = options.find(option => option.id === parseInt(inputValue));
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
});