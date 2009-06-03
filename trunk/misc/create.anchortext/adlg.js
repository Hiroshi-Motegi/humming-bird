(function(){
function a(x,y){x.appendChild(y)};
function y(a,b,c,d){with(a.style){color=b;fontSize='16px';background=c;border='1px solid #'+d;}};
var D=document,i='dlg__',s=c('div'),t=c('input'),b=c('input'),l=D.title,n='20px';
if(D.getElementById(i)){return}
function r(){D.body.removeChild(D.getElementById(i))};
function c(x){return D.createElement(x)};

s.id=i;
y(s,'#000','#eee','ccc');
with(s.style){
position='fixed';
zIndex='9999';
top=n;
left=n;
textAlign='center';
padding=n;
}

with(t){
type='text';
readOnly=true;
value='<a href="'+window.location+'" title="'+l+'">'+l+'</a>';
style.width='200px';
onclick=function(){this.select()};
onkeydown=function(e){var k=e?e.which:event.keyCode;if(k== 27||k==13){r()}};
}
y(t,'#333','#fff','999');

b.type='button';
b.value='close';
y(b,'#eee','#999','666');
b.style.marginTop='10px';
b.onclick=function(e){r();e?e.stopPropagation():event.cancelBubble=true};

a(s,t);
a(s,c('br'));
a(s,b);
a(D.body,s);
t.select();
})();