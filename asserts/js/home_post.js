{
    //method to submit the post-form-form data using ajax to avoid reloading of padge
    let createPost = function(){
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post', //post request
                url: '/posts/create ',
                data : newPostForm.serialize() ,//converts the post form data into json (serialize and deserailize)
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDOM(data.data.post)
                    $('#posts-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button',newPost))

         // call the create comment class
         new PostComments(data.data.post._id);

         new Noty({
             theme: 'relax',
             text: "Post published!",
             type: 'success',
             layout: 'topRight',
             timeout: 1500
             
         }).show();

                },error: function(error){
                    console.log(error.responseText);}
            })
        })}
    //method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
        ${post.content } <br />
        <small><b>- ${ post.user.name }</b></small>
        <small><a class="delete-post-button" href="/posts/destroy/${ post._id }">Delete Post</a></small>
     
      
      <div class="post-comments">
        <h5>Comments</h5>
    
        <div class="post-comments-list">
          <ul id="post-comments-${  post._id  }">
          </ul>
        </div>
        <form action="/comments/create" method="POST">
          <textarea
            type
            name="content"
            id=""
            cols="25"
            rows="1"
            placeholder="Comment Here"
          ></textarea>
          <input type="hidden" name="post" value="${  post._id }" />
          <input type="submit" value="Comment" />
        </form>
        <br />
      </div>
    </li>`)
    }


    //method to delete the post from DOM, function which sends the post id to be deleted, blocks the natural funciton of delete link and sends it via ajax parallerly, when it sends ,it receves some data(contains some postid) and it removed, it was function which was sending the ajax request, we need to populate this delete link argument
    let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
          success: function(data){
            $(` #post-${data.data.post_id} `).remove()
            new Noty({
              theme: 'relax',
              text: "Post Deleted",
              type: 'success',
              layout: 'topRight',
              timeout: 1500
              
          }).show();
          },error: function(error){
            console.log(error.responseText)
          }
        })
      })
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
      $('#posts-list-container>ul>li').each(function(){
          let self = $(this);
          let deleteButton = $(' .delete-post-button', self);
          deletePost(deleteButton);

          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1]
          new PostComments(postId);
      });
  }



  createPost();
  convertPostsToAjax();
}
