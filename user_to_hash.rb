require 'json'
file = File.read('account_file')

data_hash = JSON.parse(file)

users = data_hash["users"]

# puts users
filtered = []
users.each do |f|
  filtered << {email: f["email"], token: f["displayName"]} if f["createdAt"].to_i > 1537384528000
end

puts "users: #{filtered.size}"
filtered
