'''
Created on 2009/11/03
@author: y@s
'''
#!-*- coding:utf-8 -*-
import os
import cgi
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
import gdata.youtube
import gdata.youtube.service
import gdata.alt.appengine

class YouTubeResults(webapp.RequestHandler):
 def post(self):
    #search_term = cgi.escape(self.request.get('content')).encode('UTF-8')
    search_term = self.request.get('content').encode('UTF-8')
    if not search_term:
        self.redirect('/youtube_search')
        return

    self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
    self.response.out.write("""<html><head><title>YouTube Search Results</title></head><body><div id="video_listing">""")
    self.response.out.write("""<span class="listing_title">Searching for '%s'</span><br /><br />""" % search_term)
    self.response.out.write('<table border="0" cellpadding="2" ''cellspacing="0">')

    client = gdata.youtube.service.YouTubeService()
    gdata.alt.appengine.run_on_appengine(client)
    query = gdata.youtube.service.YouTubeVideoQuery()

    query.vq = search_term
    query.max_results = '5'
    feed = client.YouTubeQuery(query)
 
    for entry in feed.entry:
      if entry.GetSwfUrl():
        swf_url = entry.GetSwfUrl()
        self.response.out.write('<tr><td><span class="video_title">%s</span><br /><br />' % entry.title.text)
        
        self.response.out.write("""<object width="425" height="355">
            <param name="movie" value="%s"></param>
            <param name="wmode" value="transparent"></param>
            <embed src="%s" type="application/x-shockwave-flash" 
            wmode="transparent" width="425" height="355"></embed></object>
            <br />""" % (swf_url, swf_url))
        
        self.response.out.write('<span>%s</span><br />' % entry.media.description)
        
        if entry.rating:
          self.response.out.write('<span>Rating: %s of 5 stars<br/>%s Votes </span></td></tr>' % 
              (entry.rating.average, entry.rating.num_raters))
        
        self.response.out.write('<tr><td height="20"><hr/></tr>')

    self.response.out.write('</table><br />')
    self.response.out.write("""<h4>Search:</h4>
        <form action="/youtube_results" method="post">
        <div><input type="text" name="content" /><input type="submit" value="Search YouTube"></div></form>""")

    self.response.out.write('</body></html>')


def main():
  application = webapp.WSGIApplication([('/youtube_results', YouTubeResults)], debug=True)
  run_wsgi_app(application)

if __name__ == "__main__":
    main()
