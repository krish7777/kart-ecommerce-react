const express = require("express");
const app = express();
const cors = require("cors");

const Insta = require("instamojo-nodejs");

const { apiKey, authKey } = require("./utils");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hiyaaa");
});

app.get("/api/pay/callback", (req, res) => {
  console.log("seems fine");
});

app.post("/api/pay", (req, res) => {
  Insta.setKeys(apiKey, authKey);
  const data = new Insta.PaymentData();
  Insta.isSandboxMode(true);
  const { purpose, amount, buyer_name, redirect_url, email } = req.body;
  data.purpose = purpose;
  data.amount = amount;
  data.buyer_name = buyer_name;
  data.redirect_url = redirect_url;
  data.email = email;
  data.send_email = false;
  data.webhook = "http://www.example.com/webhook/";
  data.send_sms = false;
  data.allow_repeated_payments = false;

  Insta.createPayment(data, (err, resp) => {
    if (err) {
      console.log("error  ", err);
    } else {
      console.log(resp);
      const resData = JSON.parse(resp);
      const redirectUrl = resData.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
});

app.listen(8000, () => {
  console.log("server started");
});
