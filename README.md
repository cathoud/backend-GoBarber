# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano

**RN**

- O link enviado por e-mail para resetar a senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar sua senha
