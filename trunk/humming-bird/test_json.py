'''
Created on 2009/11/02
@author: y@s
'''
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
from google.appengine.api import urlfetch

class MainPage(webapp.RequestHandler):
  def get(self):
      self.response.headers['Content-Type'] = 'text/html'
      self.response.out.write('JSON Sample<br>')
      content1 = '{"title": "Google Search","author": "y@s"}'
      jValue1 = simplejson.loads(content1)
      self.response.out.write('title=%s<br>' % jValue1['title'])
      self.response.out.write('author=%s<br>' % jValue1['author'])
      self.response.out.write('<hr>')
      content2 = '{"title": "titleValue","author": "authorValue","array": ["test1","test2"]}'
      jValue2 = simplejson.loads(content2)
      self.response.out.write('array1=%s<br>' % jValue2["array"][0])
      self.response.out.write('array2=%s<br>' % jValue2["array"][1])


application = webapp.WSGIApplication(
                                       [('/test_json', MainPage)],
                                       debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()