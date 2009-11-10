'''
Created on 2009/11/02
@author: y@s
'''
#!-*- coding: utf-8 -*-
# -*- coding: utf-8 -*-

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
#from google.appengine.api import urlfetch

class MainPage(webapp.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'text/html; utf-8'
    self.response.out.write('<html><head><title>JSON Test</title></head><body>')
    
    
    str_cont = '{"title": "JSON タイトル","content": "ジェイソン"}'
    dic_cont = {"title": u"JSON タイトル","content": u"ジェイソン"}
    
    #JSON形式の文字列 → dic型
    loads_dic = simplejson.loads(str_cont)
    
    #dic型 → JSON形式の文字列 
    dumps_str = simplejson.dumps(dic_cont, ensure_ascii=False)
    
    self.response.out.write('<p>str_cont : %s</p>' % str_cont)
    #self.response.out.write('<p>str_cont : %s</p>' % unicode(str_cont,'UTF-8'))
    self.response.out.write('<p>loads_dic : %s</p>' % loads_dic)
    self.response.out.write('<p>loads_dic title : %s</p>' % loads_dic['title'])
    #self.response.out.write('<p>dumps_str : %s</p>' %  unicode(dumps_str,'UTF-8'))
    
    simplejson.dump({"title": unicode("JSON タイトル",'UTF-8'),"content": u"ジェイソン"}, self.response.out, ensure_ascii=False)
    
    self.response.out.write('</body></html>')


def main():
  application = webapp.WSGIApplication([('/test_json', MainPage)],debug=False)
  run_wsgi_app(application)

if __name__ == "__main__":
  main()