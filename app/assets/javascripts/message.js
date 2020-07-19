$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `
         <div class="chat-main__message-list__n-d-t">
           <div class="chat-main__message-list__n-d-t__name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__n-d-t__date-time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__coments">
           <p class="chat-main__message-list__coments__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `
         <div class="chat-main__message-list__n-d-t">
           <div class="chat-main__message-list__n-d-t__name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__n-d-t__date-time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__coments">
           <p class="chat-main__message-list__coments__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action')
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $(".chat-main__message-forms__send").prop("disabled", false);
    })
  }); 
});