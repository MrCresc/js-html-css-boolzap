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
      var messageText = $('#textAreaUser').val()
      if (messageText != '') {
        var clone = $('#clone').clone()
        clone.find('.text-message').text(messageText)
        $('.chat-conversation').append(clone)
        $('#textAreaUser').val('')
      }

    }
  }
)
