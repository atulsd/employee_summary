const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");

const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

class Getdetails {
  constructor() {
    this.employees = [];
  }

  async askBasicinfo() {
    try {
      await inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "Enter role:",
            validate: function (val) {
              const input = /[a-z]/gi.test(val);
              if (!input) {
                console.log("Wrong input");
              } else {
                return /[a-z]/gi.test(val);
              }
            },
          },
          {
            type: "input",
            name: "name",
            message: "Enter name:",
            validate: function (val) {
              const input = /[a-z]/gi.test(val);
              if (!input) {
                console.log("Wrong input");
              } else {
                return /[a-z]/gi.test(val);
              }
            },
          },
          {
            type: "input",
            name: "email",
            message: "Enter email:",
            validate: function (val) {
              return /[a-z@1-9]/gi.test(val);
            },
          },
          {
            type: "input",
            name: "id",
            message: "Enter id:",
            validate: function (val) {
              return /[a-z1-9@.com]/gi.test(val);
            },
          },
        ])
        .then((response) => {
          this.inputtedDetail = response;
          this.role = response.role.toLowerCase();
          this.extraDetail();
        });
    } catch (err) {
      console.log("Input error!");
    }
  }

  async extraDetail() {
    try {
      if (this.role === "manager") {
        await inquirer
          .prompt({
            type: "input",
            name: "officeNumber",
            message: "Enter Office Number:",
            validate: function (val) {
              return /[1-9]/gi.test(val);
            },
          })
          .then((response) => {
            console.log("Name is:", this.inputtedDetail.name);
            console.log("Office number:", response.officeNumber);
            this.manager = new Manager(
              this.inputtedDetail.name,
              this.inputtedDetail.id,
              this.inputtedDetail.email,
              response.officeNumber
            );
            this.employees.push(this.manager);
            console.log("Employees array after adding:", this.employees);
          });
      } else if (this.role === "engineer") {
        await inquirer
          .prompt({
            type: "input",
            name: "githubuser",
            message: "Enter Github username:",
            validate: function (val) {
              return /[a-z1-9]/gi.test(val);
            },
          })
          .then((data) => {
            const engineer = new Engineer(
              this.inputtedDetail.name,
              this.inputtedDetail.id,
              this.inputtedDetail.email,
              data.githubuser
            );
            this.employees.push(engineer);
          });
      } else if (this.role === "intern") {
        await inquirer
          .prompt({
            type: "input",
            name: "school",
            message: "Enter School name:",
            validate: function (val) {
              return /[a-z.1-9]/gi.test(val);
            },
          })
          .then((data) => {
            const intern = new Intern(
              this.inputtedDetail.name,
              this.inputtedDetail.id,
              this.inputtedDetail.email,
              data.school
            );
            this.employees.push(intern);
          });
      }
    } catch (err) {
      console.log("Extra input error!");
    }
    this.nextEmployee();
  }

  async nextEmployee() {
    try {
      await inquirer
        .prompt({
          type: "confirm",
          name: "more",
          message: "Do you want add another employee:",
        })
        .then((response) => {
          if (response.more) {
            this.askBasicinfo();
          } else {
            this.quit();
          }
        });
    } catch (err) {
      console.log("More employee input error!");
    }
  }

  // Logs goodbye and exits the node app
  async quit() {
    try {
      this.outputFile = render(this.employees);

      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      } else {
        console.log("Directory already exists... Overwriting team.html");
      }

      await writeFileAsync(outputPath, this.outputFile);
      console.log(
        "\nData successfully stored in the team.html inside output folder!"
      );

      process.exit(0);
    } catch (err) {
      console.log("Error writing into htnl file!");
    }
  }
}

const getDetails = new Getdetails();

// Start
getDetails.askBasicinfo();
