<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>

    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">

    <!-- Fonts -->
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <meta name="csrf" content="{{ csrf_token() }}">
</head>
<body>
    <div class="container">
        <h1>Laravel Backbone Blog</h1>
        <div style="margin-top:20px;"></div>

        <div id="alert-msg"></div>

        <div id="page"></div>
    </div>

    <!-- Scripts -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="http://underscorejs.org/underscore-min.js"></script>
    <script src="http://backbonejs.org/backbone-min.js"></script>

    <script type="text/template" id="post-list-template">
        <a href="#/post/new" class="btn btn-primary">New Post</a>
        <hr/>
        <% if (posts == undefined || posts.length == 0) { %>
            <div class="alert alert-info">No posts yet.</div>
        <% } else if (posts && posts.length > 0) { %>
            <% _.each(posts, function(post) { %>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><%= post.get('title') %></h3>
                        </div>
                        <div class="panel-body">
                            <p><%= post.get('excerpt') %></p>
                        </div>
                    </div>
                </div>
            <% }); %>
        <% }; %>
    </script>

    <script type="text/template" id="post-edit-template">
        <form action="" class="row" id="post-form">
            <div class="form-group col-lg-8 col-lg-offset-2 col-sm-12">
                <label for="title">Title</label>
                <input type="text" id="title" class="form-control" name="title"/>
            </div>
            <div class="form-group col-lg-8 col-lg-offset-2 col-sm-12">
                <label for="body">Post</label>
                <textarea name="body" id="body" class="form-control"></textarea>
            </div>

            <div class="form-group col-lg-9 col-lg-offset-2 col-sm-12">
                <button type="submit" class="btn btn-primary left form-action-trigger">Save</button>
                <button id="cancel-form" class="btn btn-default form-action-trigger">Cancel</button>
            </div>
        </form>
    </script>

    <script type="text/template" id="login-template">
        <div class="col-sm-8 col-sm-offset-2">
            <form id="login-form" class="row">
                <div class="form-group">
                    <label for="identifier">Email or Username</label>
                    <input type="text" class="form-control" id="identifier">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Log In</button>
            </form>
        </div>
    </script>

    <script src="/js/app.js"></script>
</body>
</html>
