// Rendo le funzionalità attive solo al totale caricamento di tutto il documento
$(document).ready(
  function () {
    // Aggiungo funzionalità search bar
    $('#search').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('.findable').filter(function() {
      $(this).parents('.singlechat').toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

    // Aggiungo visualizzazione storico chat al click della nav bar laterale
    $('.singlechat').click(
      function () {
        var index = $(this).attr('index')
        $('.chat-conversation').removeClass('active').addClass('inactive')
        var name = $(this).find('.name').text()
        $('#active-user').text(name)
        var img = $(this).find('img').attr('src')
        $('#active-user-img').attr('src',img)
        $('.chat-conversation[index="'+ index +'"]').removeClass('inactive').addClass('active')
        var time = $(this).find('.timestamp').text()
        // Imposto eccezione che non modifica l'orario dell'ultimo accesso in caso di assenza di messaggi
        if ($('.chat-conversation.active [class*="message"]').length > 0) {
          $('.lastAccess').text(time)
        }
      }
    )
    // Cambio di icona dal microfono all'aereoplanino al focusin dell'input
    $('#textAreaUser').focusin(function(){
      $('#send').removeClass('fa-microphone').addClass('fa-paper-plane')
    });
    // Cambio di icona dall'aereoplanino al microfono al focusout dell'input
    $('#textAreaUser').focusout(function(){
      $('#send').removeClass('fa-paper-plane').addClass('fa-microphone')
    });
    // Aggiungo funzionalità al click dell'icona del tasto invio sulla pagina
    $('.message-area #send').click(
      function () {
        sendMessage()
      }
    )
    // Aggiungo funzionalità al click del tasto invio sulla tastiera
    $('.message-area').keypress(
      function (event) {
        if (event.which === 13) {
        sendMessage()
        }
      }
    )
    // Aggiungo funzione al click dell'icona dropdown e reset di eventuali altre dropdown aperte
    $(document).on('click','.dropdown-btn',
      function () {
        $(this).parents('[id*="clone"]').siblings('div').find('.dropdown-list').removeClass('dropdown-list-active')
        $(this).siblings('ul').toggleClass('dropdown-list-active')
        $('.chat-conversation.active').scrollTop($('.chat-conversation.active').prop('scrollHeight'))
      }
    )
    // Aggiungo funzione al click sul list-item "Info messaggio"
    $(document).on('click','.info-msg',
      function () {
        alert('inviato alle ' + $(this).parent().siblings('.time-message').text() + ' e ricevuto alle ' + $(this).parent().siblings('.time-message').text())
      }
    )
    // Aggiungo funzione al click sul list-item "Elimina messaggio"
    $(document).on('click','.delete-msg',
      function () {
        var val = $(this).parents('.chat-conversation.active').attr('index')
        $(this).parents('[id*="clone"]').remove()
        $('.singlechat[index="'+ val +'"]').children('.timestamp').children('p').text($('.chat-conversation.active').find('span').last('time-message').text())
        $('.singlechat[index="'+ val +'"]').find('.lastmessage').text($('.chat-conversation.active').find('p').last('text-message').text())
      }
    )

    // Funzione sendMessage
    function sendMessage() {
      // Calcolo l'orario
      var data = new Date()
      var hour = data.getHours()
      // Aggiungo uno 0 nel caso le ore sono meno di 10
      if (hour<10) {
        hour = '0' + hour
      }
      var minutes = data.getMinutes()
      // Aggiungo uno 0 nel caso i minuti sono meno di 10
      if (minutes<10) {
        minutes = '0' + minutes
      }
      var time = hour + ':' + minutes
      // Creo il messaggio dell'utente
      var messageText = $('#textAreaUser').val()
      if (messageText != '') {
        var index = $('.active').attr('index')
        var clone = $('#cloneUser').clone()
        clone.find('.time-message').text(time)
        clone.find('.text-message').text(messageText)
        $('.chat-conversation.active').append(clone)
        $('[index="'+index+'"] .timestamp p').text(time)
        $('.chat-conversation.active').scrollTop($('.chat-conversation.active').prop('scrollHeight'))
        $('#textAreaUser').val('')
        $('[index="'+index+'"] p.lastmessage').text(messageText)
        // Imposto lo stato "Online" del destinatario
        $('.recipient-info').children('p').text('Online')
        // Imposto lo stato "Sta scrivendo..." del destinatario
        setTimeout(function(){
          $('.recipient-info').children('p').text('Sta scrivendo...')
        }, 500);
        // Creo il messaggio automatico del destinatario
        setTimeout(function(){
          var index = $('.active').attr('index')
          var cloneRecipient = $('#cloneRecipient').clone()
          cloneRecipient.find('.time-message').text(time)
          cloneRecipient.find('.text-message').text('Ok')
          $('.chat-conversation.active').append(cloneRecipient)
          $('[index="'+index+'"] p.lastmessage').text('Ok')
          $('[index="'+index+'"] .timestamp p').text(time)
          $('.recipient-info').children('p').html('<p>Ultimo accesso oggi alle <span class="lastAccess"></span></p>')
          $('.lastAccess').text(time)
          $('.chat-conversation.active').scrollTop($('.chat-conversation.active').prop('scrollHeight'))
        }, 1000);
      }
    }
  }
)
