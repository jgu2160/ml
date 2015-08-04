require 'sinatra/base'
require 'json'
require 'csv'

class MLapp < Sinatra::Base
  get "/" do
    send_file 'lib/index.html'
  end

  post "/upload" do
    file = params['file']
    file_path = file[:tempfile].path
    if file[:type] == "text/csv"
      csv = File.foreach(file_path).first(2)
      types = CSV.parse(csv[1], converters: :all)
      puts csv[0]
      types[0].each do |t|
        puts t.class
      end
      puts "it's a csv!"
      return {response: "okay"}.to_json
    else
      status 403
      return body 'Please upload a csv.'
    end
  end
end
