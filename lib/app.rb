require 'sinatra/base'
require 'sinatra/activerecord'
require './config/environments'
require './lib/helpers/ctodhelper'
require 'benchmark'
require 'parallel'
require 'json'
require 'csv'

class MLapp < Sinatra::Base
  get "/" do
    send_file 'lib/index.html'
  end

  post "/upload" do
    file = params['file']
    if file[:type] == "text/csv"
      stat,bod = CtoDHelper.make_table(file)
      status stat
      return body bod
    else
      file_path = params['file'][:tempfile].path
      `rm #{file_path}`
      status 404
      return body 'Please upload a CSV.'
    end
  end
end
