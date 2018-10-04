import * as fs from "fs";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as path from "path";
import { IMailOption } from "../models/MailOption";
import { URL_BASE } from "../shared/constants";

export class MailService {
  user: string;
  pass: string;
  transporter: Mail;

  constructor() {
    this.user = process.env.GMAIL_USER;
    this.pass = process.env.GMAIL_PASS;

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: this.user,
        pass: this.pass
      }
    });
  }

  /**
   * builds email from template
   * @param to user email
   * @param name user name
   * @param isVerification check if email request is for the purpose of validating a user. If false password reset
   * @param hash email verification hash
   */
  async buildOptions(
    to: string,
    name: string,
    isVerification: boolean,
    hash?: string
  ): Promise<IMailOption> {
    return {
      from: process.env.GMAIL_USER,
      to: to,
      subject: isVerification
        ? "HAPPY Account Verification Mail"
        : "HAPPY Password Reset",
      html: fs
        .readFileSync(
          path.resolve("src", "templates", "verification", "html.ejs"),
          "utf8"
        )
        .toString()
        .replace("${name}", name)
        .replace("${verificationLink}", `${URL_BASE}/verifyAccount/${hash}`)
    };
  }

  /**
   *
   * @param to user email
   * @param name user name
   * @param isVerification check if email request is for the purpose of validating a user. If false password reset
   * @param hash email validation hash
   */
  async send(
    to: string,
    name: string,
    isVerification: boolean,
    hash?: string
  ): Promise<void> {
    const mailOption: IMailOption = await this.buildOptions(
      to,
      name,
      isVerification,
      hash
    );

    this.transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}
