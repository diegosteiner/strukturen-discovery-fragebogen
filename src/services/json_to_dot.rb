#! /usr/bin/env ruby 
require 'json'

def load(file)
  puts 'graph TD'
  data = JSON.parse(file.read)
  data['people'].each do |person|
    person = person.last
    id = escapeID(person['email'])
    puts "#{id}[#{person['name']}]"

    person['relations'].each do |r|
      next unless r
      other_id = escapeID(r['contact_mail'])
      next if other_id.nil? || other_id == ""

      puts "#{id}-->|#{r['role'].nil? || r['role'] == '' ? '?' : r['role']}| #{other_id}"
    end

  end
end

def escapeID(id)
  return if id.nil?
  id.gsub(/[\@\.]/, '@' => '_at_', '.' => '_dot_').downcase
end

load(File.new(File.join(__dir__, '../../tmp/data.json')))
