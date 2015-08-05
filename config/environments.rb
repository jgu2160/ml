# require your gems
require 'bundler'
Bundler.require

# set the pathname for the root of the app
require 'pathname'
APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

# require the controller(s)
Dir[APP_ROOT.join('lib', 'controllers', '*.rb')].each { |file| require file }

# require the model(s)
Dir[APP_ROOT.join('lib', 'models', '*.rb')].each { |file| require file }

# require your database configurations
require APP_ROOT.join('config', 'database')
