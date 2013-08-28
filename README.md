### Why we built Fuey?
[We](www.b2b2dot0.com) believe in ensuring our customers instances are able to reach their required
network resources. Because when required resources become unavailable, 
we want to know first! We also want to know where a connection failed. 
Did the VPN drop? Was their SAP instance down? Or did the internets blowup? 
Whatever the answer is we want to know it and know it with little effort.

### How does Fuey do it?
We like, well love, Ruby at [B2b2dot0](www.b2b2dot0.com) so we wrote a 
Ruby gem called [FueyClient](https://github.com/b2b2dot0/fuey_client) 
that resides on each server we want to keep an eye on. Because we believe in simplicity, configuring FueyClient 
can be done with [a simple YAML file](https://github.com/b2b2dot0/fuey_client/blob/master/config_example/fuey/config/fuey.yml).
Then just run the FueyClient every minute, 5 minutes, etc with Cron or your favorite scheduler. 

When the client runs it executes each `Trace` and  it's `Inspections`. As it does so it provides real time updates 
to the Fuey via [Redis](www.redis.io). The web Fuey web app then subscribes to the Redis queue and uses 
[Rails Live Streaming](http://tenderlovemaking.com/2012/07/30/is-it-live.html) and 
[Server Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
to push updates to connected browsers resulting in a constant feed of real time trace results!

### What does it look like?
It looks like awesome! The dashboard shows you the number of currently reporting `Traces`, allows you to filter those 
`Traces` by status, name, and/or environment.

