import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { MailerService  } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService:MailerService
  ) { }

  async

  sendResetPasswordLink(email: string): Promise<void> {
    const payload = { email };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("reset_secret"),
      expiresIn: `${this.configService.get('reset_expire')}`
    })

    const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;

     const text = `Hello, \nPour la reinitialisation de ton mot de passe clique sur ce lien : ${url}`;

    return this.mailerService.sendMail({
      to: email,
      subject: "Reinitialise ton mot de passe",
      html: `
        <p>Bonjour,</p>
        <p>Pour réinitialiser ton mot de passe clique sur ce lien :</p>
        <a href="${url}">Réinitialiser mon mot de passe</a>
        <p>Ce lien expire dans 15 minutes.</p>
    `
    })
  }
}
