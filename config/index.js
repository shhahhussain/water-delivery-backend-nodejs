const convict = require("convict");

convict.addFormat(require("convict-format-with-validator").ipaddress);

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
    },
    password: {
      doc: "db password",
      format: "*",
      default: null,
    },
  },
  jwt: {
    user_secret_key: {
      doc: "User Secret Key for jwt token",
      format: String,
      default: "",
      env: "JWT_USER_SECRET_KEY",
    },
  },
  aws: {
    s3_access_key: {
      doc: "Access key for aws",
      format: String,
      default: "",
      env: "AWS_ACCESS_KEY",
    },
    s3_secret_key: {
      doc: "Secret key for aws",
      format: String,
      default: "",
      env: "AWS_SECRET_KEY",
    },
    s3_region: {
      doc: "aws region",
      format: String,
      default: "",
      env: "AWS_REGION",
    },
    s3_bucket: {
      doc: "Bucket name",
      format: String,
      default: "",
      env: "AWS_BUCKET",
    },
  },
  stripeApiKey: {
    doc: "Stripe API Key",
    format: String,
    default: "",
    env: "STRIPE_API_KEY",
  },
  email: {
    service: {
      doc: "Email service provider",
      format: String,
      default: "gmail",
      env: "EMAIL_SERVICE",
    },
    port: {
      doc: "Email server port",
      format: "port",
      default: 587,
      env: "EMAIL_PORT",
    },
    secure: {
      doc: "Secure connection",
      format: Boolean,
      default: false,
      env: "EMAIL_SECURE",
    },
    auth: {
      user: {
        doc: "Email user",
        format: String,
        default: "",
        env: "EMAIL_USER",
      },
      pass: {
        doc: "Email password",
        format: String,
        default: "",
        env: "EMAIL_PASS",
      },
    },
  },
  paypal: {
    client_id: {
      doc: "PayPal Client ID",
      format: String,
      default: "",
      env: "PAYPAL_CLIENT_ID",
    },
    client_secret: {
      doc: "PayPal Client Secret",
      format: String,
      default: "",
      env: "PAYPAL_CLIENT_SECRET",
    },
  },
});

// Load environment dependent configuration
let env = config.get("env");
if (env === "development") {
  config.loadFile(__dirname + "/environments/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
