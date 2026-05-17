/* Google tag (gtag.js) — GA4
 * 全ページ共通の計測タグ。各ページの <head> 内で
 *   <script src="{{ '/assets/ga.js' | relative_url }}"></script>
 * として読み込む。測定 ID を変更する場合はこのファイルの GA_MEASUREMENT_ID を 1 箇所だけ書き換える。
 */
(function () {
  var id = 'G-8SS2P3RE61';

  // gtag.js 本体を非同期で読み込み（元スニペットの <script async src> 相当）
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);

  // dataLayer は GTM と共有。gtag はグローバルに公開する。
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', id);
})();
