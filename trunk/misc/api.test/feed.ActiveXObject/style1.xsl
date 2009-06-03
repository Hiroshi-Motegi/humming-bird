<?xml version="1.0" encoding="shift_jis"?>
<xsl:stylesheet 
     xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
     xmlns:itms="http://phobos.apple.com/rss/1.0/modules/itms/"
     version="1.0">
  <xsl:output method="html" encoding="shift_jis"/>

  <xsl:template match="/">
    <table border="0" width="100%" cellpadding="2" cellspacing="4">
      <tr>
        <td bgcolor="#006633"><b><font color="#FFFFFF">R.</font></b></td>
        <td width="33%" bgcolor="#006633"><b><font color="#FFFFFF">アーティスト</font></b></td>
        <td width="33%" bgcolor="#006633"><b><font color="#FFFFFF">タイトル</font></b></td>
        <td width="33%" bgcolor="#006633"><b><font color="#FFFFFF">リリース日</font></b></td>
      </tr>
      <xsl:apply-templates select="/rss/channel/item"/>
    </table> 
  </xsl:template> 

  <xsl:template match="item"> 
    <tr>
      <td align="right"><xsl:value-of select="itms:rank"/></td>
      <td width="33%"><xsl:value-of select="itms:artist"/></td>
      <td width="33%"><xsl:value-of select="itms:song"/></td>
      <td width="33%"><xsl:value-of select="itms:releasedate"/></td>
    </tr>
    <tr>
      <td align="right" height="1" bgcolor="#006633"></td>
      <td width="33%" height="1" bgcolor="#006633"></td>
      <td width="33%" height="1" bgcolor="#006633"></td>
      <td width="33%" height="1" bgcolor="#006633"></td>
    </tr>
  </xsl:template>
</xsl:stylesheet> 
