window.addEventListener('load', function(){
  var article = document.getElementsByTagName('article')[0];
  var onPageNav = document.getElementsByClassName('onPageNav')[0];
  
  if(article && onPageNav.hasChildNodes()) {
    var headings = Array.from(article.querySelectorAll('h2, h3'));
    var navLinks = Array.from(onPageNav.getElementsByTagName('a'));

    var mappingArr = headings.map(function(heading, index) {
      var anchor = heading.getElementsByClassName('anchor')[0];
      return { anchor: anchor, navLink: navLinks[index] };
    });

    window.addEventListener('scroll', function() {
      var scrollHeight = window.scrollY;
      
      var passed = mappingArr.filter(function(mapping) {
        var anchorHeight = mapping.anchor.offsetTop;//mapping.anchor.getBoundingClientRect().top;
        return scrollHeight > anchorHeight;
      });

      var lastPassed = passed[passed.length - 1] || {};
      navLinks.forEach(function(navLink) {
        if(navLink === lastPassed.navLink) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      });
    });
  }
});
