#!/usr/bin/env ruby
require 'mail'
require 'json'

Mail.defaults do
  delivery_method :smtp, {
            address: "asmtp.mail.hostpoint.ch",
            port:                 587,
            user_name:            'struktur@pfadizueri.ch',
            password:             '',
            authentication:       'plain',
            enable_starttls_auto: true  }
  delivery_method :test
end

def deliver_invitation_email(email, token)
  mail = Mail.deliver do
    from    '"Pfadi Züri" <struktur@pfadizueri.ch>'
    to      email
    subject 'Reminder Fragebogen der Pfadi Züri'
    body   <<~EOFBODY
            Hallo!

            Vor einigen Wochen hast du eine Email von uns zum Thema "Fragebogen der Pfadi Züri" erhalten. Falls du diese Email gelöscht haben solltest oder sie im Spam gelandet ist, hast du mit dem nachfolgenden Link nochmals die Möglichkeit, die Umfrage auszufüllen.

            Du hast diese Einladung erhalten, da du mit jemanden innerhalb des Kantonalverbands von Zürich Kontakt hast. Die Pfadi Züri hat sich als Ziel gesetzt, die Strukturen innerhalb des Kantons zu erfassen. Mit Hilfe dieser Umfrage sollen alle Verbindungen erkannt und dokumentiert werden können, vom Abteilungsleitenden bis zum Kantonsleitenden.
            Wir bitten dich dir für das Ausfüllen Zeit zu nehmen. Wenn du die Umfrage geöffnet hast erfährst du weitere Informationen wie das Ausfüllen funktioniert. Keine Angst – es ist nicht kompliziert!

            Wir danken dir herzlich für deine Unterstützung!

            Die häufigsten Fragen werden im FAQ auf https://strukturen-fragebogen.firebaseapp.com/faq beantwortet, und natürlich darfst du dich auch gerne per Mail an strukturumfrage@pfadizueri.ch wenden.

            https://strukturen-fragebogen.firebaseapp.com/login?email=#{email}&token=#{token}
          EOFBODY
  end
end

# p Mail::TestMailer.deliveries
`firebase auth:export account_file --format=json`
file = File.read('account_file')
data_hash = JSON.parse(file)
users = data_hash["users"]

# puts users
filtered = []
users.each do |f|
  deliver_invitation_email(f["email"], f["displayName"]) if f["lastSignedInAt"].nil?
  # p f["email"] if f["lastSignedInAt"].nil?
  # deliver_invitation_email(f["email"], f["displayName"]) if f["createdAt"].to_i > 1537384528000
end

p Mail::TestMailer.deliveries
