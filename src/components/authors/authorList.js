"use strict";

var React = require('react');
var createReactClass = require('create-react-class');

var AuthorList = createReactClass({

    render: function () {

        var createAuthorRow = function (author) {
            return (
                <tr key={author.id}>
                    <td><a href={"/#authors/"+author.id}>{author.id}</a></td>
                    <td>{author.firstName} {author.lastName }</td>
                </tr>
            );
        };

        return (
            <div>
                <h2>Authors</h2>

                <table  className='table table-hover'>
                    <thead>
                    <td>ID</td>
                    <td>Name</td>
                    </thead>
                    <tbody>
                    {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorList;
