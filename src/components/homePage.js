"use strict";

var React = require('react');
var createReactClass = require('create-react-class');

var Home = createReactClass({
   render: function () {
       return  (<div className="jumbtron">
               <h1>React Admin</h1>
               <p>React, React Router, and Flux for ultra-responsive web app.</p>
                </div>
       );
   }
});

module.exports = Home;
