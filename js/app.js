class Skill {

    constructor(name, score) {
        this._name = name;
        this._score = score; 
    }

    get name() {return this._name}
    get score() {return this._score}
}

class SkillGroup {

    constructor(name, skills) {
        this._name = name;
        this._skills = skills;
    }

    get name() {return this._name}
    get skills() {return this._skills}
}

class Terminal {

    constructor() {
        this.skills = [
            new SkillGroup('Development', [
                new Skill('Java', 90), 
                new Skill('Python', 80), 
                new Skill('Javascript', 75), 
                new Skill('C#', 70),
                new Skill('HTML5 / CSS3', 70),
                new Skill('Kotlin', 70)
            ]),
            new SkillGroup('IT Operations', [
                new Skill('Linux', 85),
                new Skill('Windows Server', 75), 
                new Skill('SQL', 75),
                new Skill('Cisco IOS', 70),
                new Skill('Docker', 80),
                new Skill('Network technologies', 70)
            ]),
        ];
        this.commands = {
            'about': 'Info over mij',
            'skills': 'Overview van mijn vaardigheden',
            'projects': 'Overview van mijn projecten',
            'clear': 'Terminal opkuisen'
        }
        this.contactLinks = {
            'LinkedIn': 'https://www.linkedin.com/in/maurits-monteyne-b5a399197',
            'Github': 'https://github.com/MauritsMonteyne'
        }
        this.commandHistory = [];
        this.historyIndex = 0;
    }

    typingEffect() {

    }

    commandToHtml(command) {

        const output = document.createElement('div');
        output.classList.add('term-output')

        switch (command.toLowerCase()) {
            case 'help':
                output.appendChild(this.getHelpOverview())
                break;
            case 'about':
                output.appendChild(this.getAboutOverview())
                break;
            case 'skills':
                output.appendChild(this.getSkillsOverview())
                break;
            case 'projects':
                output.appendChild(this.getProjectsOverview())
                break;
            case 'ping':
                const p = document.createElement('p');
                p.textContent = 'Pong!'
                output.appendChild(p);
                break;
            case 'clear':
                document.querySelectorAll('.term-output, .term-out-command').forEach(e => e.remove());
                break;                
            default:
                const error = document.createElement('p');
                error.classList.add('term-error');
                error.textContent = `command not found: ${command}`;
                
                const help = document.createElement('p');
                help.textContent = 'Type \'help\' to view a list of available commands';

                output.appendChild(error);
                output.appendChild(help)
        }

        return output
    }

    getHelpOverview() {
        const descList = document.createElement('dl');

        Object.entries(this.commands).forEach(([key, value]) => {
            
            const cName = document.createElement('dt');
            cName.textContent = key;

            const cDesc = document.createElement('dd');
            cDesc.textContent = value;

            descList.appendChild(cName);
            descList.appendChild(cDesc);
        });

        return descList;
    }

    getAboutOverview() {
        const div = document.createElement('div');
        const p0 = document.createElement('p');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');

        p0.innerHTML = 'Hallo, ik ben <span class="glow-white">Maurits Monteyne</span>.';

        p1.innerHTML = 'Ik ben een gemotiveerde student Toegepaste Informaticaaan Hogent die momenteel in zijn laatste jaar zit. Binnende opleiding ligt mijn focus hoofdzakelijk op systeem -ennetwerkbeheer, maar daarnaast volg ik ook Androiddevelopment omdat software development mij enorminteresseert.';

        p2.innerHTML = 'Mezelf kan ik het best omschrijven als een rustig engeduldig persoon met een passie voor het oplossen vanproblemen en het verbeteren van processen. Verder benik steeds benieuwd hoe dingen werken en leer ik graagnieuwe zaken bij, dit zowel binnen IT als er buiten.';

        p3.innerHTML = 'Via onderstaande links kun je mij contacteren op LinkedIn of eens kijken naar mijn Github repositories.'

        div.appendChild(p0);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);



        const descList = document.createElement('dl');

        Object.entries(this.contactLinks).forEach(([key, value]) => {
            
            const cName = document.createElement('dt');
            cName.textContent = key;

            const cDesc = document.createElement('dd');
            const a = document.createElement('a');
            a.href = value;
            a.textContent = value;
            a.target= '_blank';

            cDesc.appendChild(a);

            descList.appendChild(cName);
            descList.appendChild(cDesc);
        });

        div.appendChild(descList);


