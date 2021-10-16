class Student {
  constructor(name, email, community) {
    this.name = name;
    this.email = email;
    this.community = community;
  }
}

class Bootcamp {
  constructor(name, level, students = []) {
    this.name = name;
    this.level = level;
    this.students = students;
  }
  registerStudent(bjStu) {
    if (this.students.filter((s) => s.email === bjStu.email).length) {
      console.log(`Student is registered`);
    } else {
      this.students.push(bjStu);
      console.log(`Registering ${bjStu.email} to the bootcamp ${this.name}.`);
    }
  }
}

const a = new Student("Abdulai", "abdu@gmail.com", "Atlanta");
const b = new Student("Jalloh", "abdu@gmail.com", "New York");

const bootcampp = new Bootcamp("Abdu", "okay");
bootcampp.registerStudent(a);
bootcampp.registerStudent(b);
