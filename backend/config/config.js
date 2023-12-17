const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../backend/.env") });
console.log();
const envVarSchema = Joi.object()
  .keys({
    PORT_NUMBER: Joi.number().default(3000),
    MONGODB_URL: Joi.string().description("Mongo DB Url").required(),
  })
  .unknown();
const { value: envVars, error } = envVarSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error:${error.message}`);
}
module.exports = {
  port: envVars.PORT_NUMBER,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
};
