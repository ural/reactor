$ = jQuery = require('jquery');
var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');
var Authors = require('./components/authors/authorPage');


var App = createReactClass({
   render: function () {

       var Child;

       switch (this.props.route) {
           case 'about': Child = About;
           break;
           case 'authors': Child = Authors;
           break;
           default: Child = Home;
       }

       return (
           <div>
               <Header />
               <div className="main">
                   <Child />
               </div>
           </div>
       );
   }
});

function render() {
    var route = window.location.hash.substr(1);
    ReactDOM.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();
