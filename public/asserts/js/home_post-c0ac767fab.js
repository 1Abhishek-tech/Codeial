{let t=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/posts/create ",data:e.serialize(),success:function(t){var e=o(t.data.post);$("#posts-list-container>ul").prepend(e),s($(" .delete-post-button",e)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",e)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},o=function(t){return $(`<li id="post-${t._id}">
        ${t.content} <br />
        <small><b>- ${t.user.name}</b></small>
        <small><a class="delete-post-button" href="/posts/destroy/${t._id}">Delete Post</a></small>
     
        <br>
        <small>
            
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">
                    0 Likes
                </a>
            
        </small>
      
      <div class="post-comments">
        <h5>Comments</h5>
    
        <div class="post-comments-list">
          <ul id="post-comments-${t._id}">
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
          <input type="hidden" name="post" value="${t._id}" />
          <input type="submit" value="Comment" />
        </form>
        <br />
      </div>
    </li>`)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$(` #post-${t.data.post_id} `).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},e=function(){$("#posts-list-container>ul>li").each(function(){let t=$(this);var e=$(" .delete-post-button",t);s(e);e=t.prop("id").split("-")[1];new PostComments(e)})};t(),e()}