require 'sinatra/base'
require 'sinatra/activerecord'
require './config/environments'
require './lib/helpers/ctodhelper'
require 'benchmark'
require 'parallel'
require 'json'
require 'csv'

class Viduus < Sinatra::Base
  get "/" do
    send_file 'lib/index.html'
  end

  post "/upload" do
    file = params['file']
    begin
      stat,bod = CtoDHelper.make_table(file)
      status stat
      return body bod
    rescue
      status 404
      return body "Something went wrong."
    end
  end
end
