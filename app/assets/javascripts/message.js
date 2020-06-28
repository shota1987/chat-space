$(function(){
  function buildHTML(message){
    if ( message.image ) {
        var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
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
    var url = $(this).attr('action');
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
      $('.main__contents').append(html);
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight});
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
    .always(function(){
      $('.input-form__submit').removeAttr('disabled');
    });
　})

var reloadMessages = function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    var href = 'api/messages#index {:format=>"json"}' 
    $.ajax({ 
      url: "api/messages", 
      type: 'get', 
      dataType: 'json', 
      data: {last_id: last_message_id} 
    })
    .done(function (messages) {
      var insertHTML ='';
      $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
      });
      $('.main__contents').append(insertHTML);
      $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight});
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  }
};
    setInterval(reloadMessages, 7000);
});
