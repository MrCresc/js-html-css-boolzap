// Rendo le funzionalità attive solo al totale caricamento di tutto il documento
$(document).ready(
  function () {
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
    // Funzione sendMessage
    function sendMessage() {

      var data = new Date()
      var hour = data.getHours()
      if (hour<10) {
        hour = '0' + hour
      }
      var minutes = data.getMinutes()
      if (minutes<10) {
        minutes = '0' + minutes
      }
      var time = hour + ':' + minutes

      var messageText = $('#textAreaUser').val()
      if (messageText != '') {
        var clone = $('#cloneUser').clone()
        clone.find('.time-message').text(time)
        clone.find('.text-message').text(messageText)
        $('.chat-conversation').append(clone)
        $('#textAreaUser').val('')

        setTimeout(function(){
          var cloneRecipient = $('#cloneRecipient').clone()
          cloneRecipient.find('.time-message').text(time)
          cloneRecipient.find('.text-message').text('Ok')
          $('.chat-conversation').append(cloneRecipient)
          $('#lastAccess').text(time)
        }, 1000);
      }
    }
  }
)
