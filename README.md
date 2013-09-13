### Why we built Fuey?
[We](http://www.b2b2dot0.com) believe in ensuring our customers instances are able to reach their required
network resources. Because when required resources become unavailable, 
we want to know first! We also want to know where a connection failed. 
Did the VPN drop? Was their SAP instance down? Or did the internets blowup? 
Whatever the answer is we want to know it and know it with little effort.

### How does Fuey do it?
We like, well love, [Ruby](https://www.ruby-lang.org) at [B2b2dot0](http://www.b2b2dot0.com) so we wrote a 
[Ruby gem](https://rubygems.org/gems/fuey_client) called [FueyClient](https://github.com/b2b2dot0/fuey_client) 
that resides on each server we want to keep an eye on. Because we believe in simplicity, configuring FueyClient 
can be done with [a simple YAML file](https://github.com/b2b2dot0/fuey_client/blob/master/config_example/fuey/config/fuey.yml).
Then just run the FueyClient every minute, 5 minutes, etc with Cron or your favorite scheduler. 

When the client runs it executes each `Trace` and  it's `Inspections`. As it does so it provides real time updates 
to the Fuey via [Redis](www.redis.io). The web Fuey web app then subscribes to the Redis queue and uses 
[Rails Live Streaming](http://tenderlovemaking.com/2012/07/30/is-it-live.html) and 
[Server Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
to push updates to connected browsers resulting in a constant feed of real time trace results!

### What does Fuey look like?
It looks like awesome! The dashboard shows you the number of currently reporting `Traces`, allows you to filter those 
`Traces` by status, name, and/or environment. Keep whichever filters you like applied and show Fuey on a monitor in 
your workspace, it will update on it's own!

### Requirements
- FueyClient > 0.7
- Ruby 2.0 (For Fuey Web App)
- Ruby 1.8.7, 1.9, or 2.0 (For FueyClient)
- Redis 2.6
- Rails 4
- Puma

### Setup
Install FueyClient on each server you would like to monitor.
To setup the FeuyClient, refer to the [README](https://github.com/b2b2dot0/fuey_client/blob/master/README.md)

Install and setup Redis. Configure the FueyClient's to use this Redis server.

Install the Fuey Web App.
Clone the Fuey repo where you'd like to have it reside on your webserver

```
git clone git@github.com:b2b2dot0/fuey.git
```
Make sure you have bundler installed
```
gem install bundler
```
Change directory into the Fuey app, and run
```
bundle install
```
Fire up the app with Puma
```
rails s puma
```
Once your Fuey Clients start reporting, you will see them appear in the Fuey web app dashboard. Enjoy!












