// credits to https://gist.github.com/bergie/2836052
var models = {};

models.Operation = Backbone.Model.extend({
});

models.Operations = Backbone.Collection.extend({
  model: models.Operation,
  url: '/api/operation'
});


var views = {};

views.OperationItem = Backbone.View.extend({
  tagName: 'tr',

  initialize: function(options) {
    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');

    // If the model changes we need to re-render
    this.model.bind('change', this.render);
  },

  render: function() {
    // Clear existing row data if needed
    jQuery(this.el).empty();
    // Write the table columns
    jQuery(this.el).append(
        jQuery('<td>' + this.model.get('time') + '</td>'),
        jQuery('<td>' + this.model.get('amount') + '</td>')
    );
    return this;
  }
});

views.Operations = Backbone.View.extend({
  // The collection will be kept here
  collection: null,
  // The people list view is attached to the table body
  el: 'tbody',
  initialize: function(options) {
    this.collection = options.collection;
    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');
    // Bind collection changes to re-rendering
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
  },

  render: function() {
    console.log('render')
    var element = jQuery(this.el);
    // Clear potential old entries first
    element.empty();
    // Go through the collection items
    this.collection.forEach(function(item) {
      console.log('collection item ',item)
      var itemView = new views.OperationItem({
        model: item
      });
      // Render the PeopleView, and append its element
      // to the table
      element.append(itemView.render().el);
    });

    return this;
  }
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'index'  // At first we display the index route
  },

  index: function() {
    var operations = new models.Operations();
    var view = new views.Operations({
      collection: operations
    });
    view.render();
    operations.fetch();
  }
});

jQuery(document).ready(function() {
  // When the document is ready we instantiate the router
  var router = new Router();
  // And tell Backbone to start routing
  Backbone.history.start();
});

