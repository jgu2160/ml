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
    stat,bod = CtoDHelper.make_table(file)
    status stat
    return body bod
  end
end
