 const inquirer = require("inquirer");
const Manager  = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern   = require("./lib/intern");
const render   = require("./htmlRenderer");
const fs       = require("fs");
const myTeam   = [];


function newManager() { 
    inquirer
        .prompt([    
            {
                type: "input",
                message: "Manager: Enter your name to start building your team.",
                name: "managerName",
                validate: function(text) {
                    if (text === "") {
                      return 'You must enter a name.';
                    }     
                    return true;
                  },
            },   
            {
                type: "input",
                message: "What is your employee ID number?",
                name: "managerId",
                validate: function(text) {
                    if (text === "") {
                      return 'You must enter your employee ID.';
                    }     
                    return true;
                  },
            },   
            {
                type: "input",
                message: "What is your email?",
                name: "managerEmail",
                validate: function(value) {
                    var pass = value.match(
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    );
                    if (pass) {
                      return true;
                    }         
                    return 'Please enter a valid email address.';
                }, 
            },    
            {
                type: "input",
                message: "What is your office number?",
                name: "managerOffice",
                validate: function(text) {
                    if (text === "") {
                      return 'You must enter your office number.';
                    }     
                    return true;
                  },
            }  
        ]).then(response => {

            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice);
            myTeam.push(manager)
            console.table(myTeam);
            makeTeam();
        })
    }

newManager();

function makeTeam () {
    
    inquirer
        .prompt([
            {
                type: "list",
                name: "teamRole",
                message: "Please select an employee role to add a teammate. Select end to finalize your team",
                choices: [
                    "Engineer",
                    "Intern",
                    "End"
                ]
            }
        ])
        .then(response => {

            if (response.teamRole === "Engineer") {
                makeEngineer();
            } 
            else if(response.teamRole === "Intern"){
                makeIntern();
            }
            else if(response.teamRole === "End"){
                render(myTeam);
            } 
            }           
        )};

        function makeEngineer() { 
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What the engineer's name?",
                        name: "engineerName",
                        validate: function(text) {
                            if (text === "") {
                              return "You must enter a name.";
                            }     
                            return true;
                          },
                    },   
                    {
                        type: "input",
                        message: "What is your teammate's employee Id?",
                        name: "engineerId",
                        validate: function(text) {
                            if (text === "") {
                              return "You must enter your teammate's employee ID number.";
                            }     
                            return true;
                          },
                    },   
                    {
                        type: "input",
                        message: "What is their email adress?",
                        name: "engineerEmail",
                        validate: function(value) {
                            var pass = value.match(
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            );
                            if (pass) {
                              return true;
                            }         
                            return "Please enter a valid email address.";
                        }, 
                    },    
                    {
                        type: "input",
                        message: "What is their GitHub ID?",
                        name: "engineerGitHub",
                        validate: function(text) {
                            if (text === "") {

                              return "You must enter a GitHub ID.";
                            }     
                            return true;
                          },
                    }  
                ]).then(response => {
    
                    const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
                    myTeam.push(engineer)
                    console.table(myTeam)
                    makeTeam();
                })
        }    
        
        function makeIntern() { 
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the Intern's name?",
                        name: "internName",
                        validate: function(text) {
                            if (text === "") {
                              return "You must enter a name.";
                            }     
                            return true;
                          },
                    },   
                    {
                        type: "input",
                        message: "What is your teammate's employee ID number?",
                        name: "internId",
                        validate: function(text) {
                            if (text === "") {
                              return "You must enter a employee ID.";
                            }     
                            return true;
                          },
                    },   
                    {
                        type: "input",
                        message: "What is their email?",
                        name: "internEmail",
                        validate: function(value) {
                            var pass = value.match(
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            );
                            if (pass) {
                              return true;
                            }         
                            return 'Please enter a valid email address.';
                        }, 
                    },    
                    {
                        type: "input",
                        message: "What school did they attend?",
                        name: "internSchool",
                        validate: function(text) {
                            if (text === "") {
                              return 'You must enter a school.';
                            }     
                            return true;
                          },
                    }  
                ]).then(response => {
                    
                    const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
    
                    myTeam.push(intern)
                    console.table(myTeam);
    
                    makeTeam();
                })
        }               
    
    

