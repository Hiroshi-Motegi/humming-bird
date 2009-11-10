'''
Created on 2009/11/06
@author: y@s
'''
#!-*- coding: utf-8 -*-
import os
import cgi
import wsgiref.handlers
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
import gdata.youtube
import gdata.youtube.service
import gdata.alt.appengine


def MakeQuery(keyword):
  #http://gdata-python-client.googlecode.com/svn/trunk/pydocs/gdata.youtube.service.html#YouTubeVideoQuery
  query = gdata.youtube.service.YouTubeVideoQuery()
  query.vq = keyword
  query.max_results = '5'
  query.orderby = 'relevance' #relevance, viewCount, published, or rating
  query.racy = 'include' #'include' or 'exclude'
  query.time = 'all_time' #today, this_week, this_month, or all_time
  return query

def GetDetails(feed):
  fv = []
  for e in feed.entry:
    em = e.media
    vls = {
           'title' : em.title.text,
           'playerURL' : em.content[0].url, #e.GetSwfUrl()
           'description' : em.description.text
           }
    
    if e.rating:
      vls.update({
                  'average' : e.rating.average,
                  'num_raters' : e.rating.num_raters
                  })
    
    fv.append(vls)
  
  return fv


class YouTubeSearch(webapp.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'youtube.html')
    self.response.out.write(template.render(path, {}))

  def post(self):
    keyword = cgi.escape(self.request.get('keyword').encode('UTF-8'))

    if not keyword:
        self.redirect('/yts3')
        return
    
    client = gdata.youtube.service.YouTubeService()
    gdata.alt.appengine.run_on_appengine(client)
    feed = client.YouTubeQuery(MakeQuery(keyword))
    
    feedEntries = {'entry':None}

    if feed.entry:
      feedEntries['entry'] = GetDetails(feed)
    
    template_values = {
                       'keyword':unicode(keyword,'UTF-8'),
                       'feed':feedEntries
                       }

    path = os.path.join(os.path.dirname(__file__), 'youtube.html')
    self.response.out.write(template.render(path, template_values))


def main():
  application = webapp.WSGIApplication([('/yts3', YouTubeSearch),], debug=False)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()