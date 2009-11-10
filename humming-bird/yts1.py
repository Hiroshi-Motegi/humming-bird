'''
Created on 2009/11/06
@author: y@s
'''
#!-*- coding: utf-8 -*-
import cgi
import wsgiref.handlers
from google.appengine.ext import webapp
import gdata.youtube
import gdata.youtube.service
import gdata.alt.appengine

SEARCH_FORM_STRING = '''
                  <h4>Please enter a search term:</h4>
                  <form action="/yts1" method="post">
                  <input type="text" name="keyword" /><input type="submit" value="Search YouTube" />
                  </form>'''

PAGE_HEAD_STRING = '<html><head><title>Retrieving a YouTube feed</title></head><body>'
PAGE_FOOT_STRING = '</body></html>'
CONTENT_TYPE = 'text/html; charset=utf-8'


def writePageHead(self):
  self.response.headers['Content-Type'] = CONTENT_TYPE
  self.response.out.write(PAGE_HEAD_STRING)
  self.response.out.write(SEARCH_FORM_STRING)


def makeYouTubeVideoQuery(keyword):
  #http://gdata-python-client.googlecode.com/svn/trunk/pydocs/gdata.youtube.service.html#YouTubeVideoQuery
  query = gdata.youtube.service.YouTubeVideoQuery()
  query.vq = keyword
  query.max_results = '5'
  query.orderby = 'viewCount'
  query.racy = 'include'
  return query



class MainPage(webapp.RequestHandler):

  def get(self):
    writePageHead(self)
    self.response.out.write(PAGE_FOOT_STRING)

  def post(self):
    keyword = cgi.escape(self.request.get('keyword').encode('UTF-8'))

    if not keyword:
        self.redirect('/yts1')
        return
    
    client = gdata.youtube.service.YouTubeService()
    gdata.alt.appengine.run_on_appengine(client)
    feed = client.YouTubeQuery(MakeYouTubeVideoQuery(keyword))

    writePageHead(self)
    self.response.out.write('<p>Searching for "%s"</p><br/><br/>' % keyword)
    self.response.out.write('<div><table border="0" cellpadding="2" cellspacing="0"><tbody>')
    
    for e in feed.entry:
      self.response.out.write('<tr><td>')
      WriteEntryDetails(self, e)
      self.response.out.write('</td></tr>')
      self.response.out.write('<tr><td height="20"><hr/></tr>')
    
    self.response.out.write('</tbody></table></div>')
    self.response.out.write(PAGE_FOOT_STRING)



def MakeString(key, value):
  return '<span><i>%s</i> : %s</span></br>' % (key, value)

def WriteEntryDetails(self, entry):
  writeline = self.response.out.write
  ms = MakeString
  em = entry.media
  writeline(ms('title', em.title.text))
  writeline(ms('published on', entry.published.text.split('T')[0] + ' at ' + entry.published.text.split('T')[1][:5] + ' PST'))
  writeline(ms('description', em.description.text))

  cs = []
  for c in em.category:
    cs.append(c.text)
    
  writeline(ms('category',  ','.join(cs)))
  writeline(ms('tags', em.keywords.text))
  writeline(ms('watch page', em.player.url))
  
  # uncomment this section to show the embeddable player
  #writeline(ms('flash player URL', entry.GetSwfUrl()))
  swfURL = entry.GetSwfUrl()
  if swfURL:
    self.response.out.write('<br/><object width="425" height="350">'
      '<param name="movie" value="' + swfURL + '"></param>'
       '<embed src="' + swfURL + '" type="application/x-shockwave-flash" '
       'width="425" height="350"></embed></object><br/><br/>')
  
  writeline(ms('duration', em.duration.seconds))

  # non entry.media attributes
  if entry.geo:
    writeline(ms('geo location', ('%s, %s' % entry.geo.location()) ))

  writeline(ms('view count', entry.statistics.view_count))
  
  if entry.rating:
    writeline(ms('rating', '%s of 5 stars %s  Votes' % (entry.rating.average, entry.rating.num_raters)))

  # show alternate formats
  if entry.media.content:
    for alternate_format in entry.media.content:
      if 'isDefault' not in alternate_format.extension_attributes:
        writeline(ms('Alternate format' , alternate_format.type))
        writeline(ms('&nbsp;&nbsp;&nbsp;&nbsp;url' , alternate_format.url))

  # show thumbnails
  writeline('<ul style="margin:20px 0;list-style-type:none"><p>Thumbnail : </p>')
  for thumbnail in entry.media.thumbnail:
    writeline('<li><img style="margin-left:20px" src="%s"></li>' % thumbnail.url)
  writeline('</ul>')





def main():
  application = webapp.WSGIApplication([('/yts1', MainPage),], debug=False)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()