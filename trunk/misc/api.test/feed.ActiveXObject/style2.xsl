<?xml version="1.0" encoding="shift_jis"?>
<xsl:stylesheet 
     xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
     xmlns:itms="http://phobos.apple.com/rss/1.0/modules/itms/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     version="1.0">
  <xsl:output method="html" encoding="shift_jis"/>

  <xsl:template match="/">
    <table border="0" width="100%" cellpadding="2" cellspacing="4">
      <tr>
        <td bgcolor="#006633"><b><font color="#FFFFFF">　　　</font></b></td>
      </tr>
    </table> 
    <xsl:apply-templates select="/rss/channel/item"/>
  </xsl:template> 

  <xsl:template match="item">
    　<br/>
    <table border="0" width="100%" cellpadding="2" cellspacing="4">
      <tr valign="top" align="left">
        <td align="center" width="166" valign="top">
          <img border="0" src="{itms:coverArt[3]}"/>
        </td>
        <td></td>
        <td width="95%">
          <b><xsl:value-of select="itms:album"/></b><br/>
          <xsl:value-of select="itms:artist"/><br/><br/>
          <font size="3"><b>曲名:</b><xsl:value-of select="itms:song"/></font><br/>
          <font size="3"><b>リリース日:</b><xsl:value-of select="itms:releasedate"/></font><br/>
          <font size="3"><b>ジャンル:</b><xsl:value-of select="category"/></font><br/>
          <font size="3"><b>価格:</b><xsl:value-of select="itms:albumPrice"/></font><br/>
          <font size="3"><b>Copyright</b><xsl:value-of select="itms:rights"/></font>
        </td>
      </tr>
    </table>
  </xsl:template>
</xsl:stylesheet> 
