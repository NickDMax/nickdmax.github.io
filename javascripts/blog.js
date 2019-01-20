/*jshint esversion: 6 */

(function (angular) {
    'use strict';

    function MainControler($http) {
        var vm = this;
        var converter = new showdown.Converter();
        function handleError(err) {
            console.log(err);
        }

        vm.posts = [];

        $http({
            method: 'GET',
            url: './posts/postlist.json'
          }).then((respPostList) => {
              vm.posts = respPostList.data.posts;
              vm.posts.map((post) => {
                $http({
                    method: 'GET',
                    url: './posts/' + post.file 
                }).then((respPostContent) => {
                    post.content = converter.makeHtml(respPostContent.data);
                }, handleError);
              });
            }, handleError);
    }

    angular
        .module('GitBlog',['ngSanitize'])
        .controller('MainController', ['$http', MainControler]);
})(window.angular);