        return div;
    }

    getProjectsOverview() {

        const div = document.createElement('div');
        const p1 = document.createElement('p');
        p1.innerHTML = 'Ik heb momenteel geen projecten publiek staan.';

        div.appendChild(p1);

        // TODO: Show Github link or not?
        // const descList = document.createElement('dl');
        // const cName = document.createElement('dt');
        // cName.textContent = 'Github';

        // const cDesc = document.createElement('dd');
        // const a = document.createElement('a');
        // a.href = this.contactLinks.Github;
        // a.textContent = this.contactLinks.Github;
        // a.target= '_blank';

        // cDesc.appendChild(a);

        // descList.appendChild(cName);
        // descList.appendChild(cDesc);

        // div.appendChild(descList);


        return div;
    }

    getSkillsOverview() {
        const skillDiv = document.createElement('div');

        this.skills.forEach(skillgroup => {
            
            const gName = document.createElement('p');
            gName.innerHTML = `--- ${skillgroup.name} ---`;

            const descList = document.createElement('dl');

            skillDiv.appendChild(gName);
            skillDiv.appendChild(descList);


            skillgroup.skills.forEach(skill => {
                
                const sName = document.createElement('dt');
                sName.textContent = skill.name;
    
                const span = document.createElement('span');
                span.classList.add('glow-green'); // TODO: color grading 75 green, 60 light-green?
                span.textContent = '#'.repeat(skill.score / 5);
                
                const sDesc = document.createElement('dd');
                sDesc.innerHTML = `[${span.outerHTML}${'.'.repeat(20 - skill.score / 5)}] ${skill.score}%`;
    
                descList.appendChild(sName);
                descList.appendChild(sDesc);
            });
        })

        return skillDiv;
    }

    getPromptWithCommand(command) {

        const prompt = document.createElement('div');
        prompt.classList.add('term-out-command');

        // Prevent injection
        const span = document.createElement('span');
        span.textContent = `> ${command}`;

        prompt.appendChild(span);

        return prompt;
    }

}


const banner = `.___  ___.      ___      __    __  .______     __  .___________.    _______.
|   \\/   |     /   \\    |  |  |  | |   _  \\   |  | |           |   /       |       
|  \\  /  |    /  ^  \\   |  |  |  | |  |_)  |  |  | \`---|  |----\`  |   (----\`       
|  |\\/|  |   /  /_\\  \\  |  |  |  | |      /   |  |     |  |        \\   \\           
|  |  |  |  /  _____  \\ |  \`--'  | |  |\\  \\--.|  |     |  |    .----)   |          
|__|  |__| /__/     \\__\\ \\______/  | _| \`.___||__|     |__|    |_______/           

.___  ___.   ______   .__   __. .___________. ___________    ____ .__   __.  _______ 
|   \\/   |  /  __  \\  |  \\ |  | |           ||   ____\\   \\  /   / |  \\ |  | |   ____|
|  \\  /  | |  |  |  | |   \\|  | \`---|  |----\`|  |__   \\   \\/   /  |   \\|  | |  |__   
|  |\\/|  | |  |  |  | |  . \`  |     |  |     |   __|   \\_    _/   |  . \`  | |   __|  
|  |  |  | |  \`--'  | |  |\\   |     |  |     |  |____    |  |     |  |\\   | |  |____ 
|__|  |__|  \\______/  |__| \\__|     |__|     |_______|   |__|     |__| \\__| |_______|   
`
                                                                                     


const init = function () {

    let commandHistory = [''];
    let historyIndex = 0;

    const termBanner = document.getElementById('term-banner');
    termBanner.textContent = banner;
    const termInput = document.getElementById('term-input');
    const termPrompt = document.getElementById('term-prompt')

    const terminal = new Terminal();

    // Keep focus on input field
    document.getElementById('container').onclick = (evt) => {
        termInput.focus();
    }

    termInput.focus();

    termInput.addEventListener('keydown', event => {

        if (event.key === 'Enter') {
            event.preventDefault();
            
            const command = termInput.value;
            termPrompt.insertAdjacentElement('beforebegin', terminal.getPromptWithCommand(command));
            termPrompt.insertAdjacentElement('beforebegin', terminal.commandToHtml(command));
            termInput.value = '';
            commandHistory.unshift(command);

            termPrompt.scrollIntoView();
            console.log(command);
        }

        // TODO: fix command history
        // if (event.key === 'ArrowUp') {

        //     if (commandHistory[historyIndex + 1] !== undefined) {
        //         console.log(commandHistory[historyIndex + 1]);
        //         historyIndex++;
        //         termInput.value = commandHistory[historyIndex];
        //         console.log(termInput.scrollWidth);
        //         termInput.scrollLeft = termInput.scrollWidth;
        //     }

        // }

        // if (event.key === 'ArrowDown') {

        //     if (commandHistory[historyIndex - 1] !== undefined) {
        //         console.log(commandHistory[historyIndex - 1]);
        //         historyIndex--;
        //         termInput.value = commandHistory[historyIndex];
        //         console.log(termInput.scrollWidth);
        //         termInput.scrollLeft = termInput.scrollWidth;
        //     }
        // }
    });
  };
  
window.onload = init;