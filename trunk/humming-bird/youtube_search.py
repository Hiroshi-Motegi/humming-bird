'''
Created on 2009/11/02
@author: y@s
'''
#!-*- coding:utf-8 -*-
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
from google.appengine.api import urlfetch

class YTSearchForm(webapp.RequestHandler):
  def get(self):
      self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
      self.response.out.write('''<html><head><title>YouTube Search</title></head><body>
                  <h4>Please enter a search term:<h4>
                  <form action="/youtube_results" method="post">
                  <div><input type="text" name="content" /><input type="submit" value="Search YouTube" /></div>
                  </form></body></html>''')


def main():
  application = webapp.WSGIApplication([('/youtube_search', YTSearchForm)],debug=True)
  run_wsgi_app(application)

if __name__ == "__main__":
  main()