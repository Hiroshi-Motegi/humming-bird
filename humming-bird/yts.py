'''
Created on 2009/11/03
@author: y@s
'''

import cgi
import wsgiref.handlers
from google.appengine.ext import webapp

import gdata.youtube
import gdata.youtube.service
import gdata.alt.appengine

class MainPage(webapp.RequestHandler):

  def get(self):
    #search_term = cgi.escape(self.request.get('content')).encode('UTF-8')
    client = gdata.youtube.service.YouTubeService()
    gdata.alt.appengine.run_on_appengine(client)
    feed = client.GetRecentlyFeaturedVideoFeed()

    self.response.out.write("""<html><head><title>hello_python_client_library: Retrieving a YouTube feed</title>
        </head><body><div id="video_listing">""")

    self.response.out.write('<h2>Recently Featured Videos</h2><br /><br />')
    self.response.out.write('<table border="0" cellpadding="2" cellspacing="0">')

    for entry in feed.entry:
      self.response.out.write('<tr><td class="thumbnail">')
      self.response.out.write('<img src="%s" /><br /><br />' % entry.media.thumbnail[0].url)
      
      try:
        average = entry.rating.average
      except AttributeError:
        average = '-'
      
      try:
        numRaters = entry.rating.num_raters
      except AttributeError:
        numRaters = '-'
        
      self.response.out.write('<span class="video_rating">Rating: %s of 5 stars<br/>%s Votes </span>' % (average, numRaters))
      self.response.out.write('</td>')
      
      self.response.out.write('<td valign="top">')
      self.response.out.write('<span class="video_title">%s</span><br />' % entry.title.text)
      self.response.out.write('<span class="video_description">%s</span><br /><br />' % entry.media.description)
      
    # uncomment this section to show the embeddable player
    #if entry.GetSwfUrl():
      #self.response.out.write('<object width="425" height="350">'
        #'<param name="movie" value="' + entry.GetSwfUrl() + '"></param>'
         #'<embed src="' + entry.GetSwfUrl() + 
         #'" type="application/x-shockwave-flash" '
         #'width="425" height="350"></embed></object>')
      
      
      self.response.out.write('<span class="swf_url"><strong>URL:</strong>%s</span><br/>' % entry.GetSwfUrl())
      self.response.out.write('<span class="video_category"><strong>%s</strong></span>' % entry.media.category[0])
      
      self.response.out.write('<span class="video_published"> | published on %s</span><br />'
                              % (entry.published.text.split('T')[0] + ' at ' + entry.published.text.split('T')[1][:5] + ' PST'))
      
      self.response.out.write('<span class="video_keywords"><strong>Keywords:</strong> %s </span><br />' % entry.media.keywords)
      self.response.out.write('</td></tr>')
      
      self.response.out.write('<tr><td height="20" colspan="2"><hr class="slight"/></td></tr>')


    self.response.out.write('</table></div></body></html>')


def main():
  application = webapp.WSGIApplication([('/youtubesearch', MainPage),], debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()