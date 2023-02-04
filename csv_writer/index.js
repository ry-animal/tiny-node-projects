import { appendFileSync } from "fs";
import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (message) => {
  return new Promise((resolve) => {
    readline.question(message, (answer) => {
      resolve(answer);
    });
  });
};

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }

  saveToCSV() {
    const content = `${this.name},${this.number},${this.email}\n`;
    try {
      appendFileSync("./contacts.csv", content);
      console.log(`Saved ${this.name} to contacts.csv`);
    } catch (err) {
      console.error(err);
    }
  }
}

const startApp = async () => {
  const person = new Person();
  person.name = await readLineAsync("Contact name: ");
  person.number = await readLineAsync("Contact number: ");
  person.email = await readLineAsync("Contact email: ");
  person.saveToCSV();
  const response = await readLineAsync("Add another contact? (y to continue)");
  if (response === "y") {
    await startApp();
  } else readline.close();
};

startApp();
