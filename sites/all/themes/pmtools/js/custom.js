(function ($) {
  Drupal.behaviors.theming = {
    attach: function (context, settings) {

      // button add ticket in project nodes
      $('<a class="btn btn-default create-ticket-link" href="http://pmtools.local/node/add/tickets">Create a ticket</a>').insertAfter('.node-type-projects #block-system-main');

      // overlay close wrapper into overlay-content
      $('#overlay-close-wrapper').prependTo('#overlay-content');

      // project detail tabs: kanban/list
      $('.node-type-projects .region-content > *').wrapAll('<div id="tabbox">');
      $('#tabbox > #block-system-main, #tabbox > a.create-ticket-link').insertBefore('#tabbox');
      $('#tabbox > *').wrapAll('<div id="block-views-kanban">');
      $('#block-views-kanban > #block-views-tickets-block').insertBefore('#block-views-kanban');
      $('<h2>Kanban board</h2>').prependTo('#block-views-kanban');
      $('<ul><li><a class="btn btn-default" href="#block-views-tickets-block">List</a></li><li><a class="btn btn-default" href="#block-views-kanban">Kanban</a></li><li><a class="btn btn-default" href="#github">Repository</a></li></ul>').prependTo('#tabbox');
      $('#tabbox').tabs();

      // count items in kanbanblock
      $('.kanbanblock').each(function(){
        var ticketCount = $(this).find('.views-row').length;
        $('<div class="ticket-count">'+ticketCount+'</div>').prependTo($(this));
        if (ticketCount > 4) {
          $('.ticket-count').addClass('overmax');
        }
      });

    }
  };
})(jQuery);

(function ($) {
  Drupal.behaviors.templating = {
    attach: function (context, settings) {

      // github commits fetching
      var apiUrl = 'https://api.github.com/repos/yyx990803/vue/commits?per_page=3&sha='
      var demo = new Vue({

          el: '#github',

          data: {
              branch: 'master'
          },

          created: function () {
              this.$watch('branch', function () {
                  this.fetchData()
              })
          },

          filters: {
              truncate: function (v) {
                  var newline = v.indexOf('\n')
                  return newline > -1 ? v.slice(0, newline) : v
              },
              formatDate: function (v) {
                  return v.replace(/T|Z/g, ' ')
              }
          },

          methods: {
              fetchData: function () {
                  var xhr = new XMLHttpRequest(),
                      self = this
                  xhr.open('GET', apiUrl + self.branch)
                  xhr.onload = function () {
                      self.commits = JSON.parse(xhr.responseText)
                  }
                  xhr.send()
              }
          }
      });

    }
  };
})(jQuery);