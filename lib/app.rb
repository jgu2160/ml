require 'sinatra/base'
require 'json'

class MLapp < Sinatra::Base
  get "/" do
    send_file 'lib/index.html'
  end

  post "/upload" do
    begin
      params['csv'][:tempfile].read
    rescue
      return {response: "not okay", error: "No file"}.to_json
    end
    return {response: "okay"}.to_json
  end
end
