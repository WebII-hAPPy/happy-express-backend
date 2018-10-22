import * as fs from "fs";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as path from "path";
import { IMailOption } from "../models/MailOption";
import { URL_BASE } from "../shared/constants";

export class MailService {
  private user: string;
  private pass: string;
  private transporter: Mail;

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
   * Builds E-Mail from template
   * @param to User E-Mail
   * @param name Username
   * @param isVerification Check if E-Mail request is for the purpose of validating a user. If false password reset.
   * @param hash E-Mail verification hash
   */
  async buildOptions(
    to: string,
    name: string,
    isVerification: boolean,
    hash?: string
  ): Promise<IMailOption> {
    return {
      from: this.user,
      to: to,
      subject: isVerification
        ? "HAPPY Account Verification Mail"
        : "HAPPY Password Reset",
      html: fs
        .readFileSync(
          path.resolve("src", "templates", "verification", "html.html"),
          "utf8"
        )
        .toString()
        .replace("${name}", name)
        .replace("${verificationLink}", `${URL_BASE}/verifyAccount/${hash}`)
    };
  }

  /**
   * Sends the E-Mail
   * @param to E-Mail of the user
   * @param name Username
   * @param isVerification Check if email request is for the purpose of validating a user. If false password reset.
   * @param hash E-Mail validation hash
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
