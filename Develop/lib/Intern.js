const Employee = require("./Employee");
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
}

module.exports = Intern;

const intern = new Intern("Atul Mahajan", 101, "luta_atul@hotmail.com", "OSPS");

console.log("Name is: from Intern class: ", intern.name);
console.log("School is: from Intern class function: ", intern.getSchool());

console.log("Id is: from Employee class: ", intern.getId());
console.log(`Email is: from Employee class: ${intern.getEmail()}`);

console.log(`Role is: ${intern.getRole()}`);
