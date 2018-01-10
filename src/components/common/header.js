"use strict";

var React = require('react');
var createReactClass = require('create-react-class');


var Header = createReactClass({
   render: function () {
       return (
           <nav className="navbar navbar-inverse navbar-fixed-top">
               <a href="/">
                   <img src="images/react.png" alt="" />
               </a>
               <div className="cotainer-fluid">
                   <ul className="nav navbar-nav">
                       <li><a href="/">Home</a></li>
                       <li><a href="/#authors">Authors</a></li>
                       <li><a href="/#about">About</a></li>
                   </ul>
               </div>
           </nav>
       );
   }
});
module.exports = Header;
