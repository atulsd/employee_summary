const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

class Getdetails {
  constructor() {}

  async askBasicinfo() {
    try {
      await inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "Enter role:",
          },
          {
            type: "input",
            name: "name",
            message: "Enter name:",
          },
          {
            type: "input",
            name: "email",
            message: "Enter email:",
          },
          {
            type: "input",
            name: "id",
            message: "Enter id:",
          },
        ])
        .then((response) => {
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
        await inquirer.prompt({
          type: "input",
          name: "officeNumber",
          message: "Enter Office Number:",
        });
      } else if (this.role === "engineer") {
        await inquirer.prompt({
          type: "input",
          name: "githubuser",
          message: "Enter Github username:",
        });
      } else if (this.role === "intern") {
        await inquirer.prompt({
          type: "input",
          name: "school",
          message: "Enter School name:",
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
  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

const getDetails = new Getdetails();

// Start
getDetails.askBasicinfo();
