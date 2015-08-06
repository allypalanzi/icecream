var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function(){
    console.log('wuuut')
    this.render();
  },

  render: function(){
    console.log('hi hello i am rendering');
  }
});
