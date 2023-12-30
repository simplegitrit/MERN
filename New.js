const zod = require("zod");

function validate(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  const response = schema.safeParse(obj);
  console.log(response);
}
validate({
  email: "harshita@gmail.com",
  password: "harshita",
});
