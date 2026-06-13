const object1 = {
  abacate: "",
  title: "",
  time: "asda",
  status: "dsadsa",
  description: "asdas",
};

console.log(Object.keys(object1));
const allowedFields = ["title", "time", "status", "description"];

const someFieldIsNotAllowed = Object.keys(object1).some(
  field => !allowedFields.includes(field),
);

console.log(someFieldIsNotAllowed);
