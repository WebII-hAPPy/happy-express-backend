import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as path from "path";
import * as EmailTemplate from "email-templates";
import { IMailOption } from "../models/MailOption";
import { MailOptions } from "nodemailer/lib/smtp-transport";
import { Request } from "express";

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

  async buildOptions(
    from: string,
    to: string,
    verification: boolean
  ): Promise<IMailOption> {
    return {
      from: from,
      to: to,
      subject: verification
        ? "HAPPY Account Verification Mail"
        : "HAPPY Password Reset",
      html: `<p>fuck you</p>`
    };
  }

  async send(request: Request): Promise<void> {
    const mailOption: IMailOption = await this.buildOptions(
      request.body.from,
      request.body.to,
      request.body.verification
    );

    console.log("FUNCTION: SEND");

    this.transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  async test(): Promise<void> {
    const mailOption: IMailOption = await this.buildOptions(
      process.env.GMAIL_USER,
      "phuc.vu-quang@gmx.de",
      true
    );

    console.log("FUNCTION: TEST");

    this.transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  // public sendMail(template: string): void {
  //     const templateDir: string = path.join("templates", `${template}`);
  //     // const mailTemplate = new EmailTemplate(templateDir);
  // }
}
