const Employee = require("./employee.js");
module.exports = class Intern extends Employee{
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumebr = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Intern";
    }
}