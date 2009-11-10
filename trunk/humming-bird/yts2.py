'''
Created on 2009/11/03
@author: y@s
'''
#!-*- coding: utf-8 -*-
import os
import cgi
import urllib
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
from django.utils import simplejson
from google.appengine.api import urlfetch



SEARCH_FORM_STRING = '''
                  <h4>Please enter a search term:</h4>
                  <form action="/yts2" method="post">
                  <input type="text" name="keyword" /><input type="submit" value="Search YouTube" />
                  </form>'''

class YouTubeSearch(webapp.RequestHandler):  
  def get(self):
      self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
      self.response.out.write('<html><head><title>YouTube Search</title></head><body>')
      self.response.out.write(SEARCH_FORM_STRING)
      self.response.out.write('</body></html>')

  def post(self):
    search_term = cgi.escape(self.request.get('keyword').encode('UTF-8'))

    if not search_term:
        self.redirect('/yts2')
        return

    self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
    self.response.out.write("""<html><head><title>YouTube Search Results</title></head><body><div>""")
    self.response.out.write(SEARCH_FORM_STRING)
    self.response.out.write("""<br/><span>Searching for '%s'</span><br /><br />""" % unicode(search_term,'UTF-8'))
    
    url = "http://gdata.youtube.com/feeds/api/videos/?%s" % urllib.urlencode({
                                                                               'max-results':"5",
                                                                               'alt':"json",
                                                                               'vq':search_term})
    
    self.response.out.write("""<span>URL: '%s'</span><br /><br />""" % url)
    
    self.response.out.write('<table border="0" cellpadding="2" ''cellspacing="0"><tbody>')
    
    content = urlfetch.fetch(url=url).content
    feed = simplejson.loads(content)['feed']
    
    if feed and feed.get('entry'):
      for entry in feed['entry']:
        mg = entry['media$group']
        
        if mg.get('media$content'):
          self.response.out.write('<tr><td><span>%s</span><br/><br/>' % mg['media$title']['$t'])
          swf_url = mg['media$content'][0]['url']
          self.response.out.write("""<object width="425" height="355">
              <param name="movie" value="%s"></param>
              <param name="wmode" value="transparent"></param>
              <embed src="%s" type="application/x-shockwave-flash" 
              wmode="transparent" width="425" height="355"></embed></object>
              <br />""" % (swf_url, swf_url))
          
          self.response.out.write('<p>description : %s</p>' % mg['media$description']['$t'])
          
          if entry['gd$rating']:
            self.response.out.write('<span>Rating: %s of 5 stars<br/>%s Votes </span></td></tr>' % 
                (entry['gd$rating']['average'], entry['gd$rating']['numRaters']))
          
        self.response.out.write('<tr><td height="20"><hr/></tr>')
    
    
    self.response.out.write('</tbody></table><br/>')
    self.response.out.write('</body></html>')


def main():
  application = webapp.WSGIApplication([('/yts2', YouTubeSearch)], debug=False)
  run_wsgi_app(application)

if __name__ == "__main__":
    main()
