#!/usr/bin/env ruby
require 'mail'
require 'json'


# p Mail::TestMailer.deliveries
file = File.read('strukturen-fragebogen-export.json')
data_hash = JSON.parse(file)
users = data_hash["people"]

def search(mail, users)
  users.each { |k,v| break k if v['email'].strip == mail.strip || v['moreEmails'].split('\n').include?(mail.strip)} # returns user hash key bla
end

def handle_relation(relation, users)
  mail = relation['contact_mail']
  related_user = search(mail, users)
  relation['contact_key'] = related_user
  relation
end

# puts users
filtered = []
users.each do |k,u|
  relations = u["relations"]
  next unless relations
  if relations.kind_of?(Array)
    relations.each do |r|
      r = handle_relation(r, users)
    end
  else
    relations.each do |k, r|
      r = handle_relation(r, users)
    end
  end
end

File.open("new_file.json","w") do |f|
  f.write(users.to_json)
end

