export interface Project {
    projectImage: string;
    headline: string;
    techStack: string;
    description: string;
    liveTestLink: string;
    gitLink: string;
}

export const PROJECTS: Project[] = [
    {
        projectImage: 'assets/img/join-project.png',
        headline: 'Join',
        techStack: 'Angular Typescript HTML CSS Firebase',
        description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        liveTestLink: 'https://milan-moreno.developerakademie.net/JOIN%20Projekt%20Okt-Nov%202024/index.html',
        gitLink: 'https://github.com/MilanMoreno/Portfolio'
    },
    {
        projectImage: 'assets/img/Polloloco1.png',
        headline: 'Pollo Loco',
        techStack: 'JavaScript HTML CSS',
        description: 'A web-based game where you control your character to fight various enemies with different abilities. The ultimate goal is to defeat the final boss.',
        liveTestLink: 'https://milan-moreno.developerakademie.net/PolloLoco_/index.html',
        gitLink: 'https://github.com/MilanMoreno/Portfolio'
    },
    {
        projectImage: 'assets/img/pokedex-project.png', 
        headline: 'Pokedex',
        techStack: 'JavaScript HTML CSS API',
        description: 'A comprehensive collection of all existing Pokémon, complete with detailed descriptions of their characteristics, abilities, and unique attributes, accessible via an API.',
        liveTestLink: 'https://milan-moreno.developerakademie.net/pokedex/index.html',
        gitLink: 'https://github.com/MilanMoreno/Pokedex'
    },
    {
        projectImage: 'assets/img/quiz-app-project.png',
        headline: 'QuizApp',
        techStack: 'JavaScript HTML CSS',
        description: 'A small, simple multiple-choice quiz function designed to enhance learning through interactive questions and answers.',
        liveTestLink: 'https://milan-moreno.developerakademie.net/quizApp/index.html',
        gitLink: 'https://github.com/MilanMoreno/Quizapp'
    },
];
