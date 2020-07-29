$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `
         <div class="chat-main__message-list__n-d-t" data-message-id=${message.id}>
           <div class="flex">
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
         <div class="chat-main__message-list__n-d-t"  data-message-id=${message.id}>
           <div class="flex">
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
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.chat-main__message-list__n-d-t:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});