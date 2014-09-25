(function ($) {
  Drupal.behaviors.theming = {
    attach: function (context, settings) {

      // overlay close wrapper into overlay-content
      $('#overlay-close-wrapper').prependTo('#overlay-content');

      // project detail tabs: kanban/list
      $('.node-type-projects .region-content > *').wrapAll('<div id="tabbox">');
      $('#tabbox > #block-system-main').insertBefore('#tabbox');
      $('#tabbox > *').wrapAll('<div id="block-views-kanban">');
      $('#block-views-kanban > #block-views-tickets-block').insertBefore('#block-views-kanban');
      $('<h2>Kanban board</h2>').prependTo('#block-views-kanban');
      $('<ul> \
          <li><a class="btn btn-default" href="#block-views-tickets-block">List</a></li> \
          <li><a class="btn btn-default" href="#block-views-kanban">Kanban</a></li> \
          <li><a class="btn btn-default" href="#repo">Repository</a></li> \
          <li><a class="btn btn-default" href="#timesheet">Timesheet</a></li> \
          <li><a class="btn btn-default" href="#shout">Shout</a></li> \
          <li><a class="btn btn-default" href="#team">Team</a></li> \
          <li><a class="btn btn-default" href="#wiki">Wiki</a></li> \
          </ul>').prependTo('#tabbox');
      $('#tabbox').tabs();

      // button add ticket in project nodes
      $('<a class="btn btn-default create-ticket-link" href="http://pmtools.local/node/add/tickets">Create a ticket</a>').insertAfter('.node-type-projects #block-system-main');
      $('<a class="btn btn-default create-wiki-link" href="http://pmtools.local/node/add/documents">Create a wiki page</a>').insertAfter('.node-type-projects #block-system-main');

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

      // jquery jsonp fetching
      $('<div id="repo"></div>').appendTo('#tabbox');

      $.ajax({
        url: "https://api.github.com/repos/nickveenhof/drupalcamp2014/commits",

        // the name of the callback parameter, as specified by the YQL service
        // jsonp: "callback",

        // tell jQuery we're expecting JSONP
        dataType: "json",

        // work with the response
        success: function( response ) {
          console.log(response);
          $('#repo').loadTemplate('/sites/all/themes/pmtools/templates/repofetch.html',response);
        }
      
      });

    }
  };
})(jQuery);