require 'reloader/sse'
require 'redis'
require 'json'

class TracesController < ApplicationController
  include ActionController::Live

  def history
    respond_to do |format|
      format.html
      format.json do
        redis = Redis.new
        history = redis.lrange params[:trace_name], 0, -1
        history.map! do |result|
          trace = JSON.parse(result)
          trace["time"] = Time.parse(trace["time"]).strftime("%a %b %d %l:%M:%S %p")
          trace
        end

        render :json => history
      end
    end
  end

  def stream
    # SSE expects the `text/event-stream` content type
    response.headers['Content-Type'] = 'text/event-stream'

    sse = Reloader::SSE.new(response.stream)

    redis = Redis.new
    redis.subscribe("fuey.trace.new", "fuey.trace.update") do |on|
      on.message do |channel, data|
        sse.write(JSON.parse(data), :event => channel.split('.').last)
      end
    end
  rescue IOError
    # When the client disconnects, we'll get an IOError on write
  ensure
    redis.quit if redis
    sse.close if sse
  end

end
