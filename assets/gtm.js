/* Google Tag Manager (head)
 * 全ページ共通の計測タグ。各ページの <head> 内できるだけ上で
 *   <script src="{{ '/assets/gtm.js' | relative_url }}"></script>
 * として読み込む。コンテナ ID を変更する場合はこのファイルの GTM-XXXX を 1 箇所だけ書き換える。
 */
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-MPX9LPX8');
