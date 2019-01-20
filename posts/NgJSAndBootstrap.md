### AngularJS - Three Years too late!

Three years ago I knew that I wanted to learn Angular but it had a bit of a learning curve and was just not intersecting with my day job enough to get a serious look.

Well three years later and I find myself updating some AngularJS code and so I found myself thinking that this might make for an easy little blog tool. Indeed with just a few lines of code I was able to start.

With just a few lines of code and help from AngularJS and showdown.js I was able to upgrade from hand written HTML to reading a JSON file with the posts, converting them from markdown, and listing them.

```javascript
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
```

The next steps will be to upgrade showdown.js to a AngularJS service and to look into using the github API to maybe replace the `postlist.json` with something that I do not have to manage directly.

So - three years have past and I am just learning three year old tech... at least it has an update! Lets see what the next three years brings!